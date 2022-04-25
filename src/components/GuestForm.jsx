import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { setStorage, setStorageEmail } from "../utils/localStorage";

import { getParticipantsInThread, newParticipant } from "../utils/chatParticipants";
import Home from "../views/Home";

export default function GuestForm(){

const [guestName, setGuestName] = useState('');
const [guestEmail, setGuestEmail] = useState('');
const [roomAccess, setRoomAccess] = useState(false)
const [allParticipants, setParticipants] = useState(null)
const { id }  = useParams()
const navigate = useNavigate();

useEffect(()=>{
    console.log('here')
    const allowGuest = async() => {
        
        const participants = await getParticipantsInThread(id);
        if(participants.length < 4){
            setRoomAccess(true);
            setParticipants(participants);
        }
        else{
                alert('The room cannot accept anymore participants');
                // navigate('/')
             
        }
        console.log(participants)
}
    allowGuest()  
   

},[])



async function joinChat(){
    let re = false;
    if(roomAccess === true && guestEmail !== '' && guestName !== ''){
        allParticipants.forEach(p => {if(p.user_email === guestEmail){
                re =true
        }})
        if(re === false){
            await newParticipant(id, guestEmail, guestName);
            setStorage('USER', guestName);
            setStorageEmail
            ('EMAIL', guestEmail);
            navigate(`/chatroom/${id}`)
        }
        else{

            alert('You are already apart of this');
            setStorage('USER', guestName);
            setStorageEmail
            ('EMAIL', guestEmail);
            navigate(`/chatroom/${id}`)
        }
        
        
    }

}
return (
    <>
    <section className="guest-form-container">
        <div className="guest-form">
            <h1 className="guest-login-head">Tell us who you are 🙈</h1>
            <input type="text" className="login-email-input" placeholder="Enter your name" onChange={({target})=> {
                setGuestName(target.value);
            }} />
            <input type="email" className="login-email-input" placeholder="Enter your email" onChange={({target})=>{
                setGuestEmail(target.value);
            }} />
            <button className="confirm-btn" onClick={ joinChat }>Join the chat!</button>
        </div>

    </section>
    
    </>




)


}