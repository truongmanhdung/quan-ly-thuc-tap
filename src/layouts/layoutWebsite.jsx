import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import '../common/styles/layout.css'
import {
  DesktopOutlined,
  PieChartOutlined,
  UploadOutlined,
  TeamOutlined,
  LoginOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import { Link, Outlet } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;
function LayoutWebsite() {
  const [state, setState] = useState(false)
  const [userLocatlStorage, setUserLocatlStorage] = useState({})

  useEffect(() => {
    localStorage.setItem('user',JSON.stringify({id:1,name:"Trần Văn Đoàn",avatar:"https://media.tadicdn.com/media/image/s/tdtp/id/610cee400df9386a46462317.jpeg_640x",role:0}))
    setUserLocatlStorage(JSON.parse(localStorage.getItem('user')))
  }, [])

  const onCollapse = () => {
    state == false ? setState(true) : setState(false)
  };
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={state} onCollapse={() => onCollapse()}>

          <div className="info">
            <div className="avatar">
              <img src={userLocatlStorage.avatar} alt="" />
            </div>
            <div className="name">{userLocatlStorage.role == 0 ?
              <span>Nhân viên : {userLocatlStorage.name}</span> :
              <span>Sinh viên : {userLocatlStorage.name}</span>}
            </div>
          </div>

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to=''>Đăng ký thực tập</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to='status'>Trạng thái</Link>

            </Menu.Item>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<UploadOutlined />}>
              <Link to='up-file'>Up File</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<LoginOutlined />}>
              <a >Đăng xuất</a>
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
