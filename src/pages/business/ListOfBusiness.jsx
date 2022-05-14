import { EyeOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Table } from "antd";
import Column from "antd/lib/table/Column";
import * as FileSaver from "file-saver";
import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "../../common/styles/status.css";
import { updateReviewerListStudent } from "../../features/reviewerStudent/reviewerSlice";
import {
  getSmester,
  getStudent,
} from "../../features/StudentSlice/StudentSlice";
import { filterBranch, filterStatuss } from "../../ultis/selectOption";
import UpFile from "./UpFile";

const { Option } = Select;

const ListOfBusiness = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.auth);
  const {
    listStudent: { list, total },
    loading,
    listSmester,
  } = useSelector((state) => state.students);
  const [chooseIdStudent, setChooseIdStudent] = useState([]);
  const [listIdStudent, setListIdStudent] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    campus_id: infoUser.manager.campus_id,
  });

  const [filter, setFiler] = useState({
    smester_id: "6268c1e72bfe652b8d17eb22",
  });
  useEffect(() => {
    dispatch(
      getStudent({
        ...page,
        ...filter,
      })
    );
    dispatch(getSmester());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, infoUser]);
  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "Vị trí thực tập",
      dataIndex: "internshipPosition",
      width: 50,
      fixed: "left",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      width: 20,
    },
   
    {
      title: "Địa chỉ thực tập",
      dataIndex: "address",
      width: 100,
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
      value.length > 0 || (value < 11 && value !== "")
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
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (list) => {
    const newData = [];

    list.filter((item) => {
      const newObject = {};
      newObject["Tên doanh nghiệp"] = item["mssv"];
      newObject["Vị trí thực tập"] = item["internshipPosition"];
      newObject["Số lượng"] = item["amount"];
      newObject["Địa chỉ doanh nghiệp"] = item["address"];
      return  newData.push(newObject);
    });
    // eslint-disable-next-line array-callback-return
    newData.filter((item) => {
      if (item["Hình thức"] === 1) {
        item["Hình thức"] = 1;
        item["Hình thức"] = "Hỗ trợ";
      } else if (item["Hình thức"] === 0) {
        item["Hình thức"] = 0;
        item["Hình thức"] = "Tự tìm";
      } else {
      }
    });
    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileExtension);
  };

  return (
    <div className="status">
      <div className="flex-header">
        {window.innerWidth < 739 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <h4 style={{ fontSize: ".9rem" }}>Doanh nghiệp đăng ký</h4>
            <Button
              variant="warning"
              style={{ marginRight: 10, height: 36 }}
              onClick={(e) => exportToCSV(list)}
            >
              Export
            </Button>
          </div>
        ) : (
          <>
            <h4>Doanh nghiệp đăng ký</h4>
            <div style={{ display: "flex" }}>
              <Button
                variant="warning"
                style={{ marginRight: 10, height: 36 }}
                onClick={(e) => exportToCSV(list)}
              >
                Export
              </Button>
              <UpFile smester_id={filter.smester_id} />
            </div>
          </>
        )}
      </div>
      <div className="filter" style={{ marginTop: "20px" }}>
        {window.innerWidth < 739 && <UpFile style={{ fontSize: ".9rem" }} />}
        <br />
      </div>
    </div>
  );
};

export default ListOfBusiness;
