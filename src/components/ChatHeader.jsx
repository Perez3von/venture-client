import React,{useState} from "react";
import ParticipantInfo from "../components/ParticipantInfo";
// import { getParticipantsInThread } from "../utils/chatParticipants";
import '../styles/chatHeader.css'
import groupLogo from '../assets/groupIcon.png'
import { useNavigate, useParams } from "react-router-dom";
// import { participantsSettings } from "../utils/helperFunctions";
export default function ChatHeader({chat, user, infoParticipants, userSetting, ventureName}){


    // const [ infoParticipants, setInfotParticipants] = useState([]);
    // const [titleOfConversation, setitleOfConversation] = useState('');
    // const [ventureId, setVentureId] = useState('');
    const [coversationAudio, setConversationAudio] = useState('')
    // const [remain, setRemain] = useState(0)
    const { id } = useParams()
    // const [userSetting, setUserSettings] = useState(null);
    const navigate = useNavigate();
    // useEffect(()=>{
    //     console.log(user)
        
    //     const participantsInChat = async () =>{
    //         const participants = await getParticipantsInThread(id);
    //         // const venture = await getVenture
    //         setInfotParticipants(participants)
    //         const settings = participantsSettings(user, participants);
    //         console.log('the Settings', settings, participants)
    //         setUserSettings(settings)
    //         // setitleOfConversation(participants[0].venture_title)  
    //         // setConversationAudio(participants[0].host_audio)          
    //     }
    //     participantsInChat();
    //     console.log('MArio', infoParticipants)
    // }, [id])

//    const handleHostSound = async () =>{
//      const tmp = new Audio(setConversationAudio);
//      tmp.play();

//    };
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
            {/* <button onClick={handleHostSound}>Audio</button> */}

           
            <audio src={coversationAudio}></audio>
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
                    <audio media-player="audioPlayer" controls="controls"     preload="auto" id="audioElement"
                        crossOrigin="anonymous" src={coversationAudio}
                     ></audio>
        </>
    : <></>)
}