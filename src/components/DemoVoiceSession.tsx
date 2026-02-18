import { useEffect, useRef, useState } from "react"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';

import CallEndIcon from '@mui/icons-material/CallEnd';
import "../index.css"
import { ParticleVisualCanvas2D } from "./ParticleVisualCanvas2D";
import { useVoiceSession } from "../hooks/useVoiceSession";
export default function DemoVoiceSession(){
    const [volume, setVolume] = useState(0 as Number);
    const [inputDevices, setInputDevices] = useState([] as Object)
    const [outputDevices, setoutputDevices] = useState([] as Object)

    const [selectedPersonality, setSelectedPersonality] = useState("goat");
    const [selectedInputId, setSelectedInputId] = useState("");
    const [selectedOutputId, setSelectedOutputId] = useState("");

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

    const isVoiceSessionAcitve = sessionState === "connected";
    const isConnecting = sessionState === "connecting";

    const [speakerVolumeIsZero_or_muted, set_speakerVolumeIsZero_or_muted] = useState(false)


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

    const SettingsPanel = (
        <fieldset id = "fieldset" style = {{  paddingInline: 12, borderRadius: 10, paddingBlock: 24}}> 
            <legend style = {{fontWeight: 500, color: "rgba(0,0,0,.7)"}}>Configurations</legend>

        <div style = {{columnGap: 20, display: "flex", flexDirection:"row"}}>
        <label>Personality</label>
        <select value={selectedPersonality} onChange={(e) => setSelectedPersonality(e.target.value)}>
            <option value = "goat">GOAT</option>
            <option value = "reed">Reed</option>
            <option value = "iris">Iris</option>
        </select>
        </div>

        <br/>

        <div style = {{columnGap: 20, display: "flex", flexDirection:"row"}}>
        <label>Volume</label>
        <input type = "range" onChange={(e) => {setVolume(JSON.parse(e.target.value))}}/>
        <label>{volume}</label>
        </div>

        <br/>

        <div style = {{columnGap: 20, display: "flex", flexDirection:"row"}}>
        <label>Input</label>
        <select value={selectedInputId} onChange={(e) => {
            setSelectedInputId(e.target.value);
            updateMic(e.target.value);
        }}>
            {
                inputDevices.map((itm, idx) =>(
                        <option key={idx} value = {itm.deviceId}>{itm.label}</option>
                ))
            }
        </select>
        </div>

        <br/>

        <div style = {{columnGap: 20, display: "flex", flexDirection:"row"}}>
        <label>Output</label>
        <select value={selectedOutputId} onChange={(e) => {
            setSelectedOutputId(e.target.value);
            updateSpeaker(e.target.value);
        }}>
            {
                outputDevices.map((itm, idx) =>(
                        <option key={idx} value = {itm.deviceId}>{itm.label}</option>
                ))
            }
        </select>
        </div>



        </fieldset>

    );



    const endChatButton = (
        <button className = "voiceSession_end_or_reconnect_sessionOptions" onClick={disconnect}>
            <CallEndIcon/>
            End Call
        </button>
    )

    const ReconectButton = (
        <button className = "voiceSession_end_or_reconnect_sessionOptions" onClick={async () => {
            await disconnect();
            connect();
        }}>
            Reconnect
        </button>
    )

    const StartVocieSessionButton = (
        <button className = "startVoiceSession" onClick={connect} disabled={isConnecting}>
            {isConnecting ? "Connecting..." : "Start Session"}
        </button>
    )

    const iconDimension = 28
    const voiceChatOptions = (
        <div id = "voiceChatOptions" style = {{
            display: "flex",
            flexDirection:"column",
            alignSelf:"center"
        }}>

        <div 
        style = {{
            alignContent: "center",
            justifyContent:"space-evenly",
            display:"flex",
            marginBlock: 24,
            flexDirection:"row"
        }}>


        {
                //speaker icon: 
                speakerVolumeIsZero_or_muted ?
                         <VolumeOffIcon style = {{cursor: "pointer", width: iconDimension, height: iconDimension }} onClick = {() => {set_speakerVolumeIsZero_or_muted(false)}}/>
                         :
                     <VolumeUpIcon style = {{cursor: "pointer", width: iconDimension, height: iconDimension }} onClick = {() =>{set_speakerVolumeIsZero_or_muted(true)}}/>
            }

 
        {
                //microphone icon:
                isMicMuted ?
                         <MicOffIcon style = {{cursor: "pointer", width: iconDimension, height: iconDimension }} onClick = {toggleMic}/>
                         :
                <KeyboardVoiceIcon style = {{cursor: "pointer", width: iconDimension, height: iconDimension }} onClick = {toggleMic}/>
            }



        </div>

          <div 

        style = {{
            alignContent: "center",
            justifyContent:"space-evenly",
            display:"flex",
            marginBlock: 24,
            flexDirection:"row",
            width: 500,
            alignSelf:"center"

        }}>

            {
                isVoiceSessionAcitve ?
                <>
                {endChatButton}
                {ReconectButton}
                </>
                :
                <>
                {StartVocieSessionButton}
                </>
            }



        </div>
        </div>
    )

const [isLg, setIsLg] = useState(window.innerWidth >= 1024);

useEffect(() => {
  const mql = window.matchMedia("(min-width: 1024px)");
  const onChange = () => setIsLg(window.innerWidth >= 1024);
  mql.addEventListener("change", onChange);
  setIsLg(window.innerWidth >= 1024);
  return () => mql.removeEventListener("change", onChange);
}, []);


    return(
        <div id = "demoVoiceSession" className="bg-white py-32 relative overflow-hidden"
 style = {{paddingInline: 50, display:"flex", flexDirection:"column", rowGap: 100}}>

    <div style = {{columnGap: 200}} className="flex flex-col md:flex-row items-center justify-center gap-y-9 md:gap-x-[500px]">
            {SettingsPanel}

            <div id = "partilceSystemContainer"
           className="w-[450px] h-[450px] relative">
       
                 <ParticleVisualCanvas2D 
                 classNameProp = "w-[200px] h-[200px] hidden lg:row " 
                 particleCount={500} 

                 style = {{
                    width: "clac((100vw + 100vh) * 1)", 
                    height: "clac((100vw + 100vh) * 0.5)",
                    padding: 50
                 }}
                 nodeScale={ isLg ? (window.innerHeight/window.innerWidth)  * 0.7 : (window.innerHeight/window.innerWidth)**-1  * 0.7 } />

        
          </div>
    </div>


            {voiceChatOptions}

            {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            {isVoiceSessionAcitve && (
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
                    {isBotSpeaking && <p style={{ fontStyle: "italic", color: "#555" }}>Agent is speaking...</p>}
                    {isUserSpeaking && <p style={{ fontStyle: "italic", color: "#555" }}>Listening...</p>}
                    {botTranscript && <p><strong>Agent:</strong> {botTranscript}</p>}
                    {userTranscript && <p><strong>You:</strong> {userTranscript}</p>}
                </div>
            )}

        </div>
    )
}