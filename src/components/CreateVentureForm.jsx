// import ReactAudioPlayer from "react-audio-player";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
export default function CreateVentureForm({ 
    aboutVenture,
    ventureTitle,
    firstName,
    hostEmail,
    setVentureTitle, 
    setFirstName,
    setHostEmail,
    setAboutVenture,
    handleCreateThreadByHost,
    hostSound,
    recordingState, 
    getRecording
}){
  const override = css`
  display: block;
  margin: 0 auto;
  border: none;
  cursor:not-allowed;
`;

  
    return(

        <div className='form-containers' >
            <form className='form-main' onSubmit={handleCreateThreadByHost} >
                <fieldset>
                    <legend className='legend'>Create your venture</legend>
                    <h1 className="guest-login-head">What's your idea? 💡</h1>  
                    <label htmlFor='firstName'>
                        <input
                        id='firstName'
                        required
                        value= {firstName}
                        type='text'
                        placeholder='Enter your first name'
                        className='input-create home-input'
                          onChange={({ target }) => {
                            setFirstName(target.value);
                          }}
                        />
                    </label>
                
                    <label htmlFor='hostEmail'>
                        <input
                        id='hostEmail'
                        required
                        value={hostEmail}
                        type='text'
                        placeholder='Enter your email'
                        className='input-create home-input'
                          onChange={({ target }) => {
                            setHostEmail(target.value);
                          }}
                        />
                    </label>
                    <label htmlFor='ventureTitle'>
                    <input
                        id='ventureTitle'
                        required
                        value={ventureTitle}
                        type='text'
                        placeholder='Name your venture'
                        className='input-create home-input'
                        onChange={({ target }) => {
                          setVentureTitle(target.value);
                        }}
                    />
                    </label>
                
                    <section className="about-venture-container"> 
                    
                    <textarea 
                    name="about-field" 
                    id="about-field" cols="50" rows="10"
                    wrap="hard" maxLength="500"
                    placeholder="Write about your idea..." 
                    onChange={({target}) => {
                      setAboutVenture(target.value)
                    }}
                    required>
                      
                    </textarea>
                    <p className="about-venture-limit">{aboutVenture.length}/500</p>

                    </section>
                   
                 
                    
                    <label className="record-label">Record a venture audio (30 seconds MAX.)
                    </label>
                    {recordingState? 
                    <section className="recording-live-container">
                      <BeatLoader 
                    
                      color='rgb(232, 240, 254)'
                      css={override}/>
                      <div className="cancel-recording-container">
                        <h3>Recording in progress...</h3>
                        <button 
                        className="cancel-record-btn input-create" 
                        onClick={getRecording.cancelRecording}> Stop recording </button>
                      </div>
                      
                    </section>
                    :
                    <button
                        id='hostSounf'
                        className='input-sound'
                        onClick={ getRecording.beginRecording }
                        > Record </button>
                    }
                    {hostSound !== null && recordingState === false ? 
                    <audio src={hostSound} controls id="preview-sound"></audio> : <></> }
                    <button type='submit' className='primary-btn'>
                    Join Conversation
                    </button>

                </fieldset>
            </form>

    </div>


    )
}