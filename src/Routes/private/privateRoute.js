import React from 'react';
import { Navigate } from 'react-router-dom';

const Privateroute = ({children}) => {
       return localStorage.getItem('token') ? children : <Navigate to='/login' />
}

export default Privateroute;
