import { Button, Col, Drawer, Row, Select, Table, message } from "antd";
import { array, bool, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import SemestersAPI from "../../API/SemestersAPI";
import UpFile from "../../components/ExcelDocument/UpFile";
import { getBusiness } from "../../features/businessSlice/businessSlice";
import { getListMajor } from "../../features/majorSlice/majorSlice";
import { getSemesters } from "../../features/semesters/semestersSlice";
import styles from "./bussiness.module.css";
import BusinessAPI from "../../API/Business";
import { useMutation } from "react-query";
import FormBusiness from "./FormBusiness";

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
  const [paramsUpdate, setParamUpdate] = useState({});

  useEffect(() => {
    dispatch(getSemesters());
    dispatch(getListMajor());
  }, [dispatch]);

  const fetchDeleteBusiness = (val) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      BusinessAPI.delete(val._id);
    }
  };

  const mutation = useMutation(["delete"], fetchDeleteBusiness, {
    onSuccess: () => {
      console.log(mutation)
      message.success(mutation?.data?.data?.message)
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
    },
  });

  const handleDelete = (val) => {
    mutation.mutate(val);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    {
      title: "Sửa",
      width: 80,
      render: (val, key) => {
        return (
          <Button
            type="primary"
            onClick={(type) => openVisible(val?._id, (type = true))}
          >
            Sửa
          </Button>
        );
      },
    },
    {
      title: "Xóa",
      width: 80,
      render: (val, key) => {
        return (
          <Button
            style={{
              color: "#fff",
              background: "#ee4d2d",
            }}
            onClick={() => handleDelete(val)}
          >
            Xóa
          </Button>
        );
      },
    },
  ];

  const [visibleImport, setVisibleImport] = useState(false);
  const [visible, setVisible] = useState(false);

  const openVisibleImport = () => {
    setVisibleImport(true);
  };
  const closeVisibleImport = () => {
    setPage({
      ...page,
    });
    setVisibleImport(false);
  };

  const openVisible = (val, type) => {
    setVisible(true);
    setParamUpdate({
      val,
      type,
    });
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
        <Col
          style={{ display: "flex", alignItems: "center" }}
          xs={24}
          sm={24}
          md={24}
          lg={8}
          span={8}
        >
          <p style={{ whiteSpace: "nowrap", paddingRight: 20, margin: 0 }}>
            Học kỳ:
          </p>
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
            defaultValue={
              defaultSemester && defaultSemester?._id
                ? defaultSemester?._id
                : ""
            }
          >
            {!defaultSemester?._id && (
              <Option value={""} disabled>
                Chọn kỳ
              </Option>
            )}
            {listSemesters &&
              listSemesters?.map((item, index) => (
                <Option value={item._id} key={index}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          span={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button onClick={openVisibleImport} type="primary">
            Import Doanh nghiệp
          </Button>
          <Button
            onClick={(val = {}, type) =>
              openVisible((val = ""), (type = false))
            }
            style={{
              color: "#fff",
              background: "#ee4d2d",
            }}
          >
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
          title="Import Danh Sách Doanh Nghiệp"
          placement="left"
          onClose={closeVisibleImport}
          visible={visibleImport}
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
                defaultValue={
                  defaultSemester && defaultSemester?._id
                    ? defaultSemester?._id
                    : ""
                }
                style={{
                  width: "100%",
                }}
              >
                {!defaultSemester?._id && (
                  <Option value={""} disabled>
                    Chọn kỳ
                  </Option>
                )}
                {listSemesters &&
                  listSemesters?.map((item, index) => (
                    <Option value={item._id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>

          <Row style={{ alignItems: "center", marginTop: 20 }}>
            <Col span={6}>
              <p>Ngành:</p>
            </Col>
            <Col span={18}>
              <Select
                className="filter-status"
                onChange={(val) => setMajorImport(val)}
                style={{
                  width: "100%",
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
          <div className={styles.boxTitle}>
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
      <div>
        <Drawer
          title={
            paramsUpdate && paramsUpdate?.type
              ? "Sửa thông tin doanh nghiệp"
              : "Thêm mới doanh nghiệp"
          }
          placement="left"
          onClose={closeVisible}
          visible={visible}
          width="70%"
        >
          <FormBusiness paramsUpdate={paramsUpdate} />
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
