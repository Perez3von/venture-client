import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { setStorage, setStorageEmail } from "../utils/localStorage";
import { getParticipantsInThread, newParticipant } from "../utils/chatParticipants";

export default function GuestForm(){

const [guestName, setGuestName] = useState('');
const [guestEmail, setGuestEmail] = useState('');
const [guestEmailConfirm, setGuestEmailConfirm] = useState('')
const [roomAccess, setRoomAccess] = useState(false)
const [allParticipants, setParticipants] = useState(null)
const { id }  = useParams()
const navigate = useNavigate();

useEffect(()=>{
    const allowGuest = async() => {
        const participants = await getParticipantsInThread(id);
        if(participants.length < 4){
            setRoomAccess(true);
            setParticipants(participants);
        }
        else{
                alert('The room cannot accept anymore participants');
                navigate('/login', {state:{ventureId:id},replace:true})
             
        }
}
    allowGuest()  
   

},[id, navigate])



async function joinChat(){
    if(guestEmail.toLowerCase() === guestEmailConfirm.toLowerCase()){
          let re = false;
        if(roomAccess === true && guestEmail !== '' && guestName !== ''){
            allParticipants.forEach(p => {
                if(p.user_email === guestEmail.toLowerCase()){
                    re = true
            }})
            if(re === false){
                await newParticipant(id, guestEmail.toLowerCase(), guestName.toLowerCase());
                setStorage('USER', guestName.toLowerCase());
                setStorageEmail('EMAIL', guestEmail.toLowerCase());
                navigate(`/chatroom/${id}`)
            }
            else{

                alert('You are already apart of this');
                setStorage('USER', guestName.toLowerCase());
                setStorageEmail('EMAIL', guestEmail.toLowerCase());
                navigate(`/chatroom/${id}`)
            }    
        }
    }
    else{
        alert('Emails must match')
    }
  

}
return (
    <>
    <section className="guest-form-container">
        <div className="guest-form">
            <h1 className="guest-login-head">Tell us who you are 🙈</h1>
            <input type="text" required className="login-email-input" placeholder="Enter your name" onChange={({target})=> {
                setGuestName(target.value);
            }} />
            <input type="email" required className="login-email-input" placeholder="Enter your email" onChange={({target})=>{
                setGuestEmail(target.value);
            }} />
            <input type="email" required className="login-email-input" placeholder="Confirm your email" onChange={({target})=>{
                setGuestEmailConfirm(target.value);
            }} />
            <button className="confirm-btn" onClick={ joinChat }>Join Brainstorm</button>
        </div>

    </section>
    
    </>




)


}