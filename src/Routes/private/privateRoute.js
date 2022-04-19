import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import StudentAPI from "../../API/StudentAPI";
import { logout } from "../../features/authSlice/authSlice";

const Privateroute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const checkToken = async () => {
    if (infoUser?.student) {
      StudentAPI.get(infoUser?.student?.mssv)
        .then((res) => {
          if (res.data) {
            console.log("sadsadsa", res);
            setCheck(true);
          }
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            setCheck(false);
          }
        });
    } else {
      StudentAPI.getAll({
        page: 1,
        limit: 20,
        campus_id: infoUser?.manager?.campus_id,
      })
        .then((res) => {
          if (res.message === "Request failed with status code 401") {
            setCheck(false);
            navigate('login')
          }
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            setCheck(false);
            navigate('login')
          }
        });
      // console.log(data.status);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (check && infoUser.token) ? children : <Navigate to="/login" />;
};

export default Privateroute;
