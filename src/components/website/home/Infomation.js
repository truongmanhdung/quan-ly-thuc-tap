import { Row, Col } from 'antd';
import { BsFillAwardFill } from 'react-icons/bs';

const Infomation = () => {
    return (
        <div className="information" id="information">
            <Row className="container beehi-center">
                <Col span={12} className="banner-text beehi-infomation-col" style={{ alignSelf: 'center' }}>
                    <p style={{ fontSize: 55 }}>INFOMATION</p>
                    <div className="info-content mt-3" style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: 30 }}>The SafeMoon Protocol is a community focused, fair launched DeFi Token.</p>
                        <p style={{ fontSize: 15 }}>Three simple functions occur during each trade</p>
                    </div>
                    <ul className="info-list">
                        <li className="info-list-sm">
                            <BsFillAwardFill className="icon-info" />
                            <div className="info-list-sm-m">
                                <h5>Reflection</h5>
                                <span>5% is reflected to all holders for passive income</span>
                            </div>
                        </li>
                        <li className="info-list-sm">
                            <BsFillAwardFill className="icon-info" />
                            <div className="info-list-sm-m">
                                <h5>LP Acquisition</h5>
                                <span>5% is added to a liquidity pool</span>
                            </div>
                        </li>
                        <li className="info-list-sm">
                            <BsFillAwardFill className="icon-info" />
                            <div className="info-list-sm-m">
                                <h5>Burn</h5>
                                <span>A burn wallet receives a portion of the reflections to never be seen again.</span>
                            </div>
                        </li>
                    </ul>
                </Col>
                <Col span={12} className="banner-text hidden-video">
                    {/* <img src="https://safemoon.net/_next/image?url=%2Fimg%2Fspaceman-stars.png&w=640&q=75" alt="" /> */}
                    <video className="video-ea" loop muted autoPlay controls='' style={{ opacity: 0.6 }}><source src="https://pixabay.com/videos/download/video-69200_large.mp4" type="video/mp4" /></video>
                </Col>
            </Row>
        </div>
    )
}

export default Infomation;