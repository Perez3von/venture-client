import React, { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import CreateVentureForm from "../components/CreateVentureForm";
import {createVentureThreadID} from "../utils/helperFunctions.js"
import {createNewVentureThread} from "../utils/fetchChat.js"
import { setStorage, getStorage, setStorageEmail } from "../utils/localStorage";
import CreateVentureLogged from "../components/CreateVentureLogged";
import { useReactMediaRecorder } from "react-media-recorder";
import moment from "moment";
import uuid from "react-uuid";
export default function Home(){
    const [ventureID, setVentureID] = useState(''); 
    const [ventureTitle, setVentureTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [hostEmail, setHostEmail] = useState('');
    const [hostSound, setHostSound] = useState('');
    const [saveSound, setSaveSound] = useState('');
    const [recordingSaved, setRecordingSaved] = useState(false);
    const [recording, setRecording] = useState(false);
    const [aboutVenture, setAboutVenture] = useState('');
    const [timeId, setTimeId] = useState(0);
    const [loggedIn, setLogged] = useState(false);
    const navigate = useNavigate();
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl,
    } = useReactMediaRecorder({audio:true})

    useEffect(()=>{
        const logged = getStorage('EMAIL');
        const user = getStorage('USER');
        console.log('status', logged)
        if(logged.length !== 0 && user.length !== 0){
            console.log('here')
            setHostEmail(logged);
            setFirstName(user);
            setLogged(true);
        }
    },[loggedIn]);


    const getRecording = {
    
        beginRecording: async function(){
            setRecording(true);
            startRecording();
            const timer = setTimeout(function() {
                setRecording(false);
                stopRecording();
                setHostSound(mediaBlobUrl);
                console.log('normal stopping', mediaBlobUrl)
            }, 31000, 'err')
            console.log('starting')
            console.log('Recording status:', status);
            setTimeId(timer)
            console.log(timeId, ventureID)
            
        },
        saveRecording: async function(e){
            try {
                e.preventDefault();
                console.log(hostSound)
                console.log('Media Blob', mediaBlobUrl)
                const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
                console.log(audioBlob)
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob)
                reader.onloadend = () => {
                    console.log(reader.result);
                    setSaveSound(reader.result);
                    setRecordingSaved(true);
                }
            } catch (error) {
                console.log(error)
            }
                
                // console.log(typeof audioBlob, 'audioBlob', audioBlob);
               
        } ,
        deleteRecording: function(e){
            e.preventDefault();
            setRecordingSaved(false);
            clearBlobUrl();
        },
        cancelRecording: async function(){
             
            clearTimeout(timeId);
            setRecording(false);
            stopRecording();
            console.log('early stop')  
            setHostSound(mediaBlobUrl);
        }

    }
  
function filterName(str){

    str = str.replace(/^\s+|\s+$/g, "").replace(/[0-9]/g, '');
    return str.replace(/[^a-zA-Z0-9 ]/g, "");

}

function filterTitle(str){

    str = str.replace(/^\s+|\s+$/g, "");
    return str.replace(/[^a-zA-Z0-9 ]/g, "");


}
    const handleCreateThreadByHost = async (event) => {
        event.preventDefault();
       
        const name = filterName(firstName);
        const title = filterTitle(ventureTitle);
        const uniqueId = uuid();
        let time = moment().format('LLL');
        try {
            const ventureId = createVentureThreadID(hostEmail, title)
            setVentureID(ventureId)
            const newVentureObj = {
               ventureID: uniqueId,
                ventureTitle: uniqueId,
                ventureName: title,
                firstName:name.toLowerCase(),
                hostEmail:hostEmail.toLowerCase(),
                hostAudio:saveSound,
                ventureBio:aboutVenture,
                creationDate: time,
                lastUpdated:time
            }
            
            await createNewVentureThread(newVentureObj);
          
            setStorage('USER', name)
            setStorageEmail('EMAIL', hostEmail)
            // navigate(`/chatroom/${uniqueId}`)
            navigate(`/brainstorms`)
        
        } catch (error) {
           console.log(error);
        }
    }



return(<>

{!loggedIn? 
           
        <CreateVentureForm 

            ventureTitle = {ventureTitle}
            firstName = {firstName}
            hostEmail = {hostEmail}
            aboutVenture = {aboutVenture}
            setVentureTitle = {setVentureTitle}
            setFirstName = {setFirstName}
            setHostEmail = {setHostEmail}
            setAboutVenture = {setAboutVenture}
            handleCreateThreadByHost = {handleCreateThreadByHost}
            getRecording ={getRecording}
            hostSound ={mediaBlobUrl}
            recordingState = {recording}
            loggedIn = {loggedIn}
            recordingSaved={recordingSaved }

        />:

            <CreateVentureLogged
                
                ventureTitle = {ventureTitle}
                firstName = {firstName}
                hostEmail = { hostEmail}
                aboutVenture = {aboutVenture}
                setVentureTitle = {setVentureTitle}
                setFirstName = {setFirstName}
                setHostEmail = {setHostEmail}
                setAboutVenture = {setAboutVenture}
                handleCreateThreadByHost = {handleCreateThreadByHost}
                getRecording = {getRecording}
                hostSound = {mediaBlobUrl}
                recordingState = {recording}
                recordingSaved={recordingSaved }
            />

}

</>)

   
}