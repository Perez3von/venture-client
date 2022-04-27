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