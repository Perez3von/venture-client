
import '../styles/participantInfo.css';

export default function ParticipantInfo({ name, message_remining, color}){
    return(
        < div className='main-div-participantInfo' >
          <div className={`profile-icon ${color}`}>{name[0].toUpperCase()}</div>
            <div className="infomation-div">
                
                <p className="user-name"> {name} </p>
                <p className="remaining"> {message_remining}/10 remaining </p>
            </div>
        </div>
    )
}
