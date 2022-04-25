
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useState } from "react"

export default function InviteForm({ ventureName, hostName, ventureId }){
const [sending, setSending] = useState(false);
let send = false;
const override = css`
  display: block;
  margin: 0 auto;
  border: none;
`;
const guestUrl = ''
function invite(){
    setSending(true)
    setTimeout(() => {
        console.log("Delayed for 9 second.");
        setSending(false)
      }, "9000")
    console.log(send)
    send = true;
    console.log(send)
    
}

 return(

    <section className="invite-form-container">
        <h1 className="guest-login-head">
            Invite up to 3 guests!
        </h1>
        <div className="invite-form">
            <input type="email" className="invite-input" placeholder="Guest #1 Email" />
            <input type="email" className="invite-input" placeholder="Guest #2 Email" />
            <input type="email" className="invite-input" placeholder="Guest #3 Email" />
            <button className="invite-input invite-btn" onClick={invite} >Invite</button>
        </div>
        <PulseLoader color={"#c70505"} loading={sending} css={override} size={5} />
    </section>

 )
    

}