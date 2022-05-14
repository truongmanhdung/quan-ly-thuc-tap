import { any } from "prop-types";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import StudentAPI from "../../API/StudentAPI";

const Privateroute = ({ children }) => {
  const [check, setCheck] = useState(true);
  const { infoUser } = useSelector((state) => state.auth);
  const checkToken = async () => {
    if (infoUser?.student) {
      StudentAPI.get(infoUser?.student?.mssv)
        .then((res) => {
          if (res.data) {
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
          }
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            setCheck(false);
          }
        });
    }
  };
  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (check && infoUser.token) ? children : <Navigate to="/login" />;
};

Privateroute.propTypes = {
  children: any
}
export default Privateroute;
