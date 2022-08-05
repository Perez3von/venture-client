
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useState } from "react"
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

// useEffect(()=>{
//     const user = getStorage('EMAIL');
//     if(user.length === 0 || state === null){
//         navigate('/')
//     }
// })


async function invite(){
    const guestUrl = `https://venturechat.netlify.app/guest/${state.ventureId}`;
    // const guestUrl = `http://localhost:3000/guest/${state.ventureId}`;
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
        <header className="invite-head">
            <h2 className="h2">Please invite the participants you'd like to brainstorm with.</h2>
            <div className="h6"> {`  
            The thinkspace accommodates 4 brainstormers, so the first 3 that join will be your brainstorming counterparts.`}
            </div>
        </header>
        <div className="invite-form-inputs-container">
            <input type="email" className="invite-input email-input-field" placeholder="Enter a guest email"  onChange={(event)=> handleChange(event.target.value)}  role='presentation' autoComplete='off'/>
            <input type="email" className="invite-input email-input-field" placeholder="Enter a guest email" onChange={(event)=> handleChangeTwo(event.target.value)}  role='presentation' autoComplete='off'/>
            <input type="email" className="invite-input email-input-field" placeholder="Enter a guest email" onChange={(event)=> handleChangeThree(event.target.value)}  role='presentation' autoComplete='off'/>
           
            {sending? <PulseLoader color={"#c2e7ff"} loading={sending} css={override} size={3} />:<button className="invite-input invite-btn" onClick={invite} > Invite! </button>}
            {successSend? <div className="invite-sent-message">Successful send! ✅</div> : <></>}
        </div>
        
        
         <button className='invite-input invite-btn' onClick={redirectChat}>Return to chat</button>
    </section>

 )
    

}