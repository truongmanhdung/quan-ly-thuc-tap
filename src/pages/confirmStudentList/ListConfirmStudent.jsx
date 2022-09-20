import React from "react";
import { Button, Col, Input, Row, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";

const ListConfirmStudent = () => {
  const columns = [
    {
      title: "Tên sinh viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành Động",
      dataIndex: "",
      key: "x",
      render: () => (
        <Button
          style={{
            color: "#fff",
            background: "#ee4d2d",
          }}
        >
          Xác Nhận
        </Button>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      name: "John Brown",
      description: "Form Hỗ trợ",
      createdAt: "12/12/2015",
    },
    {
      key: 2,
      name: "Jim Green",
      description: "Form Hỗ trợ",
      createdAt: "12/12/2015",
    },
    {
      key: 3,
      name: "Not Expandable",
      description: "Form Hỗ trợ",
      createdAt: "12/12/2015",
    },
    {
      key: 4,
      name: "Joe Black",
      description: "Form Hỗ trợ",
      createdAt: "12/12/2015",
    },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={8} span={8}>
          <h2
            style={{
              color: "black",
            }}
            className="mb-2"
          >
            Danh sách sinh viên
          </h2>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ whiteSpace: "nowrap", marginRight: "10px" }}>
              Tìm Kiếm:
            </span>
            <Input
              style={{ width: "100%" }}
              placeholder="Tìm kiếm theo mã sinh viên"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ whiteSpace: "nowrap", marginRight: "10px" }}>
              Trạng Thái:
            </span>
            <Select
              placeholder="Lọc theo trạng thái"
              style={{ width: 180 }}
              onChange={handleChange}
            >
              <Option value="1">Chờ xác nhận</Option>
              <Option value="2">Đã xác nhận</Option>
              
            </Select>
          </div>
        </Col>
      </Row>
      <Table
        columns={columns}
        expandable={{
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </>
  );
};

export default ListConfirmStudent;
