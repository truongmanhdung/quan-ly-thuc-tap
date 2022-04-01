import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Avatar } from 'antd';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAuth } from '../../features/slice/authSlice';
import './index.css'

const Rightcontent = () => {
    const dispatch = useDispatch()
   const navigate = useNavigate()
   const logout = () => {
    dispatch(logoutAuth()).then(res => navigate('/login'))
   }
    const menu = (
        <Menu  >
            <Menu.Item key='userInfo' >
            <SettingOutlined /> <span>Tài khoản</span>
            </Menu.Item>
            <Menu.Item>
                <Button type='text' onClick={ logout()}>Đăng xuất</Button>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div style={{
            marginLeft: 'auto',
            paddingRight: '25px'
        }} >
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <span>
                 <Avatar size={44} icon={<UserOutlined />} />  <span> Dương điệp</span>
                </span>
            </Dropdown>

        </div>
    );
}

export default Rightcontent;
