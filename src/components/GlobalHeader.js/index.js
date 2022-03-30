import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Button, Row, Col } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import Rightcontent from './RightContent';

const GlobalHeader = ({
    onCollapse,
    state
}) => {
    return (
        <>
            <Header className="site-layout-background" style={{ padding: 0, height: 100 }} >
                <Row>
                    <Col span={6}>
                        <Button
                        onClick={onCollapse}
                        style={{
                            marginTop: '20px'
                        }} type="text">{!state ? <DoubleLeftOutlined style={{ fontSize: '20px' }} /> : <DoubleRightOutlined style={{ fontSize: '20px' }} />}</Button>
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
