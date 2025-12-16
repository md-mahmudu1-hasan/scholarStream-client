import React from 'react'
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Pages/Loader/Loader';

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth();

    const location = useLocation();
    if(loading){
        return <Loader></Loader>
    }
    if(!user){
        return <Navigate to="/login" replace state={location?.pathname}></Navigate>;
    }
    return children;
}

export default PrivetRoute