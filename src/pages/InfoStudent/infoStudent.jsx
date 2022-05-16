import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "antd";
import { connect, useDispatch } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { optionStatus } from "../../ultis/selectOption";
import { getStudentId } from "../../features/StudentSlice/StudentSlice";
import { bool, object } from "prop-types";
import { getBusiness } from "../../features/businessSlice.js/businessSlice";
const columns = [
  {
    title: "Doanh nghiệp",
    dataIndex: "name",
  },
  {
    title: "Vị trí",
    dataIndex: "internshipPosition",
  },
  {
    title: "Số lượng",
    dataIndex: "amount",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Ngành",
    dataIndex: "majors",
  },
];
function InfoStudent({
  studentById,
  infoUser,
  listBusiness: { list, total },
  loading,
}) {
  const [page, setPage] = useState({
    page: 1,
    limit: 5,
    campus_id: infoUser.student.campus_id,
    smester_id: "6268c1e72bfe652b8d17eb22",
    majors: infoUser.student.majors,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentId(infoUser.student.mssv));
    dispatch(getBusiness(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, infoUser]);
  const isRegister = studentById?.support;
  const statusForm = studentById?.statusCheck;
  return (
    <div>
      <Row>
        <Col span={10} className=" border-end p-2">
          <div>
            <h4>Thông tin đăng ký</h4>
          </div>
          <div className="border-top mt-3 pt-2">
            <p>Họ và tên : {studentById.name}</p>
            <p>Ngành : {studentById.majors}</p>
            <p>Khóa học : {studentById.course}</p>
            <p>Email : {studentById.email}</p>
            <p>
              Lựa chọn :{" "}
              {isRegister === 0
                ? "Tự tìm nơi thực tập"
                : "" || isRegister === 1
                ? "Nhận hỗ trợ từ nhà trường"
                : ""}
            </p>
            <p>
              {" "}
              Công ty đã chọn:{" "}
              {studentById.support === 1
                ? studentById.business.name
                : studentById.nameCompany}{" "}
            </p>
            <p>
              Trạng thái SV :{" "}
              {/* eslint-disable-next-line array-callback-return */}
              {optionStatus.map((index) => {
                if (index.value === statusForm) {
                  return index.title;
                }
              })}{" "}
            </p>
          </div>
        </Col>
        <Col span={10} className="ms-5 p-2">
          <h4>Chọn công ty</h4>
          <div>
            <Table
              loading={loading}
              rowKey="_id"
              columns={columns}
              dataSource={list}
              pagination={{
                pageSize: page.limit,
                total: total,
                onChange: (pages, pageSize) => {
                  setPage({
                    ...page,
                    page: pages,
                    limit: pageSize,
                    campus_id: infoUser.student.cumpus,
                  });
                },
              }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className=" mt-2 border-top ms-2">
          <h4 className="mt-2">Ghi chú</h4>
          <TextArea
            disabled={true}
            rows={10}
            value={studentById.note}
            className="text-dark"
          ></TextArea>
        </Col>
      </Row>
    </div>
  );
}
InfoStudent.propTypes = {
  studentById: object,
  infoUser: object,
  listBusiness: object,
  loading: bool,
};

export default connect(
  ({
    students: { studentById },
    auth: { infoUser },
    business: { listBusiness, loading },
  }) => ({
    studentById,
    infoUser,
    listBusiness,
    loading,
  })
)(InfoStudent);
