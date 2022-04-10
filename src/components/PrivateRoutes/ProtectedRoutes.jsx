import { useLoadingUser } from "../../context/UserContext";
import {  Navigate, Outlet} from 'react-router-dom';
import { useUser } from "../../context/UserContext";
export default function ProtectedRoutes(){

    const loading = useLoadingUser();
    const { user } = useUser();
    if(!loading && !user){
        return <Navigate to='/' />
    }
    else{
        return <Outlet />
    }
}