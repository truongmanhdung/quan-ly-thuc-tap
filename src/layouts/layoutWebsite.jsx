import React, { Children, useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Row,Col, Button } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  UploadOutlined,
  TeamOutlined,
  LoginOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import './layoutWebsite.css';
import GlobalHeader from '../components/GlobalHeader.js';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function LayoutWebsite() {
  const [state, setState] = useState(false);
  const [userLocatlStorage, setUserLocatlStorage] = useState({});

  useEffect(() => {
    setUserLocatlStorage(JSON.parse(localStorage.getItem('user')));
  }, []);

  const onCollapse = () => {
      setState(!state)
  };
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{ backgroundColor: 'white' }}
          width={250}
          collapsed={state}
        >
            <div style={{height: '96px'}} className="logo">
            <img  src="https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png" />
            </div>
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="">Đăng ký thực tập</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="status">Trạng thái</Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<UploadOutlined />}>
              <Link to="up-file">Up File</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<LoginOutlined />}>
              <a>Đăng xuất</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <GlobalHeader
          onCollapse={onCollapse}
          state={state}
          />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: ' center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  );
}

LayoutWebsite.propTypes = {};

export default LayoutWebsite;
