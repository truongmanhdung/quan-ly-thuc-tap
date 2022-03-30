import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;
function LayoutWebsite(props) {
  return (
    <div>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

LayoutWebsite.propTypes = {};

export default LayoutWebsite;
