import { createContext, useContext, useEffect, useState } from "react";
import { getStorage } from "../utils/localStorage";

const UserContext = createContext();

const UserProvider = ({children}) =>{

const [user, setUser] = useState(null);

const [loading, setLoading] = useState(true);

useEffect(()=>{

    getStorage()
        .then(user => setUser(user))
        .catch(error => console.log(error))
        .finally(() =>setLoading(false));

},[])

return (
    
    <UserContext.Provider value={{user, setUser, loading}} >
        {children}
    </UserContext.Provider>
    
    )
}

const useLoadingUser = () => {
    console.log(useContext(UserContext))
    const { loading } = useContext(UserContext);
    return loading;
}

const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error('useUser hook must be in GuessContect Provider')
    }
    return context
}


export { UserProvider, useUser, useLoadingUser }