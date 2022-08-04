import complete from '../assets/check-circle.png'
import archiveIcon from '../assets/archive.png'
import deleteIcon from '../assets/trash.png'
import moment from 'moment'
import { useEffect } from 'react'
export default function MyBrainstorms({brainstormsActive, brainstormsCompleted, deleteFn, completeFn, archiveFn, showCompleted, url}){
    // const completed = false;
    useEffect(()=>{
        console.log("HERE", brainstormsActive, brainstormsCompleted)
    },[brainstormsActive, brainstormsCompleted])
    return(

<section className='table-container' >
        <header className='wrapper hwrap'>
            <label className='bs-label'>Name</label>
            <label className='grid-status brd-left bs-label'>Last updated</label>
            <label className='grid-status bs-label' >Created on</label>
            <label className='grid-status bs-label' >Status</label>
            <label className='grid-status brd-right bs-label'>Action</label>
        </header>


        {brainstormsActive?

            brainstormsActive.map((brainstorm)=>{
                return(
                <section className='wrapper row'>

                <div className='row-data brd-left chatroom-btn'>
                <a href={url+brainstorm.venture_id} className='title-wp bs-label'>{brainstorm.venture_name}</a>
                <label className='grey-text bs-label'>{
                    brainstorm.guests.map(guest=>{
                        return guest.fname.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                    }).join(', ')
                    // brainstorm.guests.map((n,i)=>{
	
                    //     return brainstorm.guests[i] = n.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                        
                    // }).join(', ')
                    
                    }</label>
                </div>
     
                <div className='grid-status'>
     
                     <label className='grey-text bs-label'>{moment(brainstorm.last_updated).format('LLL')}</label>
                 </div>
     
                <div className='grid-status'>
                     <label className='grey-text bs-label'>{moment(brainstorm.creation_date).format('LLL')}</label>
                </div>
     
                <div className='grid-status'>
                    <label className='active bs-label'>Active</label>
                </div>
     
                <div className='grid-status brd-right'>
                    <section className='actions-wrapper'>
                    <img className='complete' src={complete} alt={brainstorm.id}  onClick={completeFn}/> 
                    </section>
                 </div>
             </section>
                )
            }):<></>
        }

        { brainstormsCompleted?

    brainstormsCompleted.map((brainstorm)=>{
            if(showCompleted){
        return(
            <section className='wrapper row'>
        
            <div className='row-data brd-left chatroom-btn'>
            <a href={url+brainstorm.venture_id} className='title-wp bs-label'>{brainstorm.venture_name}</a>
            <label className='grey-text bs-label'>{
               
               brainstorm.guests.map(guest=>{
                return guest.fname.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
            }).join(', ') }</label>
            </div>
        
            <div className='grid-status'>
        
                 <label className='grey-text bs-label'>{moment(brainstorm.last_updated).format('LLL')}</label>
             </div>
        
            <div className='grid-status'>
                 <label className='grey-text bs-label'>{moment(brainstorm.creation_date).format('LLL')}</label>
            </div>
        
            <div className='grid-status'>
                <label className='completed bs-label'>Complete</label>
            </div>
        
            <div className='grid-status brd-right'>
                <section className='actions-wrapper'>
                <img className='archive' src={archiveIcon} alt={brainstorm.id} onClick={archiveFn}/>
                <img className='delete' src={deleteIcon} alt={brainstorm.id} onClick={deleteFn} />
                </section>
             </div>
         </section>
            )
    }
    return []
    }):<></>
        }
    
</section>




        //   <table>
        //       <thead>
        //         <tr>
        //             <th scope="col" colSpan={1}> Name </th>
        //             <th scope="col" colSpan={1}> Last updated </th>
        //             <th scope="col" colSpan={1}> Created on </th>
        //             <th scope="col" colSpan={1}> Status</th>
        //             <th scope="col" colSpan={1}> Action </th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {
        //                 brainstormsActive.map((brainstorm)=>{
        //                     return( 
        //                     <tr id={brainstorm.data}>  
        //                     <td className='chatroom-btn'>
        //                     <div className='bs-info'>
        //                         <a href='ass'>
        //                         <h3>
        //                         {brainstorm.data}
        //                         </h3>
        //                         <p>
        //                         {brainstorm.guests.toString()}
        //                         </p>
        //                         </a>
                                
        //                     </div>
        //                 </td>
        //                <td>{moment(brainstorm.last_updated).format('LLL')}</td>
        //                <td> Jun 11, 3023 23:00PM</td>
        //                <td>  
        //                    <div className="status">
        //                        <div className='active'> Active</div>  
        //                    </div>
        //                 </td>
        //                <td> 
        //                    <div className='action-container'>
                               
        //                          <img className='complete' src={complete} alt={brainstorm.id}  onClick={completeFn} /> 
        //                          <img className='delete filler' src={archiveIcon} alt={brainstorm.id}/>

                                
                               
        //                         </div>
        //                 </td>
        //             </tr>
        //             )
        //                 })
        //             }
        //             {
        //                 brainstormsCompleted.map((brainstorm)=>{
        //                     return( 
        //                     <tr id={brainstorm.data}>  
        //                     <td className='chatroom-btn'>
        //                     <div className='bs-info'>
        //                         <a href='ass'>
        //                         <h3>
        //                         {brainstorm.data}
        //                         </h3>
        //                         <p>
        //                         {brainstorm.guests.toString()}
        //                         </p>
        //                         </a>
                                
        //                     </div>
        //                 </td>
        //                <td>{moment(brainstorm.last_updated).format('LLL')}</td>
        //                <td> Jun 11, 3023 23:00PM</td>
        //                <td>  
        //                    <div className="status">
        //                      <div className='completed'> Complete</div> 
                                 
        //                    </div>
        //                 </td>
        //                <td> 
        //                    <div className='action-container'>
                                
        //                         <img className='archive' src={archiveIcon} alt={brainstorm.id} onClick={archiveFn}/>
        //                         <img className='delete' src={deleteIcon} alt={brainstorm.id} onClick={deleteFn} />
                               
                                
        //                         </div>
        //                 </td>
        //             </tr>
        //             )
        //                 })
        //             }
                   
            


            //     </tbody>
                
            // </table>
    )
}