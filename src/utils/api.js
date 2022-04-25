const URL = 'http://localhost:8800'

export const saveMessage = async (msg) =>{

        const saveMessageUrl = `${URL}/api/v1/ventures/message`;

        const data = await fetch(saveMessageUrl, {
            
            method:'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
              },
             
              body: JSON.stringify(msg)
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
        
        const res = await data.json();
       
        return res;
      
      }
