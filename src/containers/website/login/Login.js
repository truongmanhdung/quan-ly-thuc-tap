import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle } from "../../../features/slice/authSlice";
import { Select, Empty } from "antd";
import { useNavigate } from "react-router";

const { Option } = Select;
const dataCumpus = [
  {
    title: "FPT Polytechnic Hà Nội",
    value: 1
  },
  {
    title:   "FPT Polytechnic Đà Nẵng",
    value: 2
  },
  {
    title: "FPT Polytechnic Hồ Chí Minh",
    value: 3
  },
  {
    title: "FPT Polytechnic Tây Nguyên",
    value: 4
  },
  {
    title: "FPT Polytechnic Cần Thơ",
    value: 5
  },
  {
    title: "FPT Polytechnic HiTech",
    value: 6
  },
  {
    title: "FPT PTCD Hà Nội",
    value: 7
  },
  {
    title: "FPT PTCD Hồ Chí Minh",
    value: 8
  },
  {
    title: "FPT PTCD Hồ Chí Minh",
    value: 9
  },
  {
    title: "FPT PTCD Đà Nẵng",
    value: 10
  },
  {
    title: "FPT PTCD Cần Thơ",
    value: 11
  },
  {
    title: "FPT PTCD Tây Nguyên",
    value: 12
  },
  {
    title: "FPT PTCD Hải Phòng",
    value: 13
  },
  {
    title: "FPT PTCD Huế",
    value: 14
  },
  {
    title: "FPT PTCD Đồng Nai",
    value: 15
  },
  {
    title: "FPT PTCD Bắc Giang",
    value: 16
  }
]


const Login = () => {
  const dispatch = useDispatch();
  const [cumpus,setCumpus] = useState("")
  const navigate = useNavigate()

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = (googleData) => {
      const data = {
        token : googleData.accessToken,
        info : {
          ...googleData.profileObj,
          campus_id: cumpus
        }
      }
    dispatch(loginGoogle(data))
    .then(res => res && navigate('/'))
    .catch((err)=> console.log(err))
  }

  const handleChange = (value) => {
    setCumpus(value)
  };

  
  return (
    <div className={styles.login_wrapper}>
      <img
        className={styles.logo}
        src="https://career.fpt.edu.vn/Content/images/logo_unit/Poly.png"
      />
      <div>
        <Select
          className={styles.campus}
          defaultValue="Lựa chọn cơ sở"
          onChange={handleChange}
        >
          {dataCumpus ? dataCumpus.map( (item,index) => (
            <Option key={index} value={item.value}>{item.title}</Option>
          )) : <Empty />}
        </Select>
      </div>
      <div className={styles.button_login}>
              {
                cumpus !== '' && (
                  <GoogleLogin
                  className={styles.button_login}
                  clientId="116205081385-umqm7s5qlspf4s0tc4jke7tafpvgj2k7.apps.googleusercontent.com"
                  buttonText="Login With Google"
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                />
                )
              }
      </div>
    </div>
  );
};

export default Login;
