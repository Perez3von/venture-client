import MessageForm from "../components/MessageForm";
import '../styles/message.css'
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { io } from 'socket.io-client';
import { saveMessage, getMessages, getVentureData, sendNotification} from "../utils/api";
import { getStorage } from "../utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import { getParticipantsInThread } from "../utils/chatParticipants";
import { participantsSettings } from "../utils/helperFunctions";
import chatIcon from '../assets/chatIcon.png'
import msgIcon from '../assets/writeIcon.png'
import exportIcon from '../assets/exportIcon.png'
import inviteIcon from '../assets/inviteIcon.png'
import { ClipLoader } from "react-spinners";
import thumbsUp from '../assets/thumbsUp.png'
import { exportVentureChat } from "../utils/api";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";




export default function Venture(){

    const [formData, setFormData] = useState('');
    const [formData2, setFormData2]=useState('')
    const [formData3, setFormData3] = useState('');
    const [msgInfo, setMsgInfo] = useState('');
    const [ventureName, setVentureName] = useState('');
    const [ventureOwner, setVentureOwner] = useState('')
    const [messages, setMessage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ventureBio, setVentureBio] = useState('');
    const [hostAudio, setHostAudio] = useState('');
    const [user, setUser] = useState(null);
    const [infoParticipants, setInfotParticipants] = useState([]);
    const [userSetting, setUserSettings] = useState({});
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [messageForm, setMessageForm] = useState(true);
    const [exportChat, setExportChat] = useState(false);
    const[successExport, setSuccessExport] = useState(false);
    const [userJoin, setUserJoin] = useState(null);
    const [newParticipants, setNewParticipants] = useState(null)
    const socket = useRef();
    const {id} = useParams();
    const navigate = useNavigate();
    const [secondLoading, setSecondLoading] = useState(false);
    const override = css`
    display: block;
    margin: 0 auto;
    border: none;
    `;

   


useEffect(()=>{
    const mq = window.matchMedia( "(min-width: 500px)" );
    if (mq.matches) {
            setMessageForm(true);
            setShowChat(true)
        } else {
        setMessageForm(false);
    }
},[])


useEffect(()=>{
    let room = id;
    const currentUserEmail = getStorage('EMAIL');
    socket.current = io('https://venturechatsocket.herokuapp.com',{
        secure:true,
    });
    // socket.current = io('ws://localhost:8900');
    // socket.current = io('ws://localhost:8900 ',{
    //     withCredentials: true
    // });
    socket.current.emit('create', {
            room: room,
            people:currentUserEmail
         });
},[id]);

useEffect(()=> {

        setLoading(true);
        const currentUser = getStorage('USER');
        const currentUserEmail = getStorage('EMAIL');
        // let username = currentUser;

        if(currentUser.length === 0 || currentUserEmail.length === 0){
            navigate('/login', {state:{ventureId:id},replace:true});
        } else{
            let tempPart = '';
            const oldMessages = async() => {
                try {
                    
                    let brainstorm = await getMessages(id);
                    const data = await getVentureData(id);
                   
                    if(brainstorm === false){
                        // alert('This chat does not exist');
                        navigate('/');
                    }
                    const participants = await getParticipantsInThread(id);
                    // tempPart=participants;
                    console.log("DATA", participants, data, "messags", brainstorm)
                    const settings =  participantsSettings(currentUser, participants, brainstorm);
    
                    let canAccess = false;

                    for(let i = 0; i < participants.length; i++){
                        
                        if(currentUserEmail === participants[i].user_email){
                            canAccess = true;
                        }
                    }
                    if(canAccess === false ){
                        alert('You do not have access to this chat');
                        navigate('/')
                    } 
                    
                    if(data.host_audio !== null || data.host_audio !== ''){
                        setHostAudio(data.host_audio);
                    }
                    setIsActive(data.active)
                    setVentureOwner(data.host_email);
                    setUser(currentUser);
                    setVentureName(data.venture_name);
                    setVentureBio(data.venture_bio);
                    setInfotParticipants(participants);
                    setMessage(brainstorm.reverse());
                    setUserSettings(settings);
                    setLoading(false);

                } catch (error) {
                // alert('An error occured, make sure chat url is valid');
                console.log(error)
                    
                }
            };
            oldMessages();
           console.log('sdsdfa',tempPart)
    

        };
        // socket.current = io('https://venturechatsocket.herokuapp.com',{
        //     secure:true,
        // });
        // socket.current = io('ws://localhost:8900');
        // socket.current = io('ws://localhost:8900 ',{
        //     withCredentials: true
        // });
        // socket.current.emit('create', {
        //         room: room,
        //         people:currentUserEmail
        //      });
    },[id, navigate, userJoin]);

useEffect(()=>{
    if(!loading){
        setSecondLoading(true);
        const updateGuests = async() =>{
            const currentUser = getStorage('USER');
            const participants = await getParticipantsInThread(id);
            console.log('promise', participants)
            
            const settings =  participantsSettings(currentUser, participants, messages);
            console.log('new settings:', settings)
            if(participants.length !== infoParticipants.length){
                 setNewParticipants(participants);
                setUserSettings(settings)
            }
            setSecondLoading(false)
           
        }
         socket.current.on('usersOnline', (data)=>{
       
        // const bool = infoParticipants.every(user=>{
        //     return data.usersOnline.includes(user.user_email);
        // })
        // console.log('users online', data.usersOnline, infoParticipants)
        console.log('VENMON', data.list, infoParticipants,messages)
        updateGuests()
        setOnlineUsers(data.usersOnline);
         // updateGuests();
        // if(data.list.length !== infoParticipants.length){
            
        //     // setUserJoin(data.usersOnline);
        //     console.log('change ahppened')
        // }
        // setOnlineUsers(data.usersOnline)      
    })
    }
   
},[loading])



useEffect(()=>{
    if(!loading){
        socket.current.emit('userOnline', {info:infoParticipants});
    }
    
},[infoParticipants, loading])


// useEffect(()=>{
//     // const currentUserEmail = getStorage('EMAIL');
//     // const data = {

//     //     currentEmail: currentUserEmail,
//     //     listOfGuests:infoParticipants
//     // }
//     socket.current.emit('userOnline', {info:infoParticipants})
// },[]);

// useEffect(()=>{
//     if(!loading){

//         socket.current.on('usersOnline', (data)=>{
        
//         // const bool = infoParticipants.every(user=>{
//         //     return data.usersOnline.includes(user.user_email);
//         // })
//         console.log('users online', data.usersOnline, infoParticipants)
//         console.log('VENMON', data.list)
//         if(data.list !== infoParticipants.length){
            
//             // setUserJoin(data.usersOnline);
//             console.log('change ahppened')
//         }
//         // setOnlineUsers(data.usersOnline)      
//     })
//     }
    
// },[id, infoParticipants, loading]);

// useEffect(()=>{

// const currentUser = getStorage('USER');
// const settings =  participantsSettings(currentUser, infoParticipants, messages);
// setUserSettings(settings);
// },[onlineUsers])

// useEffect(()=>{
    
//     const updateOnlineUsers = async()=>{
//                     const participants = await getParticipantsInThread(id);
//                     setInfotParticipants(participants);
//                     const settings =  participantsSettings(currentUser, participants, msg.chat);

//                     setUserSettings(settings);
//     }


// },[onlineUsers])



    useEffect(()=>{
       
        socket.current.on('getMessage', (data)=>{
            setMessage(arr =>[data.myMessage, ...arr ]);
        })
        
    },[]);

    useEffect(()=>{

      if(msgInfo !== ''){

           socket.current.emit('sendMessage',{msg:msgInfo})
      }
           
    },[msgInfo]);

    //make this async
//   function notifications(){
//         const usersToNotify = infoParticipants.filter(person=>!onlineUsers.includes(person.user_email)); 
//         console.log('Notify these users', usersToNotify)
//         if(usersToNotify < infoParticipants.length){
//             const link = `http://localhost:8800/chatroom/${id}`;
           
//             notifyUser(usersToNotify,ventureName, user, link);
//             console.log('We have users to notfy');
           
//         }
        
//     }
    
    function handleChange(e){

        setFormData(e)
    }
    function handleChange2(e){
    
        setFormData2(e)
    }
    function handleTextChange(e){
  
        setFormData3(e)
       
    }
    function toggleShowChat(){
      setShowChat(true)
      setMessageForm(false)
    }
    function toggleShowMessageForm(){
        setShowChat(false)
      setMessageForm(true)

    }

    
    function exportChatMessages(){
        setExportChat(true);
        const email = getStorage('EMAIL');
        exportVentureChat(email, id);
        setTimeout(()=>{
            setExportChat(false);
            setSuccessExport(true);
           
        },3000)
        setTimeout(()=>{
            
            setSuccessExport(false)
        },5000)
    }
    function submitMessage(e){

        e.preventDefault();
        let time = moment().format('LLL');

        const message = {
            msg:formData3,
            pillarOne:formData,
            pillarTwo:formData2,
            time:time,
            username:user,
            message:formData3,
            ventureId: id
        }
        if(userSetting[user].count < 10){
            if(message.msg !== '' && message.pillarOne!== '' && message.pillarTwo !== '' && isActive){
             
            setMsgInfo(message);
            saveMessage(message, time, id);
            userSetting[user].count++;
           
            // const link = `http://localhost:3000/chatroom/${id}`;
             const link = ` https://venturechat.netlify.app/chatroom/${id}`;
            if(newParticipants !== null){
                const usersToNotify = newParticipants.filter(person=>!onlineUsers.includes(person.user_email)); 
                sendNotification(usersToNotify,ventureName, user, link);
                console.log('Notify these users NEW', usersToNotify)
            }
            else{
                const usersToNotify = infoParticipants.filter(person=>!onlineUsers.includes(person.user_email)); 
                sendNotification(usersToNotify,ventureName, user, link);
                console.log('Notify these users', usersToNotify)
            }
    
            }
        }
        else{
            console.log('limit reached')
            
        }  
    }
    function navToGuestForm(){
        navigate('/invite', {state:{ventureId:id, ventureTitle:ventureName},replace:true})
    }



    // if(loading ) return <h1>Loading...</h1>
    
    return(<>
    
    
    {loading?<>Setting up the room, please wait...</>:
    
        <>
    <div className="content-container">
        <section className="content headerChat">
             <ChatHeader 
              ventureName = {ventureName} 
              chat = {messages}
              currUserEmail={ getStorage('EMAIL') }
              infoParticipants = { infoParticipants}
              newInfoParticipants = {newParticipants}
              ventureBio = {ventureBio}
              userSetting = {userSetting}
              loading={secondLoading}
              brainstormOwner = { ventureOwner }
              isActive = { isActive }
              
              />

        </section>
        <section className="seperator"></section>
            <section className='chat-container content'> 
            {
                messageForm?  <MessageForm 
                handleChange={handleChange}
                handleChange2={handleChange2} 
                handleTextChange={handleTextChange} 
                submitMessage={submitMessage} 
                dataOne = {formData}
                dataTwo = {formData2}
                dataThree = {formData3}
                hostAudio = {hostAudio}
                countRemaining = {userSetting[user].count}
                isActive = { isActive }
            /> : <></>
            }
            {
                showChat?<section id='chat' className='messages-container'>
                <div className="messages-wrapper">
                    {messages.map((message, id) => {
                     
            
                        return (
                            
                            <div className='message-container' > 
                
                                <p  className='message' style={{backgroundColor: userSetting[message.username].msgColor}}  id = {id+id}> 
                
                                    <div className='message-header'  id = {id+3}>
                
                                        <b>{message.pillarOne}</b> <b>{message.pillarTwo} </b> 
                
                                    </div>
                
                                    <br></br>
                
                                    {message.msg} 
                
                                    <br></br>
                
                                    <label className='time'> {message.time} </label>
                
                                    <div className={`user-image ${userSetting[message.username].class} ${userSetting[message.username].color}`} > {message.username[0]} </div>
                                </p>
                            
                            </div>
                       
                        )
                    })}
                </div>
                </section>:<></>
            }

            
            </section>
            </div>
            <div className="icons-container">
                        <label className="icon icon-left ">
                            <input type="radio" id="sendMessage" name="item" onClick={toggleShowMessageForm} />
                            <img src={msgIcon}  title='Send message' alt='send message'/>
                        </label>
                        
                        <label className='icon' >
                            <input type="radio" id="chatIcon" name="item" onClick={toggleShowChat} />
                            <img src={chatIcon} title='View Chat' alt='view chat'/>
                        </label>
                        {!exportChat && !successExport?  <label className='icon'>
                            <input type="radio" id="export" name="item" onClick={exportChatMessages}/>
                            <img src={exportIcon}  title='Export Chat' alt='export chat'/>
                        </label>:<></>

                        }
                       
                      { exportChat?<> 
                        <label className='icon'>
                            <ClipLoader size={1}/>

                        </label></>:<></>}
                        {successExport?
                        <label className='icon'>
                          
                            <img src={thumbsUp} className='successSent'  title='Sent' alt='Sent'/>
                        </label>:<></>
                    }
                        
                    {
                        isActive && infoParticipants.length < 4? 
                        <label className='icon-right icon'>
                        <input type="radio" id="invite" name="item" onClick={navToGuestForm}/>
                        <img src={inviteIcon}  alt='invite' title="Invite"/>

                    </label>:
                    <></>
                    }
                       
                   
            </div>
        </>}
</>
    )
   

}