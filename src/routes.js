import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWebsite from "./layouts/layoutWebsite";
import LayoutAdmin from "./layouts/layoutAdmin";
import Login from "./containers/website/login/Login";
import Home from "./containers/website/home/Home";
import Status from "./components/website/import-excel/Status";
import UpFile from "./components/website/import-excel/UpFile";
import SupportStudent from "./containers/website/supportStudent/SupportStudent";
import ProactiveStudent from "./containers/website/proactiveStudent/ProactiveStudent";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/support-student" element={<SupportStudent/>} />
        <Route path="/proactive-student" element={<ProactiveStudent/>} />
        <Route path="/status" element={<Status />} />
        <Route path="/up-file" element={<UpFile />} />
      </Route>

      <Route path="admin/*" element={<LayoutAdmin />}>
        <Route index element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
};
export default Router;
