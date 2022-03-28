import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LayoutWebsite from "./layouts/layoutWebsite";
import LayoutAdmin from "./layouts/layoutAdmin";
import Login from "./containers/website/login/Login";
const Router = (props) => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<Login/>} />
       
      </Route>

      <Route path="admin/*" element={<LayoutAdmin />}>
        <Route index element={<Navigate to="dashboard" />} />
        {/* <Route path="cart" element={<CartAdmin />} />
        <Route path="cartDetail/:id" element={<CartDetail />} />
        <Route path="dashboard" element={<div>Admin Dashboard</div>} /> */}
      </Route>
    </Routes>
  );
};
export default Router;
