import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogle } from '../../features/authSlice/authSlice';
import { Select, Empty, message } from 'antd';
import { useNavigate } from 'react-router';
import { getListCumpus } from '../../features/cumpusSlice/cumpusSlice';
import { defaultTime } from '../../features/semesters/semestersSlice';
import { gapi } from 'gapi-script';
const { Option } = Select;

const Login = () => {
  const dispatch = useDispatch();
  const [cumpus, setCumpus] = useState('');
  const navigate = useNavigate();
  const { listCumpus } = useSelector((state) => state.cumpus);
  const handleFailure = (result) => {
    console.log("result", result)
    message.error('Có lỗi xảy ra');
  };

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: '924910567674-nu6j33eh8241bj0enhcqcrstc1vputag.apps.googleusercontent.com',
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  const handleLogin = (googleData) => {
    dispatch(
      defaultTime({
        filter: { campus_id: cumpus },
        callback: (data) => {
          if (data.status === 'ok') {
            const dataForm = {
              token: googleData.tokenId,
              cumpusId: cumpus,
              smester_id: data?.result?._id,
            };
            dispatch(loginGoogle({ val: dataForm, callback: cbMessage }));
          }
        },
      }),
    );
  };
  const cbMessage = (payload) => {
    const { isAdmin, manager } = payload;
    if (payload?.success) {
      message.success('Đăng nhập thành công');
      return isAdmin
        ? manager.role === 2
          ? navigate('/employee-manager')
          : navigate('/status')
        : navigate('/info-student');
    } else {
      message.success('Đăng nhập thất bại');
    }
  };

  const handleChange = (value) => {
    setCumpus(value);
  };

  useEffect(() => {
    dispatch(getListCumpus());
  }, [dispatch]);

  return (
    <div className={styles.login_wrapper}>
      <img
        alt="diep"
        className={styles.logo}
        src="https://career.fpt.edu.vn/Content/images/logo_unit/Poly.png"
      />

      <div>
        <Select className={styles.campus} defaultValue="Lựa chọn cơ sở" onChange={handleChange}>
          {listCumpus ? (
            listCumpus.map((item, index) => (
              <Option key={index} value={item._id}>
                {item.name}
              </Option>
            ))
          ) : (
            <Empty />
          )}
        </Select>
      </div>
      <div className={styles.button_login}>
        <GoogleLogin
          disabled={cumpus === '' ? true : false}
          className={styles.button_login}

          clientId="650354261161-f7lhh1o5130u6cvfdjcafh399mt4mo5u.apps.googleusercontent.com"

          buttonText="Login With Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          isSignedIn={true}
        />
      </div>
    </div>
  );
};

export default Login;
