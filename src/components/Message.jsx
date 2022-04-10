import '../styles/message.css'


export default function Message({message, id,}){
    // const message = JSON.parse(msg);
    // let time = moment().format('LT');
    console.log(message)
    return(
        <section className='chat-container'>
            
            <div className='message-container'> 

                <p id = {id} className='message'> 

                    <div className='message-header'>

                        <b>{message.pillarOne}</b> <b>{message.pillarTwo}</b> 

                    </div>

                    <br></br>

                    {message.msg} 

                    <br></br>

                    <label className='time'> {message.time} </label>

                    <div className='user-image'> {message.username[0]} </div>
                </p>
            
            </div>
        </section>
        )

    
}