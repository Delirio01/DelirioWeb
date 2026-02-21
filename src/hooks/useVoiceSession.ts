import { useCallback, useEffect, useRef, useState } from "react";
import { PipecatClient, RTVIEvent, TransportState } from "@pipecat-ai/client-js";
import { DailyTransport } from "@pipecat-ai/daily-transport";
import { generateDiscoveryId } from "../utils/pipecatConfig";

export type VoiceSessionState = "idle" | "connecting" | "connected" | "error";

interface UseVoiceSessionOptions {
  personality?: string;
  userId?: string;
  context?: string;
  /** Connection timeout in ms (default: 30000) */
  timeout?: number;
  /** Max retry attempts on connection failure (default: 3) */
  maxRetries?: number;
}

export function useVoiceSession(options: UseVoiceSessionOptions = {}) {
  const {
    personality = "goat", // within default_app context, "reed" and "iris" are funcitonal 
    userId = generateDiscoveryId(),
    context = "discovery", //default_app is funcitonal 
    timeout = 30000,
    maxRetries = 3,

  } = options; 
  

  const [sessionState, setSessionState] = useState<VoiceSessionState>("idle");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [botTranscript, setBotTranscript] = useState("");
  const [userTranscript, setUserTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [transportState, setTransportState] = useState<string>("idle");

  const clientRef = useRef<PipecatClient | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const retryCountRef = useRef(0);
  const isConnectingRef = useRef(false);

  // Lazily create the audio element (reused across reconnects)
  const getAudioElement = useCallback(() => {
    if (!audioElementRef.current) {
      const audio = new Audio();
      audio.autoplay = true;
      audioElementRef.current = audio;
    }
    return audioElementRef.current;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.srcObject = null;
      }
    };
  }, []);

  // Use refs to avoid circular dependency issues with retry logic
  const connectWithRetryRef = useRef<(attempt: number) => Promise<void>>();

  const handleConnectionError = useCallback((errorMsg: string, attempt: number) => {
    isConnectingRef.current = false;

    // Check if this is a retriable error
    const isRetriable =
      errorMsg.toLowerCase().includes("temporarily unavailable") ||
      errorMsg.toLowerCase().includes("timeout") ||
      errorMsg.toLowerCase().includes("network") ||
      errorMsg.toLowerCase().includes("failed to fetch") ||
      errorMsg.toLowerCase().includes("connection") ||
      errorMsg.toLowerCase().includes("503") ||
      errorMsg.toLowerCase().includes("502");

    if (isRetriable && attempt < maxRetries - 1) {
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff, max 10s
      console.log(`[VoiceSession] Retrying in ${delay}ms (attempt ${attempt + 2}/${maxRetries})...`);

      retryCountRef.current = attempt + 1;
      setTimeout(() => {
        connectWithRetryRef.current?.(attempt + 1);
      }, delay);
    } else {
      console.error(`[VoiceSession] Connection failed after ${attempt + 1} attempts: ${errorMsg}`);
      setError(errorMsg);
      setSessionState("error");
      retryCountRef.current = 0;
    }
  }, [maxRetries]);

  const connectWithRetry = useCallback(async (attempt: number = 0): Promise<void> => {
    if (clientRef.current?.connected || isConnectingRef.current) return;

    isConnectingRef.current = true;
    setSessionState("connecting");
    setError(null);

    // Prime audio element inside user gesture so browsers allow playback
    const audio = getAudioElement();
    audio.play().catch(() => {});

    const t0 = Date.now();
    const ms = () => `+${Date.now() - t0}ms`;
    const sessionTag = `personality="${personality}" context="${context}" userId="${userId}"`;

    console.log(`[VoiceSession] ---- NEW SESSION ----`);
    console.log(`[VoiceSession] Config: ${sessionTag}`);

    try {
      const transport = new DailyTransport();
      const client = new PipecatClient({
        transport,
        enableMic: true,
        enableCam: false,
        timeout,
        callbacks: {
          onConnected: () => {
            console.log(`[VoiceSession] (${ms()}) Connected to transport`);
          },
          onDisconnected: () => {
            console.warn(`[VoiceSession] (${ms()}) Disconnected — ${sessionTag}`);
            setSessionState("idle");
            setIsBotSpeaking(false);
            setIsUserSpeaking(false);
            isConnectingRef.current = false;
          },
          onTransportStateChanged: (state: TransportState) => {
            console.log(`[VoiceSession] (${ms()}) Transport: ${state}`);
            setTransportState(state);
          },
          onBotReady: () => {
            console.log(`[VoiceSession] (${ms()}) Bot ready — session fully connected`);
            setSessionState("connected");
            retryCountRef.current = 0;
            isConnectingRef.current = false;
          },
          onBotStartedSpeaking: () => {
            console.log(`[VoiceSession] (${ms()}) Bot started speaking`);
            setIsBotSpeaking(true);
          },
          onBotStoppedSpeaking: () => {
            console.log(`[VoiceSession] (${ms()}) Bot stopped speaking`);
            setIsBotSpeaking(false);
          },
          onUserStartedSpeaking: () => setIsUserSpeaking(true),
          onUserStoppedSpeaking: () => setIsUserSpeaking(false),
          onBotTranscript: (data) => {
            console.log(`[VoiceSession] (${ms()}) Bot transcript:`, data);
            if (data.text) setBotTranscript(data.text);
          },
          onUserTranscript: (data) => {
            if (data.text && data.final) setUserTranscript(data.text);
          },
          onTrackStarted: (track, participant) => {
            console.log(`[VoiceSession] (${ms()}) Track: ${track.kind}, local=${participant?.local}`);
            if (track.kind === "audio" && participant && !participant.local) {
              const audio = getAudioElement();
              const stream = new MediaStream([track]);
              audio.srcObject = stream;
              audio.play().catch((e) =>
                console.warn("[VoiceSession] Audio play blocked:", e)
              );
              console.log("[VoiceSession] Remote audio track attached");
            }
          },
          onError: (message) => {
            //log General message: 
            console.log("General error message: ", message)
            console.error(`[VoiceSession] (${ms()}) ERROR — ${sessionTag}`);
            console.error("[VoiceSession] Error payload:", {
              label: message?.label,
              type: message?.type,
              data: message?.data,
              id: message?.id,
            });
            const data = message?.data;
            const errorMsg =
              (typeof data === "object" && data !== null ? (data as any).message : null)
              ?? (typeof data === "string" ? data : null)
              ?? (typeof message === "string" ? message : JSON.stringify(message))
              ?? "Connection error";
            console.error(`[VoiceSession] Extracted error: "${errorMsg}"`);
            handleConnectionError(errorMsg, attempt);
          },
        },
      });

      clientRef.current = client;

      const connectUrl = `${"https://pipecat-backend-production-6460.up.railway.app"}/connect`;
      const requestBody = { user_id: userId, personality, context };

      console.log(`[VoiceSession] Attempting connection (attempt ${attempt + 1}/${maxRetries})...`);
      console.log(`[VoiceSession] Endpoint: ${connectUrl}`);
      console.log(`[VoiceSession] Request body:`, requestBody);

      await client.startBotAndConnect({
        endpoint: connectUrl,
        requestData: requestBody,
      });
      console.log("Endpoint in use: ", connectUrl) //logging 
    } catch (err) {
      console.error("[VoiceSession] Connection error:", err);
      const errorMsg = err instanceof Error ? err.message : "Failed to connect";
      handleConnectionError(errorMsg, attempt);
    }
  }, [personality, userId, context, timeout, maxRetries, handleConnectionError, getAudioElement]);

  // Keep the ref updated
  useEffect(() => {
    connectWithRetryRef.current = connectWithRetry;
  }, [connectWithRetry]);

  const connect = useCallback(async () => {
    retryCountRef.current = 0;
    await connectWithRetry(0);
  }, [connectWithRetry]);

  const disconnect = useCallback(async () => {
    isConnectingRef.current = false;
    retryCountRef.current = 0;
    if (!clientRef.current) return;
    try {
      await clientRef.current.disconnect();
    } catch (err) {
      console.error("[VoiceSession] Disconnect error:", err);
    }
    clientRef.current = null;
    setSessionState("idle");
    setTransportState("idle");
  }, []);

  const toggleMic = useCallback(() => {
    if (!clientRef.current) return;
    const newState = !isMicMuted;
    clientRef.current.enableMic(!newState);
    setIsMicMuted(newState);
  }, [isMicMuted]);

  const updateMic = useCallback((deviceId: string) => {
    clientRef.current?.updateMic(deviceId);
  }, []);

  const updateSpeaker = useCallback((deviceId: string) => {
    clientRef.current?.updateSpeaker(deviceId);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (clientRef.current?.connected) {
        clientRef.current.disconnect();
      }
    };
  }, []);

  return {
    sessionState,
    transportState,
    isMicMuted,
    isBotSpeaking,
    isUserSpeaking,
    botTranscript,
    userTranscript,
    error,
    connect,
    disconnect,
    toggleMic,
    updateMic,
    updateSpeaker,
  };
}
