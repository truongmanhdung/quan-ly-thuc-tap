import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table, notification, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../common/styles/upfile.css";
import { useDispatch, useSelector } from "react-redux";
import { insertStudent } from "../../features/StudentSlice/StudentSlice";
import { useNavigate } from "react-router-dom";
const UpFile = () => {
  const [data, setData] = useState();
  const [dataNew, setDataNew] = useState([]);
  const [nameFile, setNameFile] = useState("");
  const dispatch = useDispatch();
  const {
    infoUser: { manager },
  } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.students);
  const navigate = useNavigate();
  const importData = (e) => {
    const file = e.target.files[0];
    setNameFile(file.name);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (event) => {
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const fileData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let headers = fileData[0];
      fileData.splice(0, 1);
      if(headers.length === 0){
        headers = fileData[0];
      }
      const rows = [];
      fileData.forEach((item) => {
        let rowData = {};
        item.forEach((element, index) => {
          rowData[headers[index]] = element;
        });
        rows.push(rowData);
      });
      console.log(rows);
      let datas = [];
      rows
        .filter((item, index) => index !== 0)
        .map((item) => {
          const newObject = {};
          if (manager) {
            if (item["MSSV"] !== undefined) {
              newObject["mssv"] = item["MSSV"];
              newObject["name"] = item["Họ tên"];
              newObject["course"] = item["Khóa nhập học"];
              newObject["status"] = item["Trạng thái FA21"];
              newObject["majors"] = item["Ngành FA21"];
              newObject["email"] = item["Email"];
              newObject["supplement"] = item["bổ sung"];
              newObject["campus_id"] = manager.campus_id;
            }
            Object.keys(newObject).length > 0 && datas.push(newObject);
          }
        });
      setDataNew(datas);
      setData(fileData);
    };
    reader.readAsBinaryString(file);
  };

  const submitSave = () => {
    dispatch(insertStudent(dataNew)).then((res) => {
      notifications(res.payload)
      setDataNew([]);
      setNameFile();
    });
  };
  const notifications = (payload) => {
    if (loading === false && payload !== undefined) {
      message.success("Thành công");
      navigate("/status");
    }
  };
  const submitCole = () => {
    setDataNew([]);
    setNameFile();
  };

  return (
    <div className="header">
      <label htmlFor="up-file">
        <div className="button-upfile">
          {" "}
          <UploadOutlined className="icon" /> Tải file excel
        </div>{" "}
        {nameFile && dataNew.length > 0 && (
          <span className="span-upload-name">{nameFile}</span>
        )}
      </label>
      <input type="file" onChange={(e) => importData(e)} id="up-file" />
      {data && dataNew.length > 0 && (
        <div className="button">
          <Button
            style={{ marginRight: 10 }}
            onClick={() => submitSave()}
            type="primary"
          >
            Lưu
          </Button>
          <Button onClick={() => submitCole()} type="danger">
            Huỷ
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpFile;
