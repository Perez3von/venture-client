import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getParticipantsInThread } from "../utils/chatParticipants";
import { getUserProfile } from "../utils/api";
import { setStorage, setStorageEmail } from "../utils/localStorage";
export default function LoginForm(props){
const {state} = useLocation();
const [ventureId, setVentureId] = useState(null);
const [userEmail, setUserEmail] = useState('');
const [userEmailConfirm, setUserEmailConfirm] = useState('')
const navigate = useNavigate();

useEffect(()=>{
    try {
            console.log(ventureId)
            setVentureId(state.ventureId)
    
    } catch (error) {
       console.log(error)
        
    }
    
},[ventureId])


const verifyUser = async (e) =>{
    e.preventDefault();
    if(userEmail === userEmailConfirm){
            try {
                
                const user = await getUserProfile(userEmail);
                if(user && state !== null){
                    setStorage('USER', user.fname);
                    setStorageEmail('EMAIL', userEmail);
                    const participants = await getParticipantsInThread(ventureId);
                        for(let i = 0; i < participants.length; i++){
                            if(user.user_email === participants[i].user_email){
                                navigate(`/chatroom/${ventureId}`);
                            }
                    } 
                }
                else if(user){
                    setStorage('USER', user.fname);
                    setStorageEmail('EMAIL', userEmail);
                    navigate(`/`);

                }
                  
        } catch (error) {
            alert('You do not have access to this chat or you are not a user.');
            console.log(error);
        } 
    }
    else{
        alert('Emails need to match');
    }
   
}

function handleChange(e){

    setUserEmail(e.toLowerCase());
}
function handleChangeConfirm(e){

    setUserEmailConfirm(e.toLowerCase());
}

    return(
        
        <div className="login-container">
            
            <section>
                {ventureId && <h1>Access venture: {ventureId.split('-')[0]}</h1>}
            </section>
            <section className="login-form">
                <h1 className="login-head">Login</h1>
                 <input type="email" required className="login-email-input" placeholder="Enter your email" onChange={(event)=> handleChange(event.target.value)}/>
                 <input type="email" required className="login-email-input" placeholder="Confirm your email" onChange={(event)=> handleChangeConfirm(event.target.value)}/>
                 <button className="confirm-btn" onClick={verifyUser}>Confirm</button>
            </section>
          
           
        </div>
    )


}