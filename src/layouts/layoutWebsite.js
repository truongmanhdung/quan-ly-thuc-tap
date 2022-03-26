import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Head from "../components/website/home/Head";
import Foot from "../components/website/home/Foot";
import { Layout } from "antd";
const { Content } = Layout;
function LayoutWebsite(props) {
  return (
    <div>
      <Layout>
        <Head />
        <Content>
          <Outlet />
        </Content>
        <Foot />
      </Layout>
    </div>
  );
}

LayoutWebsite.propTypes = {};

export default LayoutWebsite;
