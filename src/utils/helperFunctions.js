// Creates  venture thread id
export function createVentureThreadID(hostEmail, ventureTitle){
    let emailParsed = hostEmail.split('@')[0].toLowerCase();
	let title = ventureTitle.split(' ').join('').toLowerCase();
    return `${emailParsed}-${title}`
}

export function participantsSettings(currentUser, participants){
    const colors = ['red', 'green', 'yellow' ];
	const msgColors = ['#ffdbdb','#ddfbea', '#f8ffdb']
    let settings = {};
    let c = 0;

    	for(let i =0; i < participants.length; i++){
    
    		let className = '';
    		let color = '';
    		if(currentUser === participants[i].fname.charAt(0).toUpperCase() + participants[i].fname.slice(1) ){
    			className = 'currentUser';
    			color = '#0080ff'
    			settings[participants[i].fname.charAt(0).toUpperCase() + participants[i].fname.slice(1)] = {
    				class:className,
    				color:color,
					msgColor:'#ddecfb'
    			}
    
    		}
    		else{
    
    			className = 'otherUser';
    			color = colors[c];
    
    			settings[participants[i].fname.charAt(0).toUpperCase() + participants[i].fname.slice(1)] = {
    				class:className,
    				color:color,
					msgColor:msgColors[c]
    			}
    
    			c++;
    
    		}
    
    	}
		return settings;

}