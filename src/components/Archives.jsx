
import deleteIcon from '../assets/trash.png'
import moment from 'moment'
import undoIcon from '../assets/unarchive.png'

export default function Archives({brainstorms, deleteFn, undoFn, showArchived, url, userEmail}){
    
    return(

<section className='table-container' >
        <header className='wrapper hwrap'>
        <label className='bs-label'>Name</label>
        <label className='grid-status brd-left bs-label '>Last updated</label>
        <label className='grid-status bs-label'>Created on</label>
        <label className='grid-status bs-label' >Status</label>
        <label className='grid-status brd-right bs-label'>Action</label>
    </header>


    {

        brainstorms.map((brainstorm)=>{

            if(showArchived){
                return(
                    <section className='wrapper row'>
        
                    <div className='row-data brd-left chatroom-btn'>
                    <a href={url+brainstorm.venture_id} className='title-wp bs-label'>{brainstorm.venture_name}</a>
                    <label className='grey-text bs-label'>{
                          brainstorm.guests.map(guest=>{
                            return guest.fname.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                        }).join(', ')}</label>
                    </div>
         
                    <div className='grid-status'>
         
                         <label className='grey-text bs-label'>{moment(brainstorm.last_updated).format('LLL')}</label>
                     </div>
         
                    <div className='grid-status'>
                         <label className='grey-text bs-label'>{moment(brainstorm.creation_date).format('LLL')}</label>
                    </div>
         
                    <div className='grid-status'>
                    {brainstorm.active === true?<label className='active bs-label'>Active</label>:
                                            <label className='completed bs-label'>Complete</label>
                                           
                     }
                    </div>
         
                    <div className='grid-status brd-right'>
                        <section className='actions-wrapper'>
                                  {brainstorm.host_email === userEmail ? 
                                       <div className='action-container'>
                                         <img className='archive' src={undoIcon} alt={brainstorm.id} onClick={undoFn} />
                                        <img className='delete' src={deleteIcon} alt={brainstorm.id} onClick={deleteFn} />
                                         </div>
                                        : 
                                        <div className='action-container'>
                                        <img className='archive' src={undoIcon} alt={brainstorm.id} onClick={undoFn} />
                                        </div>
                                        }
                        </section>
                     </div>
                 </section>
                    )
            }
             return []
        })

    }
 

</section>










    //  <table>
    //           <thead>
    //             <tr>
    //                 <th scope="col" colSpan={1}> Name </th>
    //                 <th scope="col" colSpan={1}> Last updated </th>
    //                 <th scope="col" colSpan={1}> Created on </th>
    //                 <th scope="col" colSpan={1}> Status</th>
    //                 <th scope="col" colSpan={1}> Action </th>
    //             </tr>
    //             </thead>
    //             <tbody>
    //                 {
    //                     brainstorms.map((brainstorm)=>{
    //                         console.log(brainstorm)
    //                         return( 
    //                         <tr>  
    //                         <td className='chatroom-btn'>
    //                         <div className='bs-info'>
    //                             <a href='ass'>
    //                             <h3>
    //                             {brainstorm.data}
    //                             </h3>
    //                             <p>
    //                             {brainstorm.guests.toString()}
    //                             </p>
    //                             </a>
                                
    //                         </div>
    //                     </td>
    //                    <td>{moment(brainstorm.last_updated).format('LLL')}</td>
    //                    <td> Jun 11, 3023 23:00PM</td>
    //                    <td>  
    //                        <div className="status">
    //                            {brainstorm.active === true?<div className='active'> Active</div> :
    //                             <div className='completed'> Completed</div> 
    //                            }
    //                        </div>
    //                     </td>
    //                    <td> 
                           
                                
    //                             {brainstorm.host === curr_user ? 
    //                            <div className='action-container'>
    //                              <img className='archive' src={archiveIcon} alt={brainstorm.id} onClick={undoFn} />
    //                             <img className='delete' src={deleteIcon} alt={brainstorm.id} onClick={deleteFn} />
    //                              </div>
    //                             : 
    //                             <div className='action-container'>
    //                             <img className='archive' src={archiveIcon} alt={brainstorm.id} onClick={undoFn} />
    //                             </div>
    //                             }
                               
    //                     </td>
    //                 </tr>
    //                 )
    //                     })
    //                 }
    //             </tbody>
                
    //         </table>
    )
}