import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getParticipantsInThread } from "../utils/chatParticipants";
import { getUserProfile } from "../utils/api";
import { setStorage, setStorageEmail } from "../utils/localStorage";
export default function LoginForm(props){
const {state} = useLocation();
console.log(state)
const [ventureId, setVentureId] = useState(null);
const [userEmail, setUserEmail] = useState('')
const [access, setAccess] = useState(false)
const navigate = useNavigate();

useEffect(()=>{
    try {
            console.log(ventureId)
            setVentureId(state.ventureId)
    
    } catch (error) {
       console.log(error)
        
    }
    
},[ventureId])
//,state.ventureId

const verifyUser = async (e) =>{
    e.preventDefault();
    try {
        const participants = await getParticipantsInThread(ventureId);
        const user = await getUserProfile(userEmail);
        if(user){
            setStorage('USER', user.fname );
            setStorageEmail('EMAIL', userEmail);
        }
        for(let i = 0; i < participants.length; i++){
       
            if(user.user_email === participants[i].user_email){
                setAccess(true);
                navigate(`/chatroom/${ventureId}`);
            }
        }
        
          
    } catch (error) {
        alert('You do not have access to this chat or you are not a user.');
        console.log(error);
    }
}

function handleChange(e){

    setUserEmail(e);
}

    return(
        
        <div className="login-container">
            
            <section>
                
                {/* <span>You are requesting to access:{ ventureName }</span> */}
                {/* <span>Host:{ host }</span> */}
            </section>
            <section className="login-form">
                <h1 className="login-head">Login</h1>
                 <input type="email" className="login-email-input" placeholder="Enter your email" onChange={(event)=> handleChange(event.target.value)}/>
                 <button className="confirm-btn" onClick={verifyUser}>Confirm</button>
            </section>
          
           
        </div>
    )


}