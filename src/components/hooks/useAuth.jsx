import { useContext } from "react";
import { useUser } from "../../context/UserContext";



export default function useAuth() {
    const context = useContext(useUser)

    if (context === undefined) {
        throw new Error('useAuth must be used within a provideAuth context');
      }
    
      return context;
}
