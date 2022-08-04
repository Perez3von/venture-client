// Creates  venture thread id
export function createVentureThreadID(hostEmail, ventureTitle){
    let emailParsed = hostEmail.split('@')[0].toLowerCase();
	let title = ventureTitle.split(' ').join('').toLowerCase();
    return `${emailParsed}-${title}`
}

export function participantsSettings(currentUser, participants, chat){
	console.log('helper funtion data', currentUser, participants, chat)
    const colors = ['red', 'green', 'yellow' ];
	const msgColors = ['#ffdbdb','#ddfbea', '#f8ffdb'];
    let settings = {};
    let c = 0;
	
    	for(let i =0; i < participants.length; i++){
    console.log(currentUser === participants[i].fname.charAt(0).toUpperCase() + participants[i].fname.slice(1).toLowerCase())
    		let className = '';
    		let color = '';
    		if(currentUser === participants[i].fname.charAt(0).toUpperCase() + participants[i].fname.slice(1) ){
    			className = 'currentUser';
    			
    			settings[currentUser] = {
    				class:className,
    				color:'blue',
					msgColor:'#ddecfb',
					count:0
    			}  
    		}
    		else{
    
    			className = 'otherUser';
    			color = colors[c];
    
    			settings[participants[i].fname.charAt(0).toUpperCase() + participants[i].fname.slice(1)] = {
    				class:className,
    				color:color,
					msgColor:msgColors[c],
					count:0
    			}
    
    			c++;
    		}
    	}
		if(chat.length > 1){
			chat.forEach(person => {
			if(settings[person.username]){
				settings[person.username].count++;
			}
		})
		}
		
		console.log(settings)
		return settings;
}



export const recordAudio = async (event, setHostSound) => {
	let recordingStart = window.confirm('Click Ok to record an audio 8 seconds long');

	if(recordingStart){

		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(stream => {
				const mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.start();

				const audioChunks = [];
				mediaRecorder.addEventListener("dataavailable", event => {
					audioChunks.push(event.data);
				});

				mediaRecorder.addEventListener("stop", () => {
					const audioBlob = new Blob(audioChunks);

					const audioUrl = URL.createObjectURL(audioBlob);
					const audio = new Audio(audioUrl);
					audio.play();

					const reader = new FileReader();
					reader.readAsDataURL(audioBlob)
					reader.onloadend = () => {
						setHostSound(reader.result);
					}

				});

				setTimeout(() => {
					mediaRecorder.stop();
				}, 8000);
			});
	}

}

export const handleBrainstorms = (v, a,userEMail)=>{
	const brainstorms = {
		myBrainstormsCompleted:new Map(),
		myBrainstormsActive:new Map(),//new Map()? []
		invitedBrainstorms:new Map(),//new Map()?
		archives:new Map()//new Map()?
	}
	
	const seen = new Map();
	
	a.forEach((archive)=>{
		if(archive.archived){
			seen.set(archive.venture_id, archive );	
		}
		
	});
	
	v.forEach((venture, id) =>{
		if(seen.has(venture.venture_id)){
			brainstorms.archives.set(`brainstorm${id}`, {...venture, id:`brainstorm${id}`});
		}
		else{
			if(venture.host_email === userEMail){
				if(venture.active === true){
				 brainstorms.myBrainstormsActive.set(`brainstorm${id}`, {...venture, id:`brainstorm${id}`});
				}
				else{
				 brainstorms.myBrainstormsCompleted.set(`brainstorm${id}`, {...venture, id:`brainstorm${id}`});
				}
				
			}
			else{
				brainstorms.invitedBrainstorms.set(`brainstorm${id}`, {...venture, id:`brainstorm${id}`});
			}
		}
	})
	
	return brainstorms;
	}