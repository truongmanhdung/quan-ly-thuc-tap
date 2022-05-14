import { any } from 'prop-types';
import React from 'react';
import { useSelector } from "react-redux";
import {  Navigate } from "react-router-dom";
const Privateadmin = ({children}) => {
    const { infoUser:{isAdmin} } = useSelector((state) => state.auth);
    return isAdmin ? children : <Navigate to='/404' />
}
Privateadmin.propTypes = {
    children: any
  }
export default Privateadmin;


