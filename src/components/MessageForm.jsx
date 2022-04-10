import soundBite from '../styles/sound_img.png'

export default function MessageForm({handleChange, submitMessage, handleTextChange, handleChange2, dataOne, dataTwo, dataThree}){

    return(
<main className="form-container">
        <form action="">
            <section>
                <ul>
                    <h4 className="sound"> Venture Sound Bite <img src ={ soundBite } alt="sound-bite"/></h4>
                    {/* <h4 className="sound"> Venture Sound Bite 🔊</h4> */}
                    
                </ul>
            </section>

            <section id="pillar-1">
                <ul>
                    <header><h4><b>I want to...</b></h4></header>
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
                    <p className='sub-text'>{dataOne} on prior comments ("Yes, and... ")</p> 
                </ul>
               

            </section>

            <section id="pillar-2">
                <ul>
                    <header><h4><b>Regarding...</b></h4></header>
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
                    <p className='sub-text'> Direct your action toward the {dataTwo} pillar </p> 
                    
                </ul>

            </section>

            <section className="text-area">
                <ul> 
                    <header><h4><b> My thoughts... </b></h4></header>
                    <textarea onChange={(event) => handleTextChange(event.target.value)  } name="thoughts" id="999"  rows="10" maxLength="500" wrap="hard"></textarea>
                    <p className='sub-text'>{dataThree.length}/500 characters</p> 
            </ul>
    
            </section>
            <section>
           <ul>
              <button id ='post-button' onClick={submitMessage}> Post </button> 
           </ul>
            </section>
        </form>
        

    </main>


    )
}