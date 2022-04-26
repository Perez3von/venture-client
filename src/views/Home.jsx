import React, { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import CreateVentureForm from "../components/CreateVentureForm";
import {createVentureThreadID} from "../utils/helperFunctions.js"
import {createNewVentureThread} from "../utils/fetchChat.js"
import { setStorage, getStorage, setStorageEmail } from "../utils/localStorage";
import CreateVentureLogged from "../components/CreateVentureLogged";
export default function Home(){
    const [ventureID, setVentureID] = useState(''); 
    const [ventureTitle, setVentureTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [hostEmail, setHostEmail] = useState('');
    const [loggedIn, setLogged] = useState(false)
    const navigate = useNavigate();

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
                hostEmail:hostEmail.toLowerCase()
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
        {/* <div className="bubbles-container">
            <div className="msg-bubble green-bubble"> 
                    <div className='message-container'> 
                            <p> 
                                <div className='message-header' >
                                    <b>Expand</b> <b>Solution</b> 
                                </div>
                                <br></br>
                                You could try using css only for you design..
                                <br></br>
                                <div className={`user-image currentUser`} > A </div>
                            </p>
                        </div>
                    </div>
                    <div className="msg-bubble yellow-bubble"> 
                    <div className='message-container'> 
                            <p> 
                                <div className='message-header' >
                                    <b>Expand</b> <b>Solution</b> 
                                </div>
                                <br></br>
                                You could try
                                <br></br>
                                <div className={`user-image otherUser`} > H </div>
                            </p>
                        </div>
                    </div>

        </div> */}
       
            <div className="create-header">
                <h1> Create a venture</h1>
                
                <CreateVentureForm 

                    ventureTitle = {ventureTitle}
                    firstName = {firstName}
                    hostEmail = { hostEmail}
                    setVentureTitle = {setVentureTitle}
                    setFirstName = {setFirstName}
                    setHostEmail = {setHostEmail}
                    handleCreateThreadByHost = {handleCreateThreadByHost}

                />
            </div>
        </section>
    )}
    
    else{
        return(
        
            <section className="landing">
          
                <div className="create-header">
                    <h1> Create a venture</h1>
                    <CreateVentureLogged
                        
                        ventureTitle = {ventureTitle}
                        firstName = {firstName}
                        hostEmail = { hostEmail}
                        setVentureTitle = {setVentureTitle}
                        setFirstName = {setFirstName}
                        setHostEmail = {setHostEmail}
                        handleCreateThreadByHost = {handleCreateThreadByHost}
    
                    />
                </div>
            </section>
        )

    }
}