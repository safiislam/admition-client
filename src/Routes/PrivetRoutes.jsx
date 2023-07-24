import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {Navigate, useLocation} from 'react-router-dom'

const PrivetRoutes = ({children}) => {
    const location = useLocation()
    const {user,loader} = useContext(AuthContext)
    if(loader){
        return <p>loading....</p>
    }
    if(user){
        return children
    }
    return <Navigate to='/login' state={{from: location}} />
};

export default PrivetRoutes;