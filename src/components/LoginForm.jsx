import {  useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getParticipantsInThread } from "../utils/chatParticipants";
import { getUserProfile } from "../utils/api";
import { setStorage, setStorageEmail,getStorage } from "../utils/localStorage";
import loginIcon from '../assets/emailIcon.png'
export default function LoginForm(props){
const {state} = useLocation();
const [ventureId, setVentureId] = useState(null);
const [userEmail, setUserEmail] = useState('');
const [userEmailConfirm, setUserEmailConfirm] = useState('')
const navigate = useNavigate();

useEffect(()=>{
    const user = getStorage('EMAIL');
    //if user is already logged then take to home or if state contains venture, take to venture

    if(user.length !== 0 && ventureId === null){
        navigate('/')
    }
});
const loginUser = async ()=>{
    if(userEmail === userEmailConfirm ){
        try {
             const user = await getUserProfile(userEmail);
            console.log('The USER', user)
            setStorage('USER', user.fname);
            setStorageEmail('EMAIL', userEmail);
            navigate(`/brainstorms`);
            
        } catch (error) {
            alert('You are not a user.');
        }
     
}else{
    alert('Emails need to match');
}


}

const verifyUser = async (e) =>{
    
    e.preventDefault();
    if(userEmail === userEmailConfirm ){
            try {
                setVentureId(state.ventureId)
                const user = await getUserProfile(userEmail);
                console.log('The USER', user)
                console.log(ventureId)
                if(user && state !== null){
                    
                    const participants = await getParticipantsInThread(state.ventureId);
                    console.log('the parts', participants,'USer', user, 'State', state)
                    participants.forEach(person => {
                        if(user.user_email === person.user_email){
                                setStorage('USER', user.fname);
                                setStorageEmail('EMAIL', user.user_email);
                                navigate(`/chatroom/${state.ventureId}`);
                        }
                    })
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
            
            {/* <section>
                {state.ventureId? <h2>Access Venture: {ventureId.split('-')[0]}</h2> : <></>}
            </section> */}
            <section className="login-form">
                <h1 className="login-head">
                <img src={loginIcon} alt='loginIcon' id='loginIcon'/>
                    Login Form</h1>
                 <input type="email" required className="login-email-input" placeholder="Enter your email" onChange={(event)=> handleChange(event.target.value)}/>
                 <input type="email" required className="login-email-input" placeholder="Confirm your email" onChange={(event)=> handleChangeConfirm(event.target.value)}/>
                 {
                    ventureId===null?<button className="confirm-btn" onClick={loginUser}>Login</button>:
                    <button className="confirm-btn" onClick={verifyUser}>Login</button>

                 }
            </section>
          
           
        </div>
    )


}