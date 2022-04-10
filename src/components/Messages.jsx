
// import { io } from 'socket.io-client'
// import { useState, useEffect } from 'react'
// import { useRef } from 'react';
// import Message from './Message';
// import moment from'moment';
// export default function Messages({msgInfo}){

//     const socket = useRef();
//     // const [socket, setSocket] = useState(null);
//     // const [messages, setMessage] = useState([]);
//     // const [text, setText] = useState('');
  



//     useEffect(()=> {
//     let params = new URLSearchParams(document.location.search);
//     let name = params.get('name');
//     let room = name;
//         // setSocket(io('ws://localhost:8900'));
//         socket.current = io('ws://localhost:8900');
//         socket.current.emit('create', {
//             room: room })
//             console.log(room)
       

//     },[]);
// // here might be slow
//     useEffect(()=>{
//         socket.current.on('getMessage', (data)=>{
//             setMessage( arr => [...messages, data.myMessage ]);
//         })
//     },[messages])

//    //problem here, make a function maybe not useEfect
//     useEffect(async ()=>{
      
//              let message = await JSON.parse(msgInfo)

//         if(message.msg !== '' && message.pillarOne!== '' && message.pillarTwo !== '' ){
            
//             setText(msgInfo);
//             socket.current.emit('sendMessage',{msg:msgInfo})
        
//         }

       
        
//     },[msgInfo])




    // function onclick(){
    //     if(text !== ''){
    //         socket.current.emit('sendMessage',{msg:text})
    //     console.log(messages);
    //     }
       
    // }

    // function handleChange(e){
    //     e.preventDefault();
    //     const msg = e.target.value;
    //     let time = moment().format('LT');
    //     console.log(moment().format('LT'))
    //     setText(msg + '  @' + time); 
    // }

    // return (
        
    //     <section className='chat-container'>
    //     {/* <div>
    //         <input type='text' placeholder='enter message' onChange={handleChange}/>
    //     </div>
    //     <button onClick={onclick}> Send </button> */}
    //     <ul>
    //         {messages.map((message,id) => {
    //             return <Message msg = {message} key= {id} />
    //         })}

    //     </ul>
    //     </section>
       
    // )
// }