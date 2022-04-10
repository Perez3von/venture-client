import React, { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import CreateVentureForm from "../components/CreateVentureForm";
import {createVentureThreadID} from "../utils/helperFunctions.js"
import {createNewVentureThread} from "../utils/fetchChat.js"
import { setStorage, getStorage, setStorageEmail } from "../utils/localStorage";
export default function Home(){
    const [ventureID, setVentureID] = useState(''); // this might not be needed
    const [ventureTitle, setVentureTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [hostEmail, setHostEmail] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{

        //check if already logged in, then render without asking for name or email
    })
   
    const handleCreateThreadByHost = async (event) => {
        event.preventDefault();
        console.log(ventureID);
        try {
            const ventureId = createVentureThreadID(hostEmail, ventureTitle)
            setVentureID(ventureId)
            const newVentureObj = {
               ventureID: ventureId,
                ventureTitle: ventureTitle.split(' ').join('').toLowerCase(),
                firstName:firstName.toLowerCase(),
                hostEmail:hostEmail.toLowerCase()
            }
            await createNewVentureThread(newVentureObj);
          
            setStorage('USER', firstName)
            setStorageEmail('EMAIL', hostEmail)
            navigate(`/chatroom/${ventureTitle.split(' ').join('').toLowerCase() + '-' + firstName.toLowerCase()}`)
        
        } catch (error) {
            // the error to display
           console.log('Please review your credentials');
        }
    }

    return(
        <>
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
        </>
    )
}