import { LogoutOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Avatar, Drawer } from 'antd';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import './index.css'
import { logout } from '../../features/authSlice/authSlice'

const Rightcontent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { infoUser } = useSelector(state => state.auth)
    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }


    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    console.log(window.innerWidth)
    const menu = (
        <Menu  >
            <Menu.Item key='userInfo' >
                <Button type='text' icon={<SettingOutlined />} > Tài khoản  </Button>
            </Menu.Item>
            <Menu.Item>
                <Button icon={<LogoutOutlined />} type='text' onClick={handleLogout}>Đăng xuất</Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <>

            <div className='view-account' style={{
                marginLeft: 'auto',
                paddingRight: '25px',
                marginTop: "20px"
            }} >

                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                    <span>
                        <Avatar size={44} src={infoUser.picture} />  <span>{infoUser.name}</span>
                    </span>
                </Dropdown>

            </div>

            <div className='mobile'>
                <MenuOutlined style={{ fontSize: "1.8rem", color: "red" }} onClick={showDrawer} />
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>
        </>

    );
}

export default Rightcontent;
