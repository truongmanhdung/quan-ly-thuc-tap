import { ImUser } from "react-icons/im";
import "../../../common/styles/content.css";
import Slider from "react-slick";
import { Col } from "antd";

const SlidePage = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container courses-home" id="courses">
      <h3 className="title-course">Featured course</h3>
      <Slider {...settings}>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/07M-gotZCuA/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>YouTube How to Make a Study Schedule in English!</h5>
            <p>
              <ImUser /> <span>68.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GNUrxi1h9Jc/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GNUrxi1h9Jc/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/AlhkhvPXLgg/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>Speak With Me: English Speaking Practice</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GNUrxi1h9Jc/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GEogN8Kd6-s/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>Speak With Me: English Speaking Practice</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/bLlPYnz_Rt4/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
      </Slider>

      <h3 className="title-course">latest course</h3>
      <Slider {...settings}>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/07M-gotZCuA/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>YouTube How to Make a Study Schedule in English!</h5>
            <p>
              <ImUser /> <span>68.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GNUrxi1h9Jc/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GNUrxi1h9Jc/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/AlhkhvPXLgg/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>Speak With Me: English Speaking Practice</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GNUrxi1h9Jc/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/GEogN8Kd6-s/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>Speak With Me: English Speaking Practice</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
        <Col span={24} className="content-item">
          <img
            src="https://i.ytimg.com/vi/bLlPYnz_Rt4/maxresdefault.jpg"
            alt=""
          />
          <div className="text-content">
            <h5>How to Make a 2021 Study Plan to Improve your English</h5>
            <p>
              <ImUser /> <span>58.000</span>
            </p>
          </div>
        </Col>
      </Slider>
    </div>
  );
};

export default SlidePage;
