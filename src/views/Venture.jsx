import MessageForm from "../components/MessageForm";
import '../styles/message.css'
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
    const [infoParticipants, setInfotParticipants] = useState([]);
    const [userSetting, setUserSettings] = useState({});
    const socket = useRef();
    const {id} = useParams()
    const navigate = useNavigate();
   
    useEffect(()=> {
        
        const currentUser = getStorage('USER');
        const currentUserEmail = getStorage('EMAIL');
         let room = id;
        if(currentUser.length === 0 || currentUserEmail.length === 0){
            navigate('/login', {state:{ventureId:id},replace:true});
        } else{
            let username = currentUser;
            setUser(username);
            const oldMessages = async() => {
                try {
                    let msg = await getMessages(id);
                    console.log(msg.chat)
                    const data = await getVentureData(id);
                    setVentureName(data.venture_name);
        
                    if(msg === false){
                        alert('This chat does not exist');
                        navigate('/');
                    }
                    setMessage(msg.chat);
                    
                    const participants = await getParticipantsInThread(id);
                    setInfotParticipants(participants);
                    const settings =  participantsSettings(currentUser, participants, msg.chat);
                    console.log('HERE ME', settings)
                    setUserSettings(settings);
                    
                    let canAccess = false;
                    for(let i = 0; i < participants.length; i++){
                        
                        if(currentUserEmail === participants[i].user_email){
                            canAccess = true;
                            setLoading(false);

                        }
                    }
                    if(canAccess === false ){
                        alert('You do not have access to this chat');
                        navigate('/')
                        console.log('no access')
                    }
                    
                } catch (error) {
                alert('An error occured, make sure chat url is valid');
                console.log(error)
                    
                }
            };
            oldMessages();
        };
        socket.current = io('ws://localhost:8900');
        socket.current.emit('create', {
                room: room });
    },[id, navigate]);

    useEffect(()=>{
       
        socket.current.on('getMessage', (data)=>{
            setMessage(arr =>[...arr, data.myMessage]);
        })
        
    },[id])

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
        if(userSetting[user].count < 10){
                if(message.msg !== '' && message.pillarOne!== '' && message.pillarTwo !== ''){
                console.log(userSetting[user].count)
            setMsgInfo(message);
            saveMessage(message);
            userSetting[user].count++;
            
            }
        }
        else{
            console.log('limit reached')
        }
       
       
    }

    // if(loading ) return <h1>Loading...</h1>
    
    return(<>
    
    
    {loading? <h1>Loading...</h1> :
    
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
            <section id='chat' className='chat-container'>
                <ul>
                    {messages.map((message, id) => {
                     
            
                        return (
                            
                            <div className='message-container' id = {id}> 
                
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
                </ul>
                </section>
            </section>
            </div>
        </>}
</>
    )
   

}