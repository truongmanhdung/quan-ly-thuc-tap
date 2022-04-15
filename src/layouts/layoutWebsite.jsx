import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  ProfileOutlined,
  UserOutlined,
  UploadOutlined,
  TeamOutlined,
  FolderViewOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { NavLink, Outlet } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader.js';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import './layout.css';
import SubMenu from 'antd/lib/menu/SubMenu';
import { getCookie, removeCookie, STORAGEKEY } from '../ultis/storage.js';
import jwt_decode from 'jwt-decode';
import { setAuthHeader } from '../API/Link.js';

const { Sider } = Layout;
function LayoutWebsite() {
  const accessToken = getCookie(STORAGEKEY.ACCESS_TOKEN)
  const [state, setState] = useState(false);
  const { infoUser: { isAdmin } } = useSelector((state) => state.auth);
  const onCollapse = () => {
    setState(!state);
  };
  
  useEffect(()=>{
    if (accessToken) {
      setAuthHeader(accessToken)
    }
  },[accessToken])

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={state} onCollapse={() => onCollapse()}>
          <div className="logo-school">
            <div className="logo">
              <img
                style={state ? { width: '40%', height: '40%' } : { width: '80%', height: '80%' }}
                src="https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png"
                alt=""
              />
            </div>
          </div>

          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {isAdmin ? (
              <>
                <Menu.Item key="4" icon={<ProfileOutlined className="icon-link" />}>
                  <NavLink to="status">Danh sách đăng ký</NavLink>
                </Menu.Item>
                {/* <Menu.Item key="5" icon={<TeamOutlined className="icon-link" />}>
                  <NavLink to="employee-manager">Nhân viên</NavLink>
                </Menu.Item> */}

                <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="Reviews">
                  <Menu.Item key="9" >
                    <NavLink to="review-cv"> CV</NavLink>
                  </Menu.Item>
                  <Menu.Item key="10" >
                    <NavLink to="review-form">Biên bản</NavLink>
                  </Menu.Item>
                  <Menu.Item key="12" >
                    <NavLink to="review-report">Báo cáo</NavLink>
                  </Menu.Item>
                </SubMenu>


                <Menu.Item key="11" icon={<FolderViewOutlined className="icon-link" />}>
                  <NavLink to="form-register">Thời gian đăng ký</NavLink>
                </Menu.Item>

                <Menu.Item key="7" icon={<UploadOutlined className="icon-link" />}>
                  <NavLink to="up-file">Up File</NavLink>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="1" icon={<UserOutlined className="icon-link" />}>
                  <NavLink to="info-student">Trạng thái đăng ký</NavLink>
                </Menu.Item>

                <Menu.Item key="2">
                  <NavLink to="/proactive-student">Tự đăng ký</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/support-student">Nhà trường hỗ trợ</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                  <NavLink to="report">Biểu mẫu</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/report-form">Báo cáo</NavLink>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <GlobalHeader onCollapse={onCollapse} state={state} />
          <Content style={{ margin: '15px 15px', background: 'white' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, minHeight: 360 }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

LayoutWebsite.propTypes = {};

export default LayoutWebsite;
