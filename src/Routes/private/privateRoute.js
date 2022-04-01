import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Privateroute = ({children}) => {

    const {infoUser} = useSelector(state=> state.auth)
       return Object.keys(infoUser) !== 0 ? children : <Navigate to='/login' />
}

export default Privateroute;
