import React from 'react';
import { useSelector } from "react-redux";
import {  Navigate, useNavigate } from "react-router-dom";
const Privateadmin = ({children}) => {
    const navigate = useNavigate()
    const { infoUser:{isAdmin} } = useSelector((state) => state.auth);
    return isAdmin ? children : <Navigate to='/404' />
}

export default Privateadmin;


