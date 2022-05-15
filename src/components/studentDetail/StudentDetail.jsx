import { EditOutlined } from "@ant-design/icons";
import { Col, message, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManager } from "../../features/managerSlice/managerSlice";
import { updateReviewerListStudent } from "../../features/reviewerStudent/reviewerSlice";
import "./studentDetail.css";

const { Option } = Select;
const StudentDetail = (props) => {
  const { onShowModal, studentdetail } = props;
  const [isShowSelectStatus, setIsShowSelectStatus] = useState(false);
  const [isEditReviewer, setIsEditReviewer] = useState(false)
  console.log(studentdetail);
  const {listManager} = useSelector((state) => state.manager);
  const dispatch = useDispatch();

  const getDataStudent = async() => {
    
  }
  useEffect(() => {
    dispatch(fetchManager())
  }, [])

  

  const renderStatus = (status) => {
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
          Sửa biên bản
          <br />
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
  };

  const onSetStatus = () => {
    setIsShowSelectStatus(!isShowSelectStatus);
  };

  const onShowEditReviewer = () => {
    setIsEditReviewer(!isEditReviewer)
  }

  const onSetReviewer = (value) => {
    dispatch(
      updateReviewerListStudent({
        listIdStudent: [studentdetail._id],
        email: value
      }),
    );
    setIsEditReviewer(false)
    message.success('Thành công');
  }

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
              <span className="ms-2">
                {studentdetail.name ? studentdetail.name : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Mã sinh viên: </h6>
              <span className="ms-2">
                {studentdetail.mssv ? studentdetail.mssv : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Email: </h6>
              <span className="ms-2">
                {studentdetail.email ? studentdetail.email : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Chuyên ngành: </h6>
              <span className="ms-2">
                {studentdetail.majors ? studentdetail.majors : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Khoá học: </h6>
              <span className="ms-2">
                {studentdetail.course ? studentdetail.course : "Không có"}
              </span>
            </Col>

            <Col span={12} className="d-flex">
              <h6>Số điện thoại: </h6>
              <span className="ms-2">
                {studentdetail?.phoneNumber
                  ? studentdetail?.phoneNumber
                  : "không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Phân loại: </h6>
              {studentdetail.support ? (
                <span className="ms-2">
                  {studentdetail.support === 1
                    ? "Tự tìm"
                    : "Nhờ nhà trường hỗ trợ"}
                </span>
              ) : (
                <span className="ms-2">Chưa nhập form</span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6 className="me-2">Trạng thái: </h6>
              {renderStatus(studentdetail.statusCheck)}
            </Col>
            <Col span={12} className="d-flex">
              <h6>CV: </h6>
              {studentdetail.CV ? (
                <a
                  className="ms-2 text-one-row"
                  onClick={() => window.open(studentdetail.CV)}
                >
                  {studentdetail.CV}
                </a>
              ) : (
                <span className="ms-2">Chưa nộp</span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Biên bản: </h6>
              {studentdetail.form ? (
                <a
                  className="ms-2 text-one-row"
                  onClick={() => window.open(studentdetail.form)}
                >
                  {studentdetail.form}
                </a>
              ) : (
                <span className="ms-2">Chưa nộp</span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Báo cáo: </h6>
              {studentdetail.report ? (
                <a
                  className="ms-2 text-one-row"
                  onClick={() => window.open(studentdetail.report)}
                >
                  {studentdetail.report}
                </a>
              ) : (
                <span className="ms-2">Chưa nộp</span>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <h4>Trạng thái</h4>
          <div className="detal-form-status">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0 me-2">Trạng thái: </h6>
              {isShowSelectStatus ? (
                <Select defaultValue="Chọn người review" style={{ width: "50%" }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              ) : (
                renderStatus(studentdetail.statusCheck)
              )}

              <EditOutlined onClick={onSetStatus} />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0 me-2">Người review: </h6>
              {isEditReviewer ? (
                <Select onChange={onSetReviewer} defaultValue="Chọn người review" style={{ width: "50%" }}>
                  {listManager.length > 0 && listManager.map((item) => (
                    <Option key={item._id} value={item.email}>{item.name} - {item.email}</Option>
                  ))}
                </Select>
              ) : (
                studentdetail.reviewer
              )}

              <EditOutlined onClick={onShowEditReviewer} />
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default StudentDetail;
