import { Link } from "react-router-dom";
// const Fantasy= "https://vod-progressive.akamaized.net/exp=1640367712~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2804%2F24%2F614024257%2F2858521832.mp4~hmac=1a9994ef1d37f591e9d1c1e63826006fbe53540b42df4bff8e0ca46360bc048c/vimeo-prod-skyfire-std-us/01/2804/24/614024257/2858521832.mp4?filename=Lake+-+89312.mp4";
// import Fantasy from '../../Fantasy.mp4';
import People from "../../../common/image/People.mp4";
import { IconName } from "react-icons/bs";
import { Form, Input, Button, Checkbox } from "antd";
import '../../../common/styles/signin.css'
const Signin = () => {
  return (
    <div className="banner row">
      <div className="video-header">
        <video loop muted autoPlay controls="" style={{ opacity: 0.6 }}>
          <source src={People} type="video/mp4" />
        </video>
      </div>

      <div className="container2">
        <form action="">
          <h2>SIGN IN</h2>
          <div className="input-signin ">
            <label htmlFor="" class="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Username
            </label>
            <input type="text" required />
          </div>
          <div className="input-signin mt-4">
            <label htmlFor="" class="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              Password
            </label>
            <input type="password" required />
          </div>
          <div className=" d-flex justify-content-evenly mt-4">
            <div className="me-5 as">
              <input className="me-2" type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <div className="ms-5">
              <a href="">Forgot Password?</a>
            </div>
          </div>
          <div className="button-signin">
            <button className="btn btn-danger">LOGIN</button>
          </div>
          <div className="mt-3">
            <a href="">Don't have an account? Sign Up</a>
          </div>
          <p className=" mt-3 b rounded-circle bg-danger ">OR</p>
        </form>
        <div className="d-flex justify-content-center">
          <div class="google-btn ms-5">
            <div class="google-icon-wrapper">
              <img
                class="google-icon-svg"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p class="btn-text">
              <b>Sign in with Google</b>
            </p>
          </div>
          <div class="google-btn bg-suscess">
            <div class="google-icon-wrapper">
            <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png"/>
            </div>
            <p class="btn-text">
              <b>Sign in  Facebook</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
