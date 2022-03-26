import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LayoutWebsite from "./layouts/layoutWebsite";
import LayoutAdmin from "./layouts/layoutAdmin";
import HomeContainer from "./containers/website/homeContainer";
import ChartContainer from "./containers/website/ChartContainer";
import BuyContainer from "./containers/website/BuyContainer";
import InfoTokenContainer from "./containers/website/InfoTokenContainer";
const Router = (props) => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<HomeContainer />} />
        <Route path="/chart" element={<ChartContainer />} />
        <Route path="/buy" element={<BuyContainer />} />
        <Route path="/info-token" element={<InfoTokenContainer />} />
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
