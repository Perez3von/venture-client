
import ParticipantInfo from "../components/ParticipantInfo";
import '../styles/chatHeader.css'
import groupLogo from '../assets/groupIcon.png'
import { useNavigate, useParams } from "react-router-dom";
export default function ChatHeader({chat, user, infoParticipants, userSetting, ventureName}){

const { id } = useParams()
const navigate = useNavigate();

function guestForm(){
    navigate('/invite', {state:{ventureId:id},replace:true})
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
    return(userSetting ? 
        <>
            <h1>{ventureName}</h1>
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
                        <button className="envite-button" onClick={guestForm}>Invite
                        <img id="group-logo" src={groupLogo} alt='group-logo' />
                       
                        </button>

                        <p className="participants-count">{infoParticipants.length} /4 participants</p>
                    </div>
                </header>
                  
        </>
    : <></>)
}