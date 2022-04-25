import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { io } from 'socket.io-client';
import { saveMessage, getMessages, getVentureData} from "../utils/api";
import { getStorage } from "../utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import { getParticipantsInThread } from "../utils/chatParticipants";
import { participantsSettings } from "../utils/helperFunctions";
export default function Venture(){

    const [formData, setFormData] = useState('');
    const [formData2, setFormData2]=useState('')
    const [formData3, setFormData3] = useState('');
    const [msgInfo, setMsgInfo] = useState('');
    const [ventureName, setVentureName] = useState('')
    const [messages, setMessage] = useState([]);
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);
    const [noAccess, setAccessChat] = useState(false);
    const [infoParticipants, setInfotParticipants] = useState([]);
    const [userSetting, setUserSettings] = useState(null);
    const socket = useRef();
    const {id} = useParams()
    const navigate = useNavigate();
   
    useEffect(()=> {
        
        const currentUser = getStorage('USER');
        const currentUserEmail = getStorage('EMAIL');
        
        if(currentUser.length === 0){
            navigate('/login', {state:{ventureId:id},replace:true})
        }
        let username = currentUser;
        setUser(username);
        let room = id;
        const oldMessages = async() => {
            try {
                let msg = await getMessages(id);
            const data = await getVentureData(id);
            setVentureName(data.venture_name);
            console.log('Le Message', data)
            if(msg === false){
                alert('This chat does not exist');
                navigate('/')
                return 
            }
            setMessage(msg.chat);
            
            const participants = await getParticipantsInThread(id);
            setInfotParticipants(participants);
            const settings =  participantsSettings(currentUser, participants);
            setUserSettings(settings);
            // const user = await getUserProfile(userEmail);
            // if(user){
            //     setStorage('USER', user.fname );
            //     setStorage('EMAIL', userEmail);
            // }
            console.log('IDK', participants)
            let canAccess = false;
            for(let i = 0; i < participants.length; i++){
                console.log(currentUserEmail, participants[i])
                if(currentUserEmail === participants[i].user_email){
                    canAccess = true;
                    setLoading(false)

                }
            }
            if(canAccess === false){
                console.log('no access')
                alert('You do not have access to this chat')
                setAccessChat(true)
            }
                
            } catch (error) {
               alert('An error occured, make sure chat url is valid');
                
            }
            

        };
        oldMessages();
        socket.current = io('ws://localhost:8900');
        socket.current.emit('create', {
                room: room })
        console.log(room)
        
        
    },[id]);

    useEffect(()=>{
       
        socket.current.on('getMessage', (data)=>{
            setMessage(arr =>[...arr, data.myMessage]);
        })
        
    },[])

    useEffect(()=>{

      if(msgInfo !== ''){

           socket.current.emit('sendMessage',{msg:msgInfo})
      }
           
    },[msgInfo])
    
    function handleChange(e){

        setFormData(e)
    }
    function handleChange2(e){
    
        setFormData2(e)
    }
    function handleTextChange(e){
  
        setFormData3(e)
       
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

        if(message.msg !== '' && message.pillarOne!== '' && message.pillarTwo !== '' ){
            
         setMsgInfo(message);
        saveMessage(message)
        
        }
       
    }

    
    
    if(loading ) return <h1>Loading...</h1>
    
    return(
        <>
    <div className="content-container">
        <section className="content headerChat">
             <ChatHeader 
              ventureName = {ventureName} 
              chat = {messages}
              user={user}
              infoParticipants = {infoParticipants}
              userSetting = {userSetting}
              
              />
             <section className="seperator"></section>
        </section>
        

            <section className='chat-container content'> 
             <MessageForm 
                handleChange={handleChange}
                handleChange2={handleChange2} 
                handleTextChange={handleTextChange} 
                submitMessage={submitMessage} 
                dataOne = {formData}
                dataTwo = {formData2}
                dataThree = {formData3}
            />
            <section id='chat'>
                <ul>
                    {messages.map((message, id) => {
                     
                        return (
                            
            
                            <div className='message-container' id = {id}> 
                
                                <p  className='message' id = {id+id}> 
                
                                    <div className='message-header' id = {id+3}>
                
                                        <b>{message.pillarOne}</b> <b>{message.pillarTwo}</b> 
                
                                    </div>
                
                                    <br></br>
                
                                    {message.msg} 
                
                                    <br></br>
                
                                    <label className='time'> {message.time} </label>
                
                                    <div className='user-image'> {message.username[0]} </div>
                                </p>
                            
                            </div>
                       
                        )
                    })}
                </ul>
                </section>
            </section>
            </div>
        </>

    )
   

}