import React from 'react'
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth();

    const location = useLocation();
    if(loading){
        return <span>loading...</span>
    }
    if(!user){
        return <Navigate to="/login" replace state={location?.pathname}></Navigate>;
    }
    return children;
}

export default PrivetRoute