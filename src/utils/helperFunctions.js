// Creates  venture thread id
export function createVentureThreadID(hostEmail, ventureTitle){
    let emailParsed = hostEmail.split('@')[0].toLowerCase();
	let title = ventureTitle.split(' ').join('').toLowerCase();
    return `${emailParsed}-${title}`
}

export function participantsSettings(currentUser, participants, chat){
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
    			color = 'blue'
    			settings[currentUser] = {
    				class:className,
    				color:color,
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

		chat.forEach(person => {
			if(settings[person.username]){
				settings[person.username].count++;
			}
		})
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
