import React, { useState, useEffect, useCallback } from "react";
import "../../common/styles/status.css";
import { Select, Input, Table, Button, message, Row, Col, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getStudent } from "../../features/StudentSlice/StudentSlice";
import {
  listStudentReport,
  updateReviewerListStudent,
  updateStatusListStudent,
} from "../../features/reviewerStudent/reviewerSlice";
import { filterBranch, filterStatuss } from "../../ultis/selectOption";
import { omit } from "lodash";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { statusConfigReport } from "../../ultis/constConfig";
import { EyeOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;

const { Option } = Select;

const ReviewReport = () => {
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.auth);
  const {
    listStudentAssReviewer: { total, list },
    loading,
  } = useSelector((state) => state.reviewer);
  const [chooseIdStudent, setChooseIdStudent] = useState([]);
  const [status, setStatus] = useState({});
  const [listIdStudent, setListIdStudent] = useState([]);
  const [type, setType] = useState(false);
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    campus_id: infoUser.manager.campus_id,
  });
  const [filter, setFiler] = useState({});
  useEffect(() => {
    const data = {
      ...page,
      ...filter,
    };
    dispatch(listStudentReport(data));
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
      title: "Điểm thái độ",
      dataIndex: "attitudePoint",
      width: 180,
    },
    {
      title: "Điểm kết quả",
      dataIndex: "resultScore",
      width: 100,
    },
    {
      title: "Báo cáo",
      dataIndex: "report",
      width: 100,
      render: (val) =>
        val ? (
          <Button
            type="text"
            icon={<EyeOutlined className="icon-cv" />}
            onClick={() => window.open(val)}
          />
        ) : (
          ""
        ),
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
  // xóa tìm kiếm
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setListIdStudent(selectedRowKeys);
      setChooseIdStudent(selectedRows);
    },
  };
  const chooseStudent = useCallback(() => {
    dispatch(
      updateReviewerListStudent({
        listIdStudent: listIdStudent,
        email: infoUser?.manager?.email,
      })
    );
    alert("Thêm thành công ");
  }, [listIdStudent]);

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

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (list) => {
    const newData = [];

    list.filter((item) => {
      const newObject = {};
    newObject['MSSV'] = item['mssv'];
      newObject['Họ tên'] = item['name'];
      newObject['Email'] = item['email'];
      newObject['Số điện thoại'] = item['phoneNumber'];
      newObject['Điểm thái độ'] = item['attitudePoint'];
      newObject['Điểm kết quả'] = item['resultScore'];
      newObject['Báo cáo'] = item['report'];
      newData.push(newObject);
    });

    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileExtension);
  };

  const actionOnchange = (value) => {
    switch (value) {
      case "assgin":
        try {
          dispatch(
            updateReviewerListStudent({
              listIdStudent: listIdStudent,
              email: infoUser?.manager?.email,
            })
          );
          setStatus([]);
          message.success("Thành công");
        } catch (error) {
          message.error("Thất bại");
        }

        break;
      case "edit":
        setType(true);
        break;

      default:
        break;
    }
  };
  const selectStatus = (value) => {
    let id = [];
    if (value !== 5) {
      chooseIdStudent
        .filter((item) => item.report !== null)
        .map((item) => id.push(item._id));
      if (id.length === chooseIdStudent.length) {
        setStatus({
          listIdStudent: listIdStudent,
          email: infoUser?.manager?.email,
          status: value,
        });
        setType(false);
      } else {
        message.error("Chưa nộp báo cáo");
        setChooseIdStudent([]);
        setType(false);
      }
    } else {
      setStatus({
        listIdStudent: listIdStudent,
        email: infoUser?.manager?.email,
        status: value,
      });
    }
  };

  const comfirm = () => {
    try {
      dispatch(updateStatusListStudent(status));
      setChooseIdStudent([]);
      message.success("Thành công");
    } catch (error) {
      message.error("Thất bại");
    }
  };

  return (
    <div className="status">
      {window.innerWidth < 1023 ? (
        <h4 style={{ fontSize: "1rem" }}>Review báo cáo</h4>
      ) : (
        <h4>Review báo cáo</h4>
      )}
      <Button variant="warning" onClick={(e) => exportToCSV(list)}>
        Export
      </Button>

      <div className="filter" style={{ marginTop: "20px" }}>
        <Row>
          <Col
            xs={24}
            sm={4}
            md={12}
            lg={8}
            xl={8}
            style={{ padding: "0 10px" }}
          >
            <div className="search">
              <span style={{ width: "40%" }}>Ngành: </span>
              {type && (
                <Select
                  style={{ width: "100%" }}
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
              )}
            </div>
          </Col>
          <br />
          <br />
          <Col
            xs={24}
            sm={4}
            md={12}
            lg={8}
            xl={8}
            style={{ padding: "0 10px" }}
          >
            <div className="search">
              <span style={{ width: "40%" }}>Trạng thái:</span>
              <Select
                className="filter-status"
                style={{ width: "100%" }}
                onChange={(val) =>
                  handleStandardTableChange("statusCheck", val)
                }
                placeholder="Lọc theo trạng thái"
              >
                {filterStatuss.map((item, index) => (
                  <Option value={index} key={index}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <br />
          <br />
          <Col
            xs={24}
            sm={4}
            md={12}
            lg={8}
            xl={8}
            style={{ padding: "0 10px" }}
          >
            <div className="search">
              <span style={{ width: "40%" }}>Tìm Kiếm: </span>
              <Input
                style={{ width: "100%" }}
                placeholder="Tìm kiếm theo tên"
                onChange={(val) =>
                  handleStandardTableChange("name", val.target.value)
                }
              />
            </div>
          </Col>
          <br />
          <br />
          <Col
            xs={24}
            sm={4}
            md={24}
            lg={24}
            xl={8}
            style={{ padding: "0 10px" }}
          >
            <div>
              <Button
                style={{
                  marginTop: "10px",
                  color: "#fff",
                  background: "#ee4d2d",
                }}
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
              {chooseIdStudent.length > 0 && (
                <div className="comfirm">
                  <span style={{ width: "40%" }}>Lựa chọn </span>
                  <Select
                    className="comfirm-click"
                    style={{ width: "100%" }}
                    onChange={actionOnchange}
                    placeholder="Chọn"
                  >
                    <Option value="assgin" key="1">
                      Kéo việc
                    </Option>
                    <Option value="edit" key="2">
                      Cập nhật trạng thái
                    </Option>
                  </Select>

                  {Object.keys(status).length >= 1 && (
                    <Select
                      className="upload-status"
                      style={
                        window.innerWidth > 1024
                          ? { width: "100%", margin: "10px" }
                          : { width: "100%", margin: "10px 0" }
                      }
                      onChange={(e) => selectStatus(e)}
                      placeholder="Chọn trạng thái"
                    >
                      {statusConfigReport.map((item, index) => (
                        <Option value={item.value} key={index}>
                          {item.title}
                        </Option>
                      ))}
                    </Select>
                  )}

                  {Object.keys(status).length > 0 && (
                    <Button onClick={() => comfirm()}>Xác nhận</Button>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {window.innerWidth > 1024 ? (
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
      ) : (
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
          dataSource={list}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ marginTop: "10px" }}>
                {window.innerWidth < 1023 && window.innerWidth > 739 ? (
                  ""
                ) : (
                  <>
                    <p className="list-detail">Email: {record.email}</p>
                    <br />
                  </>
                )}
                <p className="list-detail">Điện thoại: {record.phoneNumber}</p>
                <br />
                <p className="list-detail">Ngành: {record.majors}</p>
                <br />
                <p className="list-detail">
                  Phân loại:
                  {record.support == 1 && "Hỗ trợ"}
                  {record.support == 0 && "Tự tìm"}
                  {record.support !== 1 && record.support !== 0 && ""}
                </p>
                <br />
                <p className="list-detail">
                  CV:{" "}
                  {record.CV ? (
                    <EyeOutlined
                      style={{ fontSize: ".9rem" }}
                      onClick={() => window.open(record.CV)}
                    />
                  ) : (
                    ""
                  )}
                </p>
                <br />
                <p className="list-detail">Người review: {record.reviewer}</p>
                <br />
              </div>
            ),
          }}
        >
          <Column title="Mssv" dataIndex="mssv" key="_id" />
          <Column title="Họ và Tên" dataIndex="name" key="_id" />
          {window.innerWidth > 739 && window.innerWidth < 1023 && (
            <Column title="Email" dataIndex="email" key="_id" />
          )}
          <Column
            title="Trạng thái"
            dataIndex="statusCheck"
            key="_id"
            render={(status) => {
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
            }}
          />
        </Table>
      )}
    </div>
  );
};

export default ReviewReport;
