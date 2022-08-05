const URL = 'https://venturechat.herokuapp.com';
// const URL='http://localhost:8800'

export const saveMessage = async (msg, time, ventureId) =>{

        const saveMessageUrl = `${URL}/api/v1/ventures/message`;

        const data = await fetch(saveMessageUrl, {
            
            method:'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
              },
             
              body: JSON.stringify({message:msg, lastUpdated:time, ventureId:ventureId})
        });

        const res = await data.json();
        return res;
        
}

export const getMessages = async (id) => {
const url = `${URL}/api/v1/ventures/messages/${id}`;
try {
  const data = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const res = await data.json();

  return res;
  
} catch (error) {

  return false
  
}


}

export const getUserProfile = async (email) => {
  const url = `${URL}/api/v1/ventures/user`;
  const data = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
     
      body: JSON.stringify({email:email})
    });
    
    const res = await data.json();
   console.log(res)
    return res;
  
  }


  export const getVentureData = async (id) => {
    const url = `${URL}/api/v1/ventures/${id}`;
    const data = await fetch(url, {
        method: "GET",
        credentials: "include",
        
      });
      
      const res = await data.json();
      console.log(data)
      return res;
    
    }

    export const sendEmails = async (inviteInfo) => {
      const url = `${URL}/api/v1/ventures/invite`;
      const data = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
         
          body: JSON.stringify(inviteInfo)
        });
       
        return data;
      
      }

    export const exportVentureChat = async (email, id) => {
      const url = `${URL}/api/v1/ventures/export/${id}`;
      const data = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({email:email})
      });

      return data;
    }

    export const sendNotification = async (emails, ventureTitle,username, chatroomLink) => {
      console.log('YOOOOOOOOOOOLOLLLO')
      const url = `${URL}/api/v1/ventures/notification`;
      const data = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({emails:emails, ventureTitle:ventureTitle, username:username, chatroomLink:chatroomLink})
      });

      return data;
    }

    export const getBrainstormsFromAPI = async (userEmail) =>{

      const url = `${URL}/api/v1/ventures/brainstorms`;
      const data = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({email:userEmail})
      });
      const res = await data.json();
      return res;
    }

    export const updateArchivesAPI= async (userEmail, ventureId) =>{

      const url = `${URL}/api/v1/ventures/archives`;
      const data = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({email:userEmail, ventureId:ventureId})
      });
      const res = await data.json();
      return res;
    }


    export const updateLastUpateAPI= async (ventureId, time) =>{

      const url = `${URL}/api/v1/ventures/lastupdated`;
      const data = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({ventureId:ventureId, lastUpdated:time})
      });
      const res = await data.json();
      return res;
    }

    
    export const deleteBrainstormAPI= async (ventureId, userEmail) =>{

      const url = `${URL}/api/v1/ventures/brainstorm`;
      const data = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({ventureId:ventureId, hostEmail:userEmail})
      });
      const res = await data.json();
      return res;
    }

    export const completeBrainstormAPI = async (ventureId, userEmail) =>{
      console.log('i was claled')
      const url = `${URL}/api/v1/ventures/complete`;
      const data = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({ventureId:ventureId, hostEmail:userEmail})
      });
     
      return data;
    }