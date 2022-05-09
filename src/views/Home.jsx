import React, { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import CreateVentureForm from "../components/CreateVentureForm";
import {createVentureThreadID} from "../utils/helperFunctions.js"
import {createNewVentureThread} from "../utils/fetchChat.js"
import { setStorage, getStorage, setStorageEmail } from "../utils/localStorage";
import CreateVentureLogged from "../components/CreateVentureLogged";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Home(){
    const [ventureID, setVentureID] = useState(''); 
    const [ventureTitle, setVentureTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [hostEmail, setHostEmail] = useState('');
    const [hostSound, setHostSound] = useState('');
    const [saveSound, setSaveSound] = useState('');
    const [recording, setRecording] = useState(false);
    const [aboutVenture, setAboutVenture] = useState('');
    const [timeId, setTimeId] = useState(0);
    const [loggedIn, setLogged] = useState(false)
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
            console.log(timeId)
            
        },
        saveRecording: async function(e){
            try {
                e.preventDefault();
                console.log(hostSound)
                const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
                console.log(audioBlob)
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob)
                reader.onloadend = () => {
                    console.log(reader.result);
                    setSaveSound(reader.result)
                }
            } catch (error) {
                console.log(error)
            }
                
                // console.log(typeof audioBlob, 'audioBlob', audioBlob);
               
        } ,
        deleteRecording: function(e){
            e.preventDefault();
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
  
    const handleCreateThreadByHost = async (event) => {
        event.preventDefault();
        console.log(ventureID);
        try {
            const ventureId = createVentureThreadID(hostEmail, ventureTitle)
            setVentureID(ventureId)
            const newVentureObj = {
               ventureID: ventureId,
                ventureTitle: ventureTitle.split(' ').join('').toLowerCase(),
                ventureName: ventureTitle,
                firstName:firstName.toLowerCase(),
                hostEmail:hostEmail.toLowerCase(),
                hostAudio:saveSound,
                ventureBio:aboutVenture
            }
            await createNewVentureThread(newVentureObj);
          
            setStorage('USER', firstName)
            setStorageEmail('EMAIL', hostEmail)
            navigate(`/chatroom/${ventureTitle.split(' ').join('').toLowerCase() + '-' + firstName.toLowerCase()}`)
        
        } catch (error) {
           console.log('Please review your credentials');
        }
    }
    if(loggedIn === false){
       return(
        
        <section className="landing">
    
            <div className="create-header">
                <h1>Venture Chat</h1>
                
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
                    

                />
            </div>
        </section>
    )}
    
    else{
        return(
        
            <section className="landing">
          
                <div className="create-header">
                    <h1> Venture Chat </h1>
                    <CreateVentureLogged
                        
                        ventureTitle = {ventureTitle}
                        firstName = {firstName}
                        hostEmail = { hostEmail}
                        setVentureTitle = {setVentureTitle}
                        setFirstName = {setFirstName}
                        setHostEmail = {setHostEmail}
                        setAboutVenture = {setAboutVenture}
                        handleCreateThreadByHost = {handleCreateThreadByHost}
                        getRecording = {getRecording}
                        hostSound = {mediaBlobUrl}
                        recordingState = {recording}
                    />
                </div>
            </section>
        )

    }
}