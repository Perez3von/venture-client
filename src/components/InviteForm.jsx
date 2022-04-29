
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { getStorage } from "../utils/localStorage";
import { sendEmails } from "../utils/api";

export default function InviteForm({ ventureName, hostName, ventureId }){
const [sending, setSending] = useState(false);
const [successSend, setSuccessSend] = useState(false);
const [emailOne, setEmailOne] =useState('');
const [emailTwo, setEmailTwo] =useState('');
const [emailThree, setEmailThree] =useState('');
const navigate = useNavigate();

let send = false;
const override = css`
  display: block;
  margin: 0 auto;
  border: none;
`;
const { state } = useLocation();

useEffect(()=>{
    const user = getStorage('EMAIL');
    if(user.length === 0 || state === null){
        navigate('/')
    }
})


async function invite(){
    const guestUrl = `https://venture-chat.netlify.app/guest/${state.ventureId}`;
    const title = state.ventureTitle;
    const currUser = getStorage('USER');

    let emails = [emailOne, emailTwo, emailThree];
    emails = emails.filter(email => email !== '');

    const data = {
        email:emails,
        guestLink:guestUrl,
        hostName:currUser,
        ventureTitle:title
    };
    setSending(true);
    setSuccessSend(false);
    console.log(JSON.stringify(data))
    const status = await sendEmails(data);
    
    setTimeout(() => {
        console.log("Delayed for 4 second.");
       setSending(false);
       setSuccessSend(true);
      }, "4000");

    console.log(send);
    send = true;
    console.log(send);
   
    return status;
}

function handleChange(e) {
    setEmailOne(e);
 
}
function handleChangeTwo(e) {
    setEmailTwo(e);
 
}
function handleChangeThree(e) {
    setEmailThree(e);
 
}
function redirectChat() {

    navigate(`/chatroom/${state.ventureId}`);
    
}

 return(

    <section className="invite-form-container">
        <h1 className="guest-login-head">
            Invite up to 3 guests!
        </h1>
        <div className="invite-form">
            <input type="email" className="invite-input" placeholder="Guest #1 Email" onChange={(event)=> handleChange(event.target.value)}/>
            <input type="email" className="invite-input" placeholder="Guest #2 Email" onChange={(event)=> handleChangeTwo(event.target.value)}/>
            <input type="email" className="invite-input" placeholder="Guest #3 Email" onChange={(event)=> handleChangeThree(event.target.value)}/>
            {sending? <PulseLoader color={"#c70505"} loading={sending} css={override} size={5} />:<button className="invite-input invite-btn" onClick={invite} > Invite! </button>}
        </div>
        
        {successSend? <h3>Successful send! ✅</h3> : <></>}
        {successSend? <button className='invite-input invite-btn' onClick={redirectChat}>Return to chat</button> : <></>}
    </section>

 )
    

}