import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table,notification, message } from 'antd';
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
  const { infoUser:{manager} } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.students);
  const navigate = useNavigate();
  const importData = (e) => {
    const file = e.target.files[0];
    setNameFile(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const wordBook = XLSX.read(bstr, { type: "binary" });
      const wordSheetName = wordBook.SheetNames[0];
      const wordSheet = wordBook.Sheets[wordSheetName];
      const fileData = XLSX.utils.sheet_to_json(wordSheet, { header: 1 });
      fileData.splice(0, 1);
      const headers = fileData[0];

      const rows = [];
      fileData.forEach((item) => {
        let rowData = {};
        item.forEach((element, index) => {
          rowData[headers[index]] = element;
        });
        rows.push(rowData);
      });
      let datas=[]
      rows.filter((item, index) => index !== 0).map((item) => {
        const newObject = {};
        if (manager) {
          if (item["MSSV"]!== undefined) {
            newObject["mssv"] = item["MSSV"];
            newObject["name"] = item["Họ tên"];
            newObject["course"] = item["Khóa nhập học"];
            newObject["status"] = item["Trạng thái FA21"];
            newObject["majors"] = item["Ngành FA21"];
            newObject["email"] = item["Email"];
            newObject["supplement"] = item["bổ sung"];
            newObject["campus_id"] = manager.campus_id;
          }
          Object.keys(newObject).length >0 && datas.push(newObject);
        }
      });
      setDataNew(datas);
      setData(fileData);
    };
    reader.readAsBinaryString(file);
  };

  const submitSave = () => {
    dispatch(insertStudent(dataNew)).then(res => notifications(res.payload))
    
  };
  const notifications = (payload) => {
    if ( loading === false && payload !== undefined) {
      message.success("Thành công");
      navigate("/status");
    }
  };
  const submitCole = () => {
    setDataNew([]);
    setNameFile();
  };


  const columns = [

    {
      title: 'MSSV',
      dataIndex: 'mssv',
    },  {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Khóa nhập học',
      dataIndex: 'course',
    },
    {
      title: 'Trạng thái FA21',
      dataIndex: 'status',
    },
    {
      title: 'Ngành FA21',
      dataIndex: 'majors',
    },
    {
      title: 'Bổ sung',
      dataIndex: 'supplement',
    },
  ];

  return (
    <div className="up-file">
      <h3>Tải danh sách mới</h3>
      <div className="header">
        <label htmlFor="up-file">
          <div className="button-upfile">
            {" "}
            <UploadOutlined className="icon" /> Tải file excel
          </div>{" "}
          {nameFile && <span>{nameFile}</span>}
        </label>
        <input type="file" onChange={(e) => importData(e)} id="up-file" />
        {data && (
          <div className="button_save">
            <button onClick={() => submitSave()}>Lưu</button>
            <button onClick={() => submitCole()}>Hủy</button>
          </div>
        )}
      </div>
      {dataNew.length>=1 && <Table loading={loading} rowKey='mssv' dataSource={dataNew} columns={columns} />}
      
    </div>
  );
};

export default UpFile;
