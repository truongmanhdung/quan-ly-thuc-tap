import { Button, Col, Drawer, Row, Select, Table } from "antd";
import { array, bool, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import SemestersAPI from "../../API/SemestersAPI";
import UpFile from "../../components/ExcelDocument/UpFile";
import { getBusiness } from "../../features/businessSlice/businessSlice";
import { getListMajor } from "../../features/majorSlice/majorSlice";
import { getSemesters } from "../../features/semesters/semestersSlice";
import styles from "./bussiness.module.css";
const { Option } = Select;
const { Column } = Table;
const ListOfBusiness = ({
  infoUser,
  listSemesters,
  defaultSemester,
  listMajors,
  listBusiness,
  loading,
  isMobile,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    campus_id: infoUser.manager.campus_id,
    smester_id:
      defaultSemester && defaultSemester._id ? defaultSemester._id : "",
  });
  const [majorImport, setMajorImport] = React.useState("");
  useEffect(() => {
    dispatch(getSemesters());
    dispatch(getListMajor());
  }, [dispatch]);

  useEffect(() => {
    if (page?.smester_id && page?.smester_id.length > 0) {
      dispatch(
        getBusiness({
          ...page,
        })
      );
    } else {
      SemestersAPI.getDefaultSemester()
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              getBusiness({
                ...page,
                smester_id: res.data._id,
              })
            );
          }
        })
        .catch(() => {});
    }
  }, [page]);
  const columns = [
    {
      title: "Mã",
      dataIndex: "code_request",
      width: 50,
      fixed: "left",
    },
    {
      title: "Tên doanh nghiệp",
      dataIndex: "name",
      width: 150,
      fixed: "left",
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
      render: (val) => val?.name,
    },
    {
      title: "Yêu cầu",
      dataIndex: "request",
      width: 400,
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      width: 400,
    },
  ];

  const [visible, setVisible] = useState(false);
  const openVisible = () => {
    setVisible(true);
  };
  const closeVisible = () => {
    setPage({
      ...page,
    });
    setVisible(false);
  };
  return (
    <div className={styles.status}>
      <Row
        style={
          isMobile
            ? {}
            : { alignItems: "center", justifyContent: "space-between" }
        }
      >
        <Col xs={24} sm={24} md={24} lg={8} span={8}>
          <h2
            style={{
              color: "black",
            }}
            className="mb-2"
          >
            Doanh nghiệp đăng ký
          </h2>
        </Col>
        <Col xs={8} sm={8} md={8} lg={2} span={2} className="mb-2">
          <p className="m-0">Học kỳ:</p>
        </Col>
        <Col xs={16} sm={16} md={16} lg={6} span={6} className="mb-2">
          <Select
            className="filter-status"
            placeholder="Chọn kỳ"
            onChange={(val) =>
              setPage({
                ...page,
                smester_id: val,
              })
            }
            style={{ width: "100%" }}
            defaultValue={defaultSemester ? defaultSemester._id : ""}
          >
            {listSemesters &&
              listSemesters?.map((item, index) => (
                <Option value={item._id} key={index}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Col>
        <Col className="mb-2" xs={8} sm={8} md={8} lg={4} span={4}>
          <Button onClick={openVisible} type="primary">
            Thêm Doanh nghiệp
          </Button>
        </Col>
      </Row>
      {!isMobile ? (
        <Table
          pagination={{
            pageSize: page.limit,
            total: listBusiness?.total,
            onChange: (pages, pageSize) => {
              setPage({
                ...page,
                page: pages,
                limit: pageSize,
              });
            },
          }}
          scroll={{ x: "calc(900px + 50%)" }}
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={listBusiness?.list}
        />
      ) : (
        <Table
          pagination={{
            pageSize: page.limit,
            total: listBusiness?.total,
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
          dataSource={listBusiness?.list}
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

      <div>
        <Drawer
          title="Thêm Sinh"
          placement="left"
          onClose={closeVisible}
          visible={visible}
        >
          <Row>
            <Col span={6}>
              <p>Kỳ:</p>
            </Col>
            <Col span={18}>
              <Select
                className="filter-status"
                placeholder="Chọn kỳ"
                onChange={(val) =>
                  setPage({
                    ...page,
                    smester_id: val,
                  })
                }
                defaultValue={defaultSemester ? defaultSemester._id : ""}
                style={{
                  width: "100%",
                }}
              >
                {listSemesters &&
                  listSemesters?.map((item, index) => (
                    <Option value={item._id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              {" "}
              <p>Ngành:</p>{" "}
            </Col>
            <Col span={18}>
              <Select
                className="filter-status"
                onChange={(val) => setMajorImport(val)}
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
                placeholder="Chọn ngành"
              >
                {listMajors &&
                  listMajors?.map((item, index) => (
                    <Option value={item._id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>
          <div
            style={{
              width: "50%",
              margin: "auto",
              marginTop: 20,
            }}
          >
            <UpFile
              keys="business"
              parentMethods={{
                ...page,
                majorImport,
                closeVisible,
              }}
            />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

ListOfBusiness.propTypes = {
  infoUser: object,
  listSmester: array,
  loading: bool,
  listMajors: array,
};

export default connect(
  ({ auth: { infoUser }, semester, major, business, global }) => ({
    infoUser,
    listSemesters: semester.listSemesters,
    defaultSemester: semester.defaultSemester,
    listMajors: major.listMajor,
    listBusiness: business.listBusiness,
    loading: business.loading,
    isMobile: global.isMobile,
  })
)(ListOfBusiness);
