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
                <Row>
                    <Col span={6}>
                    </Col>
                    <Col span={12}></Col>
                    <Col style={{
                        display: 'flex'
                    }} span={6}>
                        <Rightcontent />
                    </Col>
                </Row>

            </Header>
        </>
    );
}

export default GlobalHeader;
