
import ParticipantInfo from "../components/ParticipantInfo";
import '../styles/chatHeader.css'

import { useNavigate, useParams } from "react-router-dom";
import { getStorage } from "../utils/localStorage";
import { completeBrainstormAPI, exportVentureChat } from "../utils/api";
import { css } from "@emotion/react";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import exportIcon from '../assets/exportIcon.png'
import checkIcon from '../assets/check.png'
import inviteIcon from '../assets/inviteIconDark.png'
export default function ChatHeader({
     chat,
     currUserEmail, 
     infoParticipants, 
    userSetting, 
    ventureName, 
    ventureBio,
     loading,
     secondLoading,
     newParticipants,
    brainstormOwner,
    isActive

    }){

const { id } = useParams()
const navigate = useNavigate();
const [sending, setSending] = useState(false);
const override = css`
  display: block;
  margin: 0 auto;
  border: none;
 
`;


async function completeBrainstorm(){
    const userEmail = getStorage('EMAIL');
    const confirm = window.confirm('Are you sure you want to complete the chat?');
    if(!confirm){
        return 0;
    }else{
        await completeBrainstormAPI(id, userEmail);
        window.location.reload();
    }
   

}
function guestForm(){
    if(isActive){
        navigate('/invite', {state:{ventureId:id, ventureTitle:ventureName},replace:true})
    }
    
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
        {
            loading || secondLoading ? <></>:
            <>
            <div className="vTitle">{ventureName}</div>
        <div className="vSummary">Summary: {ventureBio}</div>
        <div className="chatroom-header chatHeader">
            
                <header className='participants-wrapper'>
                    { newParticipants !== undefined?
                        newParticipants.map( (information,i) => {
                            
                            
                            return(
                                
                                <div key={information.fname} className = 'information-div'>

                                    <ParticipantInfo
                                        userEmail = {information.user_email}  
                                        name ={information.fname.charAt(0).toUpperCase() + information.fname.slice(1)}
                                        image_url = {information.profile_image}
                                        message_remining = {countRemain(chat, information.fname.charAt(0).toUpperCase() + information.fname.slice(1))}
                                        color = {userSetting[information.fname[0].toUpperCase() + information.fname.slice(1)].color}
                                        ventureId={id}
                                    />
                                </div>
                            )
                        }):infoParticipants.map( (information,i) => {
                            
                            
                            return(
                                
                                <div key={information.fname} className = 'information-div'>

                                    <ParticipantInfo
                                        userEmail = {information.user_email}  
                                        name ={information.fname.charAt(0).toUpperCase() + information.fname.slice(1)}
                                        image_url = {information.profile_image}
                                        message_remining = {countRemain(chat, information.fname.charAt(0).toUpperCase() + information.fname.slice(1))}
                                        color = {userSetting[information.fname[0].toUpperCase() + information.fname.slice(1)].color}
                                        ventureId={id}
                                    />
                                </div>
                            )
                        })
                    }
                 
                  
                </header> 
                 <div className="envite-noparticipants-div">
                    {sending? <PulseLoader color={"#c2e7ff"} loading={sending} css={override} size={1} /> : 
                        <button className="export-btn" onClick={exportChat} > Export 
                            <img src={exportIcon} title='Export Chat' alt='export chat'/> 
                        </button>
                    }
                    {
                        infoParticipants.length === 4 || !isActive?<button className="invite-btn-disable" >Invite
                        <img id="group-logo" src={inviteIcon} alt='group-logo' />
                        </button>:<button className="envite-button" onClick={guestForm}>Invite
                        <img id="group-logo" src={inviteIcon} alt='group-logo' />
                        </button>

                    }
                      
                        
                    <p className="participants-count">{infoParticipants.length} /4 participants</p>    
                    </div>
                    
               
                
               
                      
        </div>
        <div className="meta-info"> 
       
                {
                    !isActive? <div className=" completed-brainstorm">This Brainstorm Is Completed
                    <img src={checkIcon} className='mark-as-complete ' alt='mark as complete'/></div> : <></>
                }
                {
                    brainstormOwner === currUserEmail && isActive? <div className="chatroom-complete-btn" onClick={completeBrainstorm}>Mark Brainstorm Complete
                    <img src={checkIcon} className='mark-as-complete' alt='mark as complete'/></div> : <></>
                }
                
        </div>
        </>
        }
        
        </>
    )
}