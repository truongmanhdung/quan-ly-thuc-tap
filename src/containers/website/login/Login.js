import React from "react";
import GoogleLogin from "react-google-login";
import style from "./Login.module.css";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../../features/slice/authSlice";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch()

  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = (googleData) => {
    console.log(googleData)
    dispatch(loginGoogle({token:googleData.tokenId}))
  };
  
  return (
    <div className={style.login_wrapper}>
      <Title>Quản lý thực tập</Title>
      <GoogleLogin
        clientId="116205081385-umqm7s5qlspf4s0tc4jke7tafpvgj2k7.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
      ></GoogleLogin>
    </div>
  );
};

export default Login;
