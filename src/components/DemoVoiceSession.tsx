import { useEffect, useRef, useState } from "react"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import SendIcon from '@mui/icons-material/Send';

import "../index.css"
import { ParticleVisualCanvas2D } from "./ParticleVisualCanvas2D";
import { useVoiceSession } from "../hooks/useVoiceSession";
import { useTextChat } from "../hooks/useTextChat";

type InteractionMode = "voice" | "text";

export default function DemoVoiceSession(){
    const [volume, setVolume] = useState(0 as Number);
    const [inputDevices, setInputDevices] = useState([] as Object)
    const [outputDevices, setoutputDevices] = useState([] as Object)

    const [selectedPersonality, setSelectedPersonality] = useState("goat");
    const [mode, setMode] = useState<InteractionMode>("voice");
    const [selectedInputId, setSelectedInputId] = useState("");
    const [selectedOutputId, setSelectedOutputId] = useState("");
    const [chatInput, setChatInput] = useState("");

    const {
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
    } = useVoiceSession({ personality: selectedPersonality });

    const {
        messages: chatMessages,
        isLoading: chatLoading,
        error: chatError,
        sendMessage,
        clearMessages,
    } = useTextChat({ personality: selectedPersonality });

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        sendMessage(chatInput);
        setChatInput("");
    };

    const isVoiceSessionAcitve = sessionState === "connected";
    const isConnecting = sessionState === "connecting";

    const [speakerVolumeIsZero_or_muted, set_speakerVolumeIsZero_or_muted] = useState(false)
    const [micUiMuted, setMicUiMuted] = useState(isMicMuted)

    const statusLabel = isConnecting
        ? "Connecting"
        : isVoiceSessionAcitve
            ? isBotSpeaking
                ? "Coach speaking"
                : isUserSpeaking
                    ? "Listening"
                    : "Live"
            : "Ready";

    const statusToneClass = isConnecting
        ? "demo-voice-status--busy"
        : isVoiceSessionAcitve
            ? "demo-voice-status--live"
            : "demo-voice-status--idle";

    const statusDotClass = isConnecting || isBotSpeaking || isUserSpeaking
        ? "demo-voice-status-dot is-active"
        : "demo-voice-status-dot";

    const iconButtonBase = "demo-voice-icon-btn";
    const primaryButtonBase = "demo-voice-primary-btn";
    const secondaryButtonBase = "demo-voice-secondary-btn";


    useEffect(() =>{

        async function getDevices(){
            const devices = await navigator.mediaDevices.enumerateDevices()
            const inputs: MediaDeviceInfo[] = []
            const outputs: MediaDeviceInfo[] = []
            const seenInputIds = new Set<string>()
            const seenOutputIds = new Set<string>()
            devices.forEach((itm) =>{
                if (itm.kind == "audioinput" && !seenInputIds.has(itm.groupId)){
                    seenInputIds.add(itm.groupId)
                    inputs.push(itm)
                }
                if (itm.kind == "audiooutput" && !seenOutputIds.has(itm.groupId)){
                    seenOutputIds.add(itm.groupId)
                    outputs.push(itm)
                }
            })
            setInputDevices(inputs)
            setoutputDevices(outputs)
        }

        navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then(() =>{
            getDevices()
            navigator.mediaDevices.ondevicechange = getDevices
        })


    },[])




    

    useEffect(() =>{
        //console.log(inputDevices)
        //console.log(outputDevices)
    }, [volume, inputDevices, outputDevices]) //dependencie means listen for these variavbles changes, once change is dtetced, trigger the useEffect body content

    useEffect(() => {
        setMicUiMuted(isMicMuted)
    }, [isMicMuted])

   



    const endChatButton = (
        <button type="button" className={primaryButtonBase} onClick={disconnect}>
            End Call
        </button>
    )

    const ReconectButton = (
        <button
            type="button"
            className={secondaryButtonBase}
            onClick={async () => {
                await disconnect();
                connect();
            }}
        >
            Reconnect
        </button>
    )

    const StartVocieSessionButton = (
        <button
            type="button"
            className={primaryButtonBase}
            onClick={connect}
            disabled={isConnecting}
        >
            {isConnecting ? "Connecting..." : "Start Session"}
        </button>
    )


     const SettingsPanel = (
        <div className="demo-voice-panel">
            <div className="demo-voice-card">
                <div className="demo-voice-card-header">
                    <div
                        aria-live="polite"
                        className={`demo-voice-status ${statusToneClass}`}
                    >
                        <span className={statusDotClass} />
                        {statusLabel}
                    </div>
                    <span className="demo-voice-card-label">Voice</span>
                </div>

                <div className="demo-voice-controls">
                    <button
                        type="button"
                        className={`${iconButtonBase} ${speakerVolumeIsZero_or_muted ? "is-muted" : ""}`}
                        aria-pressed={speakerVolumeIsZero_or_muted}
                        aria-label={speakerVolumeIsZero_or_muted ? "Unmute speaker" : "Mute speaker"}
                        onClick={() => {
                            set_speakerVolumeIsZero_or_muted(!speakerVolumeIsZero_or_muted);
                        }}
                    >
                        {speakerVolumeIsZero_or_muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                    </button>

                    <div className="demo-voice-controls-center">
                        {isVoiceSessionAcitve ? (
                            <>
                                {endChatButton}
                                {ReconectButton}
                            </>
                        ) : (
                            <>{StartVocieSessionButton}</>
                        )}
                    </div>

                    <button
                        type="button"
                        className={`${iconButtonBase} ${micUiMuted ? "is-muted" : ""}`}
                        aria-pressed={micUiMuted}
                        aria-label={micUiMuted ? "Unmute microphone" : "Mute microphone"}
                        onClick={() => {
                            setMicUiMuted((prev) => !prev)
                            toggleMic()
                        }}
                    >
                        {micUiMuted ? <MicOffIcon fontSize="small" /> : <KeyboardVoiceIcon fontSize="small" />}
                    </button>
                </div>

                <p className="demo-voice-note">
                    {isVoiceSessionAcitve
                        ? "Session is live. Use mute when you need privacy."
                        : "Start session to speak to GOAT"}
                </p>
            </div>

            <details className="demo-voice-details">
                <summary className="demo-voice-details-summary">
                    Audio settings
                    <span className="demo-voice-details-expand">Expand</span>
                    <span className="demo-voice-details-hide">Hide</span>
                </summary>

                <div className="demo-voice-details-body">
                    <div className="demo-voice-hidden">
                        <label className="demo-voice-setting-row">
                            <span className="demo-voice-setting-label">Personality</span>
                        <select
                            value={selectedPersonality}
                            onChange={(e) => setSelectedPersonality(e.target.value)}
                            className="demo-voice-select"
                        >
                            <option value="goat">GOAT</option>
                            <option value="reed">Reed</option>
                            <option value="iris">Iris</option>
                        </select>
                        </label>
                    </div>

                    <label className="demo-voice-setting-row">
                        <span className="demo-voice-setting-label">Volume</span>
                        <div className="demo-voice-setting-control">
                            <input
                                type="range"
                                onChange={(e) => {
                                    setVolume(JSON.parse(e.target.value));
                                }}
                                className="demo-voice-range"
                            />
                            <span className="demo-voice-setting-value">{volume}</span>
                        </div>
                    </label>

                    <label className="demo-voice-setting-row">
                        <span className="demo-voice-setting-label">Input</span>
                        <select
                            value={selectedInputId}
                            onChange={(e) => {
                                setSelectedInputId(e.target.value);
                                updateMic(e.target.value);
                            }}
                            className="demo-voice-select"
                        >
                            {inputDevices.map((itm, idx) => (
                                <option key={idx} value={itm.deviceId}>
                                    {itm.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="demo-voice-setting-row">
                        <span className="demo-voice-setting-label">Output</span>
                        <select
                            value={selectedOutputId}
                            onChange={(e) => {
                                setSelectedOutputId(e.target.value);
                                updateSpeaker(e.target.value);
                            }}
                            className="demo-voice-select"
                        >
                            {outputDevices.map((itm, idx) => (
                                <option key={idx} value={itm.deviceId}>
                                    {itm.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </details>

            {error && <div className="demo-voice-error">{error}</div>}

            {isVoiceSessionAcitve && (
                <div className="demo-voice-transcript">
                    <p className="demo-voice-transcript-title">Live transcript</p>
                    <div>
                        {isBotSpeaking && <p className="demo-voice-transcript-status">Agent is speaking...</p>}
                        {isUserSpeaking && <p className="demo-voice-transcript-status">Listening...</p>}
                        {botTranscript && (
                            <p>
                                <strong className="demo-voice-transcript-name">Agent:</strong> {botTranscript}
                            </p>
                        )}
                        {userTranscript && (
                            <p>
                                <strong className="demo-voice-transcript-name">You:</strong> {userTranscript}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>

    );

    const TextChatPanel = (
        <div className="demo-voice-panel">
            <div className="demo-voice-card demo-chat-card">
                <div className="demo-voice-card-header">
                    <div className="demo-voice-status demo-voice-status--idle">
                        <span className="demo-voice-status-dot" />
                        Text
                    </div>
                    <span className="demo-voice-card-label">Chat</span>
                </div>

                <div className="demo-chat-messages">
                    {chatMessages.length === 0 && (
                        <p className="demo-chat-empty">Send a message to start chatting with GOAT</p>
                    )}
                    {chatMessages.map((msg, i) => (
                        <div
                            key={i}
                            className={`demo-chat-bubble ${msg.role === "user" ? "demo-chat-bubble--user" : "demo-chat-bubble--bot"}`}
                        >
                            <span className="demo-chat-bubble-name">
                                {msg.role === "user" ? "You" : "GOAT"}
                            </span>
                            <p className="demo-chat-bubble-text">
                                {typeof msg.text === "string" ? msg.text : JSON.stringify(msg.text)}
                            </p>
                        </div>
                    ))}
                    {chatLoading && (
                        <div className="demo-chat-bubble demo-chat-bubble--bot demo-chat-typing">
                            <span className="demo-chat-bubble-name">GOAT</span>
                            <span className="demo-chat-dots"><span /><span /><span /></span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <form
                    className="demo-chat-input-bar"
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                >
                    <input
                        type="text"
                        className="demo-chat-input"
                        placeholder="Type a message..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        disabled={chatLoading}
                    />
                    <button
                        type="submit"
                        className="demo-chat-send-btn"
                        disabled={chatLoading || !chatInput.trim()}
                        aria-label="Send message"
                    >
                        <SendIcon fontSize="small" />
                    </button>
                </form>
            </div>

            {chatError && <div className="demo-voice-error">{chatError}</div>}

            {chatMessages.length > 0 && (
                <button
                    type="button"
                    className="demo-voice-secondary-btn"
                    onClick={clearMessages}
                >
                    Clear chat
                </button>
            )}
        </div>
    );

const [isLg, setIsLg] = useState(window.innerWidth >= 1024);

useEffect(() => {
  const mql = window.matchMedia("(min-width: 1024px)");
  const onChange = () => setIsLg(window.innerWidth >= 1024);
  mql.addEventListener("change", onChange);
  setIsLg(window.innerWidth >= 1024);
  return () => mql.removeEventListener("change", onChange);
}, []);


    return(
        <section id="demoVoiceSession" className="demo-voice-section mb-20">
            <div className="demo-voice-container" style = {{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", rowGap: 100}}>

                <div className="demo-voice-intro">
                    <p className="demo-voice-eyebrow">Live coaching</p>
                    <h1 className="demo-voice-title">
                        Chat with GOAT
                    </h1>
                    <p className="demo-voice-subtitle">
                        Experience real-time voice coaching — ask questions, get feedback, and see what training with
                        Delirio feels like.
                    </p>
                    <div className="demo-voice-hero-visual demo-voice-hero-visual--mobile">
                        <div
                            id="partilceSystemContainer"
                            className="demo-voice-particle"
                        >
                            <div className="demo-voice-particle-ring" />
                            <ParticleVisualCanvas2D
                                classNamePorp="w-full h-full"
                                particleCount={500}
                                style={{ width: "100%", height: "100%" }}
                                nodeScale={
                                    isLg
                                        ? (window.innerHeight / window.innerWidth) * 0.75
                                        : (window.innerHeight / window.innerWidth) ** -1 * 0.75
                                }
                            />
                        </div>
                    </div>
                </div>


                <div className="demo-chat-mode-toggle">
                    <button
                        type="button"
                        className={`demo-chat-mode-pill ${mode === "voice" ? "is-active" : ""}`}
                        onClick={() => setMode("voice")}
                    >
                        Voice
                    </button>
                    <button
                        type="button"
                        className={`demo-chat-mode-pill ${mode === "text" ? "is-active" : ""}`}
                        onClick={() => setMode("text")}
                    >
                        Text
                    </button>
                </div>

                <div className="demo-voice-grid">
                    {mode === "voice" ? SettingsPanel : TextChatPanel}
                    <div className="demo-voice-particle-wrap demo-voice-particle-wrap--desktop">
                        <div
                            id="partilceSystemContainer"
                            className="demo-voice-particle"
                        >
                            <div className="demo-voice-particle-ring" />
                            <ParticleVisualCanvas2D
                                classNamePorp="w-full h-full"
                                particleCount={500}
                                style={{ width: "100%", height: "100%" }}
                                nodeScale={
                                    isLg
                                        ? (window.innerHeight / window.innerWidth) * 0.75
                                        : (window.innerHeight / window.innerWidth) ** -1 * 0.75
                                }
                            />
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}
