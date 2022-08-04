import { useEffect, useState } from "react"
import MyBrainstorms from "../components/MyBrainstorms"
import OtherBrainstorms from "../components/OtherBrainstorms"
import Archives from "../components/Archives"
import showIcon from '../assets/show.png'
import hideIcon from '../assets/hide.png'
import expandIcon from '../assets/Vector.png'
import contractIcon from '../assets/expand.png'
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { handleBrainstorms } from "../utils/helperFunctions"
import { getStorage } from "../utils/localStorage"
import { completeBrainstormAPI, deleteBrainstormAPI, getBrainstormsFromAPI, updateArchivesAPI } from "../utils/api"


export default function Brainstorms(){
   
const [brainstorms, setBrainstorms] = useState({});
const [update, setUpdate] = useState('false');
const [showCompleted, setShowCompleted] = useState(false);
const [showArchived, setShowArchived] = useState(false);
const [loading, setLoading] = useState(true)
const curr_user = 'perez'
const BASE_URL = 'http://localhost:3000/chatroom/'
const override = css`
  display: block;
  margin: 0 auto;
  border: none;
`;

const getBrainstormData = async()=>{
    const userEmail = getStorage('EMAIL');
    try {

        const data = await getBrainstormsFromAPI(userEmail); //{ventures:[], archives:[] }

        const parsedBrainstorms = handleBrainstorms(data.ventures, data.archives, userEmail);
       
        setBrainstorms(parsedBrainstorms);
         console.log(data, parsedBrainstorms)
        //this delay is not needed, was used to simulate await
        setLoading(false)
    
    } catch (error) {
        console.log(error);
    }  
}



useEffect(()=>{
    setLoading(true)
    getBrainstormData();
},[])

async function completeBrainstorm(e){
    e.preventDefault();
    const confirm = window.confirm('Are you sure you want to complete the chat?');
    if(!confirm){
        return 0;
    }else{
    const userEmail = getStorage('EMAIL');
    console.log('VENOM',e.target.alt )
    const y = brainstorms.myBrainstormsActive.get(e.target.alt);
  
     await completeBrainstormAPI(y.venture_id, userEmail)
  
        
    
    console.log("WTF is this not working", y.venture_id)
    y.active = false;
    brainstorms.myBrainstormsCompleted.set(e.target.alt, y);
    
    console.log('Archives', brainstorms.archives)
    
    brainstorms.myBrainstormsActive.delete(e.target.alt);
    
    setUpdate(Date.now());

    }
    
    
    //toggle update T/F would do this bette?
}

 async function deleteBrainstorm(e){
    e.preventDefault();
    const confirm = window.confirm('Are you sure you want to permanently delete this brainstorm?');
    const userEmail = getStorage('EMAIL');
    if(!confirm){
        return 0;
    }
    if(brainstorms.myBrainstormsCompleted.get(e.target.alt)){
        const y = brainstorms.myBrainstormsCompleted.get(e.target.alt);
        await deleteBrainstormAPI(y.venture_id, userEmail);
        brainstorms.myBrainstormsCompleted.delete(e.target.alt);
        
    }
    else{
        const y = brainstorms.archives.get(e.target.alt);
        await deleteBrainstormAPI(y.venture_id, userEmail);
        brainstorms.archives.delete(e.target.alt);
        console.log(brainstorms.archives);
         
    }

  
    setUpdate(Date.now())
}

async function archiveBrainstorm(e){
    e.preventDefault();
    const userEmail = getStorage('EMAIL');
    let y = null;
    if(brainstorms.myBrainstormsCompleted.get(e.target.alt)){
        y = brainstorms.myBrainstormsCompleted.get(e.target.alt);
        brainstorms.archives.set(e.target.alt, y );
        brainstorms.myBrainstormsCompleted.delete(e.target.alt);
        await updateArchivesAPI(userEmail, y.venture_id);
    }
    else{
        y = brainstorms.invitedBrainstorms.get(e.target.alt);
        brainstorms.archives.set(e.target.alt, y );
        brainstorms.invitedBrainstorms.delete(e.target.alt);
        await updateArchivesAPI(userEmail, y.venture_id);
    }
    setUpdate(Date.now())
    
//api call to add to archive
}

function undoArchive(e){
    e.preventDefault();
    const currUserEmail = getStorage('EMAIL')
    if(brainstorms.archives.get(e.target.alt)){
        const y = brainstorms.archives.get(e.target.alt);
        const apiCall = async()=>{
           updateArchivesAPI(currUserEmail, y.venture_id); 
        }
        apiCall();
        
        console.log('WHY',y)
        if( currUserEmail === y.host_email){
            brainstorms.myBrainstormsCompleted.set(e.target.alt, y);
            brainstorms.archives.delete(e.target.alt);
            console.log(brainstorms.brainstormsCompleted)

        }
        else{
            brainstorms.invitedBrainstorms.set(e.target.alt, y);
            brainstorms.archives.delete(e.target.alt);
        }
    }
    setUpdate(Date.now());
}

function toggleShowCompleted(){
    if(showCompleted===true){
        setShowCompleted(false)
    }else{
        setShowCompleted(true)
    }
}
function toggleShowArchived(){
    if(showArchived===true){
        setShowArchived(false)
    }else{
        setShowArchived(true)
    }
}

    if(!loading){

        return(
            <div className="brainstorms-container">
            <section className="b-section">
    
            <header className="mybrainstorms-header">
                
               <h2>My Brainstorms ( { brainstorms.myBrainstormsActive.size + brainstorms.myBrainstormsCompleted.size } )</h2> 
               {
                    showCompleted? 
                    <h5 className="toggleShow-wrapper">
                        <img className='complete' src={showIcon} alt='show'  onClick={toggleShowCompleted}/> 
                        Hide completed
                    </h5> :
                    <h5 className="toggleShow-wrapper">
                    <img className='complete' src={hideIcon} alt='show'  onClick={toggleShowCompleted}/>  
                    Show completed
                    </h5>
                } 
                
            </header>
            {brainstorms.myBrainstormsActive.size > 0 || brainstorms.myBrainstormsCompleted.size > 0  ? 
             <MyBrainstorms
              
             brainstormsActive={Array.from(brainstorms.myBrainstormsActive.values()).sort( (a, b) =>{
             
                return new Date(b.last_updated) - new Date(a.last_updated)
            })}
             brainstormsCompleted={Array.from(brainstorms.myBrainstormsCompleted.values())}
             completeFn = {completeBrainstorm}
             deleteFn = {deleteBrainstorm}
             showCompleted = {showCompleted}
             archiveFn = {archiveBrainstorm}
             url={BASE_URL}
              /> : 'You have no brainstaims to display'
    
    
            }
             
            </section>
    
            <section className="b-section">
    
            <header className="mybrainstorms-header">
               <h2>Invited Brainstorms ( { brainstorms.invitedBrainstorms.size } )</h2>
            </header>
            {
                brainstorms.invitedBrainstorms.size > 0 ?  
                <OtherBrainstorms 
                brainstorms={Array.from(brainstorms.invitedBrainstorms.values()).sort( (a, b) =>{
             
                    return new Date(b.last_updated) - new Date(a.last_updated)
                })}
                archiveFn = {archiveBrainstorm}
                url={BASE_URL}
                /> : 'No invited brainstorms to display'
            }
            </section>
    
            <section className="b-section">
                <header className="mybrainstorms-header">
                  <h2 className="toggleShow-wrapper">
                  {
                    showArchived? <img className='complete' src={contractIcon} alt='show'  onClick={toggleShowArchived}/> :
                    <img className='complete' src={expandIcon} alt='show'  onClick={toggleShowArchived}/> 
                } 
                      
                      Archived ( { brainstorms.archives.size } )</h2>  
                </header>
                
                {
                    brainstorms.archives.size > 0 ?
                    <Archives 
                    brainstorms={Array.from(brainstorms.archives.values()).sort( (a, b) =>{
             
                        return new Date(b.last_updated) - new Date(a.last_updated)
                    })}
                    deleteFn = {deleteBrainstorm}
                    undoFn = {undoArchive}
                    showArchived = {showArchived}
                    url={BASE_URL}
                    userEmail={ getStorage('EMAIL') }
                    /> : 'No archives to display'
    
                }
                
            </section>
           </div>
            
        )
    } else{
        return(<h2 className="bs-loading">Gathering your brainstorms
            <PulseLoader color={"#c2e7ff"} loading={loading} css={override} size={2} />
        </h2>)
    }
   
}