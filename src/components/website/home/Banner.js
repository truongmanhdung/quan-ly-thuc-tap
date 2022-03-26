import { Link } from 'react-router-dom';
// const Fantasy= "https://vod-progressive.akamaized.net/exp=1640367712~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2804%2F24%2F614024257%2F2858521832.mp4~hmac=1a9994ef1d37f591e9d1c1e63826006fbe53540b42df4bff8e0ca46360bc048c/vimeo-prod-skyfire-std-us/01/2804/24/614024257/2858521832.mp4?filename=Lake+-+89312.mp4";
// import Fantasy from '../../Fantasy.mp4';
import People from '../../../common/image/People.mp4';
const Banner = () => {
    return (
        <div className="banner row">
            <div className="video-header">
                <video loop muted autoPlay controls='' style={{ opacity: 0.6 }}><source src={People} type="video/mp4" /></video>
            </div>
            <div className="col-md-6 banner-text">
                <p style={{ fontSize: 31 }}>WELCOME TO</p>
                <h1 className="banner-title m-3">BeeH</h1>
                <p>The Fastest Growing Crypto Community on Earth</p>
                <div className="div">
                    <Link to="buy" className="buyido btn btn-success">BUY NOW - course</Link>
                </div>
            </div>
            <div className="col-md-6 banner-text">
                <p>Out Now:</p>
                <h3 className="banner-title-sm">BeeHi APP</h3>
                <p>Get it on:</p>
                <div className="app-sm">
                    <img src="https://safemoon.net/_next/image?url=%2Fimg%2Fgoogle_play.png&w=256&q=75" alt="" />
                    <img src="https://safemoon.net/_next/image?url=%2Fimg%2Fapp_store.png&w=256&q=75" alt="" />
                </div>
            </div>
        </div>
    )
}
export default Banner;