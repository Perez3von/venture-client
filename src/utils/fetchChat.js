
const url = 'https://venturechat.herokuapp.com'
// const url='http://localhost:8800'

export const createNewVentureThread = async (newVentureObj) => {
    console.log('venture Obj', newVentureObj)
    console.log(url)
    const loginUrl = `${url}/api/v1/ventures/create`;
    
    const data = await fetch(loginUrl, {
        method: "POST",
        credentials: 'include',
    
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(newVentureObj),
      });
      console.log('data', data)
    const response = await data.json();
    return response;
};