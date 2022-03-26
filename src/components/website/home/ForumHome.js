import { Col } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../../../common/styles/ForumHome.css";

const ForumHome = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    return (
        <div className="container forum-home">
            <h3 className="title-form-home">Forum topic</h3>
            <Slider {...settings}>
                <Col span={24} className="item-forum-home">
                    <div className="img-forum-home">
                        <img width="100%" src="https://oneminuteenglish.org/wp-content/uploads/2020/04/Learn-1.png?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2" alt="" />
                        <div className="tag-topic">Study Topic</div>
                    </div>
                    <ul className="item-content-forum-home">
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                    </ul>
                    <Link to="/"className="btn btn-light tag-all">see all...</Link>
                </Col>
                <Col span={24} className="item-forum-home">
                    <div className="img-forum-home">
                        <img width="100%" src="https://i.ytimg.com/vi/IUTRRedYWgw/maxresdefault.jpg" alt="" />
                        <div className="tag-topic">English Topic</div>
                    </div>
                    <ul className="item-content-forum-home">
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                    </ul>
                    <Link to="/" className="btn btn-light tag-all">see all...</Link>
                </Col>
                <Col span={24} className="item-forum-home">
                    <div className="img-forum-home">
                        <img width="100%" src="https://photo2.tinhte.vn/data/attachment-files/2021/12/5789937_tinhte-bowers-wilkin-formovie-t1-tricolor-1.jpg" alt="" />
                        <div className="tag-topic">VietNam Topic</div>
                    </div>
                    <ul className="item-content-forum-home">
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                        <li><Link to="/"> They always get me good support all the way until my graduation and I am so happy I trusted them. I feel comfortable and relaxed from the time I work with them</Link></li>
                    </ul>
                    <Link to="/" className="btn btn-light tag-all">see all...</Link>
                </Col>
            </Slider>
        </div>
    )
}

export default ForumHome;