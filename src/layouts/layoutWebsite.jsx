import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import '../common/styles/layout.css'
import {
  DesktopOutlined,
  PieChartOutlined,
  UploadOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function LayoutWebsite(props) {
  const [state, setState] = useState(false)

  const onCollapse = () => {
    state == false ? setState(true) : setState(false)
  };
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={state} onCollapse={() => onCollapse()}>
          <div className="logo" >
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png" alt="" />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to=''>Đăng ký thực tập</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to='status'>Trạng thái</Link>

            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<UploadOutlined />}>
            <Link to='up-file'>Up File</Link>

            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
            <div className="site-layout-background" >
              <Outlet />
            </div>
        </Layout>
      </Layout>
    </div>
  );
}

LayoutWebsite.propTypes = {};

export default LayoutWebsite;
