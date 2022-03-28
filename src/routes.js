import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWebsite from "./layouts/layoutWebsite";
import LayoutAdmin from "./layouts/layoutAdmin";
import Status from "./components/website/import-excel/Status";
import UpFile from "./components/website/import-excel/UpFile";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route path="/status" element={<Status />} />
        <Route path="/up-file" element={<UpFile />} />
        {/* <Route path="/status" element={<Status />} /> */}
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
