import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Button, Row, Col } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import Rightcontent from './RightContent';
import './index.css'
const GlobalHeader = () => {
    return (
        <>
            <Header className="site-layout-background"  >
                <Row style={{display:'flex',alignItems:'center'}}>
                    <Col span={6}>
                        <div className="logo-school">
                            <div className="logo">
                                <img
                                    style={{ width: "100%", height: "100%" }}
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}></Col>
                    <Col style={{
                        display: 'flex',justifyContent:'center'
                    }} span={6}>
                        <Rightcontent />
                    </Col>
                </Row>

            </Header>
        </>
    );
}

export default GlobalHeader;
