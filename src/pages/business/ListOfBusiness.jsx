import { Col, Row, Select, Table } from "antd";
import { array, bool, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import UpFile from "../../components/ExcelDocument/UpFile";
import { getBusiness } from "../../features/businessSlice/businessSlice";
import { getSmester } from "../../features/StudentSlice/StudentSlice";
const { Option } = Select;
const { Column } = Table;
const ListOfBusiness = ({ infoUser, listSemesters, defaultSemester }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    campus_id: infoUser.manager.campus_id,
    smester_id: defaultSemester._id
  });
  useEffect(() => {
    dispatch(getSmester());
    dispatch(getBusiness(page))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, infoUser]);
  const { listBusiness, loading } = useSelector((state) => state.business);
  console.log("data---",listBusiness);
  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "name",
    },
    {
      title: "Vị trí thực tập",
      dataIndex: "internshipPosition",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
    },

    {
      title: "Địa chỉ thực tập",
      dataIndex: "address",
    },
    {
      title: "Ngành",
      dataIndex: "majors",
    },
    {
      title: "Chi tiết",
      dataIndex: ""
    },
  ];

  // const handleStandardTableChange = (key, value) => {
  //   const newValue =
  //     value.length > 0 || (value < 11 && value !== '')
  //       ? {
  //           ...filter,
  //           [key]: value,
  //         }
  //       : omit(filter, [key]);
  //   setFiler(newValue);
  // };
  return (
    <div className="status">
      <Row>
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
          </div>
        ) : (
          <>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <h4>Doanh nghiệp đăng ký</h4>
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
              {" "}
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <div
                style={{ display: "grid", gridTemplateColumns: "auto auto" }}
              >
                <div>
                  <Select
                    className="filter-status"
                    placeholder={defaultSemester.name}
                    onChange={(val) =>
                      setPage({
                        ...page,
                        smester_id: val,
                      })
                    }
                    defaultValue={defaultSemester._id}
                  >
                    {listSemesters.map((item, index) => (
                      <Option value={item._id} key={index}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <UpFile keys="business" smester_id={page?.smester_id} />
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
      <div className="filter" style={{ marginTop: "20px" }}>
        {window.innerWidth < 739 && <UpFile style={{ fontSize: ".9rem" }} />}
        <br />
      </div>
      {window.innerWidth > 1024 ? (
        <Table
          pagination={{
            pageSize: page.limit,
            total: listBusiness.total,
            onChange: (pages, pageSize) => {
              setPage({
                ...page,
                page: pages,
                limit: pageSize,
              });
            },
          }}
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={listBusiness.list}
        />
      ) : (
        <Table
          pagination={{
            pageSize: page.limit,
            total: listBusiness.total,
            onChange: (pages, pageSize) => {
              setPage({
                ...page,
                page: pages,
                limit: pageSize,
              });
            },
          }}
          rowKey="_id"
          loading={loading}
          dataSource={listBusiness.list}
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
              </div>
            ),
          }}
        >
          <Column title="Mssv" dataIndex="mssv" key="_id" />
          <Column title="Họ và Tên" dataIndex="name" key="_id" />
          {window.innerWidth > 739 && window.innerWidth < 1023 && (
            <Column title="Email" dataIndex="email" key="_id" />
          )}
        </Table>
      )}
    </div>
  );
};

ListOfBusiness.propTypes = {
  infoUser: object,
  listSmester: array,
  loading: bool,
};

export default connect(
  ({ auth: { infoUser }, semester }) => ({
    infoUser,
    listSemesters: semester.listSemesters,
    defaultSemester: semester.defaultSemester,
  })
)(ListOfBusiness);
