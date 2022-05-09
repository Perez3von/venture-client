
import ParticipantInfo from "../components/ParticipantInfo";
import '../styles/chatHeader.css'
import groupLogo from '../assets/groupIcon.png'
import { useNavigate, useParams } from "react-router-dom";
import { getStorage } from "../utils/localStorage";
import { exportVentureChat } from "../utils/api";
import { css } from "@emotion/react";
import { PulseLoader } from "react-spinners";
import { useState } from "react";

export default function ChatHeader({chat, user, infoParticipants, userSetting, ventureName, ventureBio}){

const { id } = useParams()
const navigate = useNavigate();
const [sending, setSending] = useState(false);
const override = css`
  display: block;
  margin: 0 auto;
  border: none;
`;

function guestForm(){
    navigate('/invite', {state:{ventureId:id, ventureTitle:ventureName},replace:true})
}
async function exportChat(){
    setSending(true)
    const email = getStorage('EMAIL');
    await exportVentureChat(email, id);
    setTimeout(() => {
        console.log("Delayed for 4 second.");
       setSending(false);
      }, "4000");
}

function countRemain(chat, user){
    let count = 0;
    chat.forEach((msg) => {
        if(msg.username === user){
            count++
        }
    })
   return count;

}
    return(
        <>
            <h1>{ventureName}</h1>
            <h2>{ventureBio}</h2>
                <header className='chatHeader'>
                    { 
                        infoParticipants.map( information => {
                            return(
                                <div key={information.fname} className = 'information-div'>

                                    <ParticipantInfo
                                        userEmail = {information.user_email}  
                                        name ={information.fname.charAt(0).toUpperCase() + information.fname.slice(1)}
                                        image_url = {information.profile_image}
                                        message_remining = {countRemain(chat, information.fname.charAt(0).toUpperCase() + information.fname.slice(1))}
                                        color = {userSetting[information.fname.charAt(0).toUpperCase() + information.fname.slice(1)].color}
                                        ventureId={id}
                                    />
                                </div>
                            )
                        })
                    }
                 
                    <div className="envite-noparticipants-div">
                    {sending? <PulseLoader color={"#c70505"} loading={sending} css={override} size={2} /> : <button className="export-btn" onClick={exportChat} > Export </button>}
                        <button className="envite-button" onClick={guestForm}>Invite
                        <img id="group-logo" src={groupLogo} alt='group-logo' />
    
                        </button>
                        <p className="participants-count">{infoParticipants.length} /4 participants</p>
                    </div>
                </header>
                  
        </>
    )
}