import { useEffect, useState } from 'react'
import soundBite from '../styles/sound_img.png'

export default function MessageForm({handleChange, 
    submitMessage,
     handleTextChange, 
     handleChange2, 
     dataOne,
      dataTwo,
       dataThree,
        hostAudio,
         countRemaining, 
         isActive}){
const [audi] = useState(new Audio(hostAudio));
const [isplaying, setIsPlaying] = useState(false);

const playSound = ()=>{
    if(isplaying){
        audi.pause();
        setIsPlaying(false)
    }else{
        audi.play();
        setIsPlaying(true)
    }
        
}

useEffect(() => {
    audi.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audi.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

return(
<main className="form-container">
        <form action="">
            <section>
                {
                    hostAudio? 
                    <div>
                    <h4 className="sound"> Venture Sound Bite <img src ={ soundBite } onClick={playSound} alt="sound-bite"/>{isplaying? <p className='auido-playing-identifier'>playing audio..</p>:<></>}</h4>
                    {audi !== ''? <audio src={audi} id='myAudio' style={{ display:'none' }} ></audio>:<></>} 
                    </div>: <h4 className="sound"> Venture Sound Bite (not available)  </h4>
             
                }
            </section>

            <section id="pillar-1">
               
                    <header><h4><b>I want to...</b></h4></header> 
                    <div className='pillar-wrapper'>
                    <label> 
                        <input onChange={(event) => handleChange(event.target.value)} type="radio" name="pillar-one" id="11" value="Expand"/> 
                         <span> Expand </span>
                    </label>
                    <label>
                        <input onChange={(event) => handleChange(event.target.value)} type="radio" name="pillar-one" id="21"value='Challenge'/>
                        <span> Challenge </span>  
                    </label>
                    <label>
                        <input onChange={(event) => handleChange(event.target.value)} type="radio" name="pillar-one" id="31" value="Clarify"/>
                        <span> Clarify </span>
                       
                    </label>
                    <label>
                        <input onChange={(event) => handleChange(event.target.value)}type="radio" name="pillar-one" id="41" value="Diverge"/>
                        <span> Diverge </span>
                    </label>
                    </div>
                    <p className='sub-text'>{dataOne} on prior comments ("Yes, and... ")</p> 
               
               

            </section>

            <section id="pillar-2">
                
                    <header><h4><b>Regarding...</b></h4></header>
                    <div className='pillar-wrapper'>
                    <label> 
                        <input onChange={(event) => handleChange2(event.target.value)}type="radio" name="pillar-two" id="51" value="Problem" /> 
                         <span> Problem </span>
                    </label>
                    <label>
                        <input onChange={(event) => handleChange2(event.target.value)}type="radio" name="pillar-two" id="61"value='Setting'/>
                        <span> Setting </span>  
                    </label>
                    <label>
                        <input onChange={(event) => handleChange2(event.target.value)}type="radio" name="pillar-two" id="71" value="Character"/>
                        <span> Character </span>
                       
                    </label>
                    <label>
                        <input onChange={(event) => handleChange2(event.target.value)} type="radio" name="pillar-two" id="81" value="Solution"/>
                        <span> Solution </span>
                    </label>
                    </div>
                    <p className='sub-text'> Direct your action toward the {dataTwo} pillar </p> 
                    
                

            </section>

            <section className="text-area-chat">
                <div> 
                    <div className='myThoughts-container'>
                         <header><h4><b> My thoughts... </b></h4></header>
                        <textarea onChange={(event) => handleTextChange(event.target.value)  } name="thoughts" id="my-thoughts" className='text-area' rows="10" maxLength="500" wrap="hard"></textarea>
                        <p className='sub-text'>{dataThree.length}/500 characters</p> 
                    </div>
                   
            </div>
    
            </section>
            <section>
           <div className='postBtn-container'>
               
               {countRemaining < 10 && isActive===true ? <button id ='post-button' onClick={submitMessage}> Post </button>:
               
               <button id ='post-button' style={{'background-color': 'grey', 'cursor': 'not-allowed'}} disabled> Post </button>  }
              
              <div className='remain-messages-form-entry'>Remaining messages: {10-countRemaining}</div>
           </div>
            </section>
        </form>
        

    </main>


    )
}