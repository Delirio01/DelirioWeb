import { useCallback, useEffect, useRef, useState } from "react";
import { PipecatClient, RTVIEvent, TransportState } from "@pipecat-ai/client-js";
import { DailyTransport } from "@pipecat-ai/daily-transport";
import { PIPECAT_BACKEND_URL } from "../utils/pipecatConfig";

export type VoiceSessionState = "idle" | "connecting" | "connected" | "error";

interface UseVoiceSessionOptions {
  personality?: string;
  userId?: string;
  context?: string;
}

export function useVoiceSession(options: UseVoiceSessionOptions = {}) {
  const { personality = "goat", userId = "web-user", context = "onboarding" } = options;

  const [sessionState, setSessionState] = useState<VoiceSessionState>("idle");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [botTranscript, setBotTranscript] = useState("");
  const [userTranscript, setUserTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const clientRef = useRef<PipecatClient | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element for bot output
  useEffect(() => {
    const audio = new Audio();
    audio.autoplay = true;
    audioElementRef.current = audio;
    return () => {
      audio.pause();
      audio.srcObject = null;
    };
  }, []);

  const connect = useCallback(async () => {
    if (clientRef.current?.connected) return;

    setSessionState("connecting");
    setError(null);

    try {
      const transport = new DailyTransport();
      const client = new PipecatClient({
        transport,
        enableMic: true,
        enableCam: false,
        callbacks: {
          onConnected: () => setSessionState("connected"),
          onDisconnected: () => {
            setSessionState("idle");
            setIsBotSpeaking(false);
            setIsUserSpeaking(false);
          },
          onBotStartedSpeaking: () => setIsBotSpeaking(true),
          onBotStoppedSpeaking: () => setIsBotSpeaking(false),
          onUserStartedSpeaking: () => setIsUserSpeaking(true),
          onUserStoppedSpeaking: () => setIsUserSpeaking(false),
          onBotTranscript: (data) => {
            if (data.text) setBotTranscript(data.text);
          },
          onUserTranscript: (data) => {
            if (data.text && data.final) setUserTranscript(data.text);
          },
          onTrackStarted: (track, participant) => {
            if (track.kind === "audio" && participant && !participant.local) {
              // Attach bot audio to audio element
              const stream = new MediaStream([track]);
              if (audioElementRef.current) {
                audioElementRef.current.srcObject = stream;
              }
            }
          },
          onError: (message) => {
            console.error("Pipecat error:", message);
            setError(message?.data?.toString() ?? "Connection error");
            setSessionState("error");
          },
        },
      });

      clientRef.current = client;

      await client.startBotAndConnect({
        endpoint: `${PIPECAT_BACKEND_URL}/connect`,
        requestData: {
          user_id: userId,
          personality,
          context,
        },
      });
    } catch (err) {
      console.error("Failed to connect:", err);
      setError(err instanceof Error ? err.message : "Failed to connect");
      setSessionState("error");
    }
  }, [personality, userId, context]);

  const disconnect = useCallback(async () => {
    if (!clientRef.current) return;
    try {
      await clientRef.current.disconnect();
    } catch (err) {
      console.error("Disconnect error:", err);
    }
    clientRef.current = null;
    setSessionState("idle");
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
