const url= 'https://venturechat.herokuapp.com';

export const getParticipantsInThread = async (ventureID) => {

    let loginUrl = ''
    // const ventureId = ventureID.split(' ');
    const ventureId = ventureID;

    loginUrl = `${url}/api/v1/participants/getAllParticipants/${ventureId}`
   
       
    const data = await fetch(loginUrl, {
        method: "GET",
        credentials: 'include',
    });
      
    const response = await data.json();
    console.log('allInChaaat', response, "HERE", ventureId)
    return response;
};


export const updateParticipiantPicture = async (userEmail, base64EncodedImage) => {
    // console.log('userID', userEmail)
    // console.log('base64', base64EncodedImage)

    const urlEndPoint = `${url}/api/v1/participants/updatephoto/${userEmail}`;
    
    const response = await fetch(urlEndPoint, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: base64EncodedImage }),
    });


    const data = await response.json();
    return data;
};

export const newParticipant = async (ventureId, guestEmail, name) =>{

    const urlEndPoint = `${url}/api/v1/participants/joinchat`;
    
    const response = await fetch(urlEndPoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            ventureId:ventureId,
            guestEmail:guestEmail,
            name:name 
        }),
    });

    const data = await response.json();
    console.log(data);
    return data;
}

