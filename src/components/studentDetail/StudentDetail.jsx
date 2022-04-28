import { Col, Modal, Row } from "antd";
import React from "react";
import './studentDetail.css'
const StudentDetail = (props) => {
  const { onShowModal, studentdetail } = props;
  console.log(studentdetail);
  return (
    <Modal
      width="90%"
      title="Chi tiết sinh viên"
      onCancel={onShowModal}
      visible={true}
    >
      <Row>
        <Col span={16} className="border-right">
          <h4>Thông tin sinh viên</h4>
          <Row className="d-flex align-items-center">
            <Col span={12} className="d-flex">
              <h6>Họ tên: </h6>
              <span className="ms-2">{studentdetail.name}</span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Mã sinh viên: </h6>
              <span className="ms-2">{studentdetail.mssv}</span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Email: </h6>
              <span className="ms-2">{studentdetail.email}</span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Chuyên ngành: </h6>
              <span className="ms-2">{studentdetail.majors}</span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Khoá học: </h6>
              <span className="ms-2">{studentdetail.course}</span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Số điện thoại: </h6>
              <span className="ms-2">{studentdetail?.phoneNumber ? studentdetail?.phoneNumber : 'không có'}</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <h4>Trạng thái</h4>
          <div className="detal-form-status">
            
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default StudentDetail;
