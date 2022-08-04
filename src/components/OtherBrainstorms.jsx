import moment from 'moment'
import archiveIcon from '../assets/archive.png'
export default function OtherBrainstorms({brainstorms, archiveFn,showArchived, url}){
    // const completed = true;
    return (



<section className='table-container' >
        <header className='wrapper hwrap'>
        <label className='bs-label'>Name</label>
        <label className='grid-status brd-left bs-label'>Last updated</label>
        <label className='grid-status bs-label'>Created on</label>
        <label className='grid-status bs-label' >Status</label>
        <label className='grid-status brd-right bs-label'>Action</label>
    </header>


    {

        brainstorms.map((brainstorm)=>{
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
            {brainstorm.active === true?<label className='active'>Active</label>:
                                    <label className='completed'>Complete</label>
                                   
                                   }
                
            </div>
 
            <div className='grid-status brd-right'>
                <section className='actions-wrapper'>
                <img className='complete' src={archiveIcon} alt={brainstorm.id}  onClick={archiveFn}/> 
                </section>
             </div>
         </section>
            )
        })

    }
 

</section>



    )
}