import { useEffect, useRef, useState } from "react"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';

import CallEndIcon from '@mui/icons-material/CallEnd';
import "../index.css"
import { ParticleVisualCanvas2D } from "./ParticleVisualCanvas2D";
export default function DemoVoiceSession(){
    const [volume, setVolume] = useState(0 as Number); 
    const [inputDevices, setInputDevices] = useState([] as Object)
    const [outputDevices, setoutputDevices] = useState([] as Object)


    const [speakerVolumeIsZero_or_muted, set_speakerVolumeIsZero_or_muted] = useState(false) 
    const [micIs_muted, set_micIs_muted] = useState(false) 


    useEffect(() =>{

        async function getDevices(){ 
            const device = await navigator.mediaDevices.enumerateDevices() 
            device.map((itm, idx) =>{
                console.log(itm)
                if (itm.kind == "audioinput"){

                    setInputDevices((val) => [val, itm])
                }
                
                if (itm.kind == "audiooutput"){
                    setoutputDevices((val) => [val, itm])
                }
            })

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
        <select>
            <option defaultChecked value = "GOAT">GOAT</option>
            <option value = "Reed">Reed</option>
            <option value = "Iris">Iris</option>
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
        <select>
            {
                inputDevices.map((itm, idx) =>{
                    if (idx > 0){
                    return(
                        <option value = {itm.label}>{itm.label}</option>
                    )
                }

                })
            }
        </select>
        </div>

        <br/>

        <div style = {{columnGap: 20, display: "flex", flexDirection:"row"}}>
        <label>Output</label>
        <select>
            {
                outputDevices.map((itm, idx) =>{
                    if (idx > 0){
                    return(
                        <option value = {itm.label}>{itm.label}</option>
                    )
                }

                })
            }
        </select>
        </div>



        </fieldset>

    );



    const endChatButton = (
        <button class = "voiceSession_end_or_reconnect_sessionOptions">
            <CallEndIcon/>
            End Call
        </button>
    )

    const ReconectButton = (
        <button class = "voiceSession_end_or_reconnect_sessionOptions">
            Reconnect
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
                micIs_muted ?
                         <MicOffIcon style = {{cursor: "pointer", width: iconDimension, height: iconDimension }} onClick = {() => {set_micIs_muted(false)}}/>
                         :
                <KeyboardVoiceIcon style = {{cursor: "pointer", width: iconDimension, height: iconDimension }} onClick = {() =>{set_micIs_muted(true)}}/>
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

            {endChatButton}
            {ReconectButton}


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


            

        </div>
    )
}