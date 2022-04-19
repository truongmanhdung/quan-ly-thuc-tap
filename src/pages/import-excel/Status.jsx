import React, { useState, useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import "../../common/styles/status.css";
import { Select, Input, Table, Button, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getStudent } from "../../features/StudentSlice/StudentSlice";
import {
  updateReviewerListStudent,
} from "../../features/reviewerStudent/reviewerSlice";
import { Link, useNavigate } from "react-router-dom";

import { filterBranch, filterStatuss } from "../../ultis/selectOption";
import { omit } from "lodash";
import UpFile from "./UpFile";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const { Option } = Select;

const Status = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.auth);
  const {
    listStudent: { list, total },
    loading,
  } = useSelector((state) => state.students);
  const [chooseIdStudent, setChooseIdStudent] = useState([]);
  const [listIdStudent, setListIdStudent] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    campus_id: infoUser.manager.campus_id,
  });
  const [filter, setFiler] = useState({});
  useEffect(() => {
    dispatch(getStudent());
  }, [page, infoUser]);
  const columns = [
    {
      title: "MSSV",
      dataIndex: "mssv",
      width: 100,
      fixed: "left",
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      width: 160,
    },
    {
      title: "Ngành",
      dataIndex: "majors",
      width: 100,
    },
    {
      title: "Phân loại",
      dataIndex: "support",
      width: 90,
      render: (val) => {
        if (val === 1) {
          return "Hỗ trợ";
        } else if (val === 0) {
          return "Tự tìm";
        } else {
          return "";
        }
      },
    },
    {
      title: "CV",
      dataIndex: "CV",
      width: 50,
      render: (val) =>
        val ? (
          <EyeOutlined className="icon-cv" onClick={() => window.open(val)} />
        ) : (
          ""
        ),
    },
    {
      title: "Người review",
      dataIndex: "reviewer",
      width: 230,
    },
    {
      title: "Trạng thái",
      dataIndex: "statusCheck",
      render: (status) => {
        if (status === 0) {
          return (
            <span className="status-fail" style={{ color: "orange" }}>
              Chờ kiểm tra
            </span>
          );
        } else if (status === 1) {
          return (
            <span className="status-up" style={{ color: "grey" }}>
              Sửa lại CV
            </span>
          );
        } else if (status === 2) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Nhận CV
            </span>
          );
        } else if (status === 3) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Trượt
            </span>
          );
        } else if (status === 4) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Đã nộp biên bản <br />
            </span>
          );
        } else if (status === 5) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Sửa biên bản <br />
            </span>
          );
        } else if (status === 6) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Đang thực tập <br />
            </span>
          );
        } else if (status === 7) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Đã nộp báo cáo <br />
            </span>
          );
        } else if (status === 8) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Sửa báo cáo <br />
            </span>
          );
        } else if (status === 9) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Hoàn thành <br />
            </span>
          );
        } else {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Chưa đăng ký
            </span>
          );
        }
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setListIdStudent(selectedRowKeys);
      setChooseIdStudent(selectedRows);
    },
  };
  const handleStandardTableChange = (key, value) => {
    const newValue =
      value.length > 0 || value > 0
        ? {
          ...filter,
          [key]: value,
        }
        : omit(filter, [key]);
    setFiler(newValue);
  };
  const handleSearch = () => {
    const data = {
      ...page,
      ...filter,
    };
    dispatch(getStudent(data));
  };

  const comfirm = () => {
    dispatch(
      updateReviewerListStudent({
        listIdStudent: listIdStudent,
        email: infoUser?.manager?.email,
      })
    );
    alert("Thêm thành công ");
    navigate("/review-cv");
  };

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (list) => {
    const newData = [];

    list.filter((item) => {
      const newObject = {};
      newObject['MSSV'] = item['mssv'];
      newObject['Họ tên'] = item['name'];
      newObject['Email'] = item['email'];
      newObject['Ngành'] = item['majors'];
      newObject['Số điện thoại'] = item['phoneNumber'];
      newObject['Tên công ty'] = item['nameCompany'];
      newObject['Địa chỉ công ty'] = item['addressCompany'];
      newObject['Mã số thuế'] = item['taxCode'];
      newObject['Vị trí thực tập'] = item['position'];
      newObject['Điểm thái độ'] = item['attitudePoint'];
      newObject['Điểm kết quả'] = item['resultScore'];
      newObject['Thời gian thực tập'] = item['internshipTime'];
      newObject['Hình thức'] = item['support'];
      newData.push(newObject);
    });
    newData.filter(item => {
      if (item["Hình thức"] === 1) {
        item["Hình thức"] = 1;
        item["Hình thức"] = "Hỗ trợ";
      } else if (item["Hình thức"] === 0) {
        item["Hình thức"] = 0;
        item["Hình thức"] = "Tự tìm";
      }else{

      }
    })
    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileExtension);
  };

  return (
    <div className="status">
      <div className="flex-header">
        <h4>Sinh viên đăng ký thực tập</h4>
        <div style={{ display: "flex" }}>
          <Button variant="warning" style={{ marginRight: 10, height: 36 }} onClick={(e) => exportToCSV(list)}>
            Export
          </Button>
          <UpFile />
        </div>

      </div>


      <div className="filter">
        <span>Ngành: </span>

        <Select
          style={{ width: 200 }}
          onChange={(val) => handleStandardTableChange("majors", val)}
          placeholder="Lọc theo ngành"
        >
          {filterBranch.map((item, index) => (
            <>
              <Option value={item.value} key={index}>
                {item.title}
              </Option>
            </>
          ))}
        </Select>
        <span
          style={{
            marginLeft: "30px",
          }}
        >
          Trạng thái:
        </span>
        <Select
          className="filter-status"
          style={{ width: 200 }}
          onChange={(val) => handleStandardTableChange("statusCheck", val)}
          placeholder="Lọc theo trạng thái"
        >
          {filterStatuss.map((item, index) => (
            <Option value={index} key={index}>
              {item.title}
            </Option>
          ))}
        </Select>

        <span
          style={{
            marginLeft: "30px",
          }}
        >
          Tìm Kiếm:{" "}
        </span>
        <Input
          style={{ width: 200 }}
          placeholder="Tìm kiếm theo tên"
          onChange={(val) =>
            handleStandardTableChange("name", val.target.value)
          }
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
        {chooseIdStudent.length > 0 && (
          <Button onClick={() => comfirm()}>Xác nhận</Button>
        )}
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        pagination={{
          pageSize: page.limit,
          total: total,
          onChange: (page, pageSize) => {
            setPage({
              page: page,
              limit: pageSize,
              campus_id: infoUser.manager.cumpus,
              ...filter,
            });
          },
        }}
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={list}
        scroll={{ x: "calc(700px + 50%)" }}
      />
    </div>
  );
};

export default Status;