import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './loader';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from '../User/Login';

const ProtectedRoute = ({element,adminOnly=false}) => {
    const  {isAuthenticated,loading,user}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    if(loading){
        return <Loader/>;
    }
    if(!isAuthenticated){
     return <Navigate to="/login"/>;
    }
    if(adminOnly && user.role!="admin"){
          return <Navigate to="/"/>
    }
  return element;
}

export default ProtectedRoute
