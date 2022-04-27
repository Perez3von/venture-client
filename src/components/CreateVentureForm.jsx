

export default function CreateVentureForm({ 
    ventureID,
    ventureTitle,
    firstName,
    hostEmail,
    // setVentureID,
    setVentureTitle, 
    setFirstName,
    setHostEmail,
    handleCreateThreadByHost,
    // hostSound,
    // setHostSound,
    recordAudio
}){
    return(

        <div className='form-containers' >
            <form className='form-main' onSubmit={handleCreateThreadByHost} >
                <fieldset>
                    <legend className='legend'>Create your venture</legend>
                    <h1 className="guest-login-head">What's your idea? 💡</h1>
                    <label htmlFor='ventureTitle'>
                    <input
                        id='ventureTitle'
                        required
                        value={ventureTitle}
                        type='text'
                        placeholder='Name your venture'
                        className='input-create'
                        onChange={({ target }) => {
                          setVentureTitle(target.value);
                        }}
                    />
                    </label>
                
                    <label htmlFor='firstName'>
                        <input
                        id='firstName'
                        required
                        value= {firstName}
                        type='text'
                        placeholder='Enter your first name'
                        className='input-create'
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
                        className='input-create'
                          onChange={({ target }) => {
                            setHostEmail(target.value);
                          }}
                        />
                    </label>
                    
                    <label className="record-label">Record a venture audio
                      <label htmlFor='hostSound'>
                        <input
                        id='hostSounf'
                        required
                        value='Record'
                        type='button'
                        placeholder='host Sound'
                        className='input-sound'
                        onClick={ recordAudio}
                        />
                    </label></label>
                    
                    <button type='submit' className='primary-btn'>
                    Join Conversation
                    </button>

                </fieldset>
            </form>

    </div>


    )
}