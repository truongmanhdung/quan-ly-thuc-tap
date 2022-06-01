import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Modal, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StudentAPI from "../../API/StudentAPI";

import {
  statusConfigCV,
  statusConfigForm,
  statusConfigReport,
} from "../../ultis/constConfig";
import "./studentDetail.css";
const optionCheck = [1, 5, 8, 3];
const { Option } = Select;
const { TextArea } = Input;
const StudentDetail = (props) => {
  const { 
    onShowModal, 
    studentId, 
    closeModal, 
    listManager,
    listBusiness,
    infoUser
  } = props;
  const [isShowSelectStatus, setIsShowSelectStatus] = useState(false);
  const [isEditReviewer, setIsEditReviewer] = useState(false);
  const [isEditBusiness, setIsEditBusiness] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(0);
  const [isShowNote, setIsShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [isSetNote, setIsSetNote] = useState(false);
  const [noteDetail, setNoteDetail] = useState("");
  const [listOption, setListOption] = useState([]);
  const dispatch = useDispatch();

  const getDataStudent = useCallback(async () => {
    setNoteDetail(studentId.note);
  }, [studentId]);

  useEffect(() => {
    getDataStudent();

  }, [dispatch, getDataStudent, studentId]);

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

  const handelChangeText = (e) => {
    if (e.target.value !== "") {
      setNote(e.target.value);
      setSubmitStatus(true);
    } else {
      setSubmitStatus(false);
    }
  };

  const onSelectStatus = (value) => {
    if (value !== +studentId.statusCheck) {
      if (optionCheck.includes(value)) {
        setIsShowNote(true);
        setStatusUpdate(value);
      } else {
        setSubmitStatus(true);
        setStatusUpdate(value);
      }
    } else {
      setSubmitStatus(false);
      setIsShowNote(false);
    }
  };
  const onSetStatus = () => {
    setIsShowSelectStatus(!isShowSelectStatus);
  };

  const onShowEditReviewer = () => {
    setIsEditReviewer(!isEditReviewer);
  };

  const onShowEditBusiness = () => {
    setIsEditBusiness(!isEditBusiness);
  };


  const onSetReviewer = async (value) => {
    const { data } = await StudentAPI.updateReviewerSudent({
      listIdStudent: [studentId._id],
      email: value,
    });
    if (data) {
      getDataStudent();
      setIsEditReviewer(false);
      message.success("Thành công");
    }
  };

  const onChangeTextArea = (e) => {
    if (e.target.value !== "") {
      setIsSetNote(true);
      setNoteDetail(e.target.value);
    }
  };

  const onUpdateStatus = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đổi trạng thái không?")) {
      const { data } = await StudentAPI.updateStatusSudent({
        listIdStudent: [studentId],
        listEmailStudent: [{ email: studentId.email }],
        email: infoUser?.manager?.email,
        status: statusUpdate,
        textNote: note,
      });
      if (data.listStudentChangeStatus.length > 0) {
        getDataStudent();
        setStatusUpdate(false);
        setSubmitStatus(false);
        setIsShowSelectStatus(false);
        setIsShowNote(false);
        message.success("Thành công");
      }
    }
  };

  const onUpdateNote = async () => {
    const { data } = await StudentAPI.updateStatusSudent({
      listIdStudent: [studentId],
      listEmailStudent: [{ email: studentId.email }],
      email: infoUser?.manager?.email,
      status: studentId.statusCheck,
      textNote: noteDetail,
    });
    if (data.listStudentChangeStatus.length > 0) {
      setIsSetNote(false);
      getDataStudent();
      message.success("Cập nhật ghi chú thành công");
    }
  };


  const onSelectBusiness = async (value) => {
    const { data } = await StudentAPI.updateBusinessStudent({
      listIdStudent: [studentId._id],
      business: value,
    });
    if (data) {
      getDataStudent();
      setIsEditBusiness(false);
      message.success("Thành công");
    }
  }

  useEffect(() => {
    if (
      studentId.CV &&
      !studentId.form &&
      !studentId.report &&
      studentId.statusCheck !== 3
    ) {
      setListOption(statusConfigCV);
    } else if (
      studentId.CV &&
      studentId.form &&
      !studentId.report &&
      studentId.statusCheck !== 3
    ) {
      setListOption(statusConfigForm);
    } else if (studentId.CV && studentId.form && studentId.report) {
      setListOption(statusConfigReport);
    } else {
      setListOption([]);
    }
  }, [
    studentId.CV,
    studentId.form,
    studentId.report,
    studentId.statusCheck,
  ]);

  return (
    <Modal
      width="90%"
      title="Chi tiết sinh viên"
      onCancel={closeModal}
      visible={onShowModal}
    >
      <h4>Thông tin sinh viên</h4>
      <Row>
        <Col span={16} className="border-right" style={{ paddingRight: 20 }}>
          <Row className="d-flex align-items-center">
            <Col span={12} className="d-flex">
              <h6>Họ tên: </h6>
              <span className="ms-2">
                {studentId.name ? studentId.name : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Tên công ty: </h6>
              {studentId.support === 1 ? (
                <span className="ms-2">
                  {studentId.business?.name
                    ? studentId.business?.name
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentId.nameCompany
                    ? studentId.nameCompany
                    : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Mã sinh viên: </h6>
              <span className="ms-2">
                {studentId.mssv ? studentId.mssv : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Địa chỉ công ty: </h6>
              {studentId.support === 1 ? (
                <span className="ms-2">
                  {studentId.business?.address
                    ? studentId.business?.address
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentId.addressCompany
                    ? studentId.addressCompany
                    : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Email: </h6>
              <span className="ms-2">
                {studentId.email ? studentId.email : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Mã số thuế: </h6>
              {studentId.support === 1 ? (
                <span className="ms-2">
                  {studentId.business?.taxCode
                    ? studentId.business?.taxCode
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentId.taxCode ? studentId.taxCode : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Chuyên ngành: </h6>
              <span className="ms-2">
                {studentId.majors ? studentId.majors : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Vị trí thực tập: </h6>
              {studentId.support === 1 ? (
                <span className="ms-2">
                  {studentId.business?.internshipPosition
                    ? studentId.business?.internshipPosition
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentId.position ? studentId.position : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Khoá học: </h6>
              <span className="ms-2">
                {studentId.course ? studentId.course : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>SĐT công ty: </h6>
              <span className="ms-2">
                {studentId.phoneNumberCompany
                  ? studentId.phoneNumberCompany
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Kỳ thực tập: </h6>
              <span className="ms-2">
                {studentId?.smester_id?.name
                  ? studentId.smester_id?.name
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Email người xác nhận: </h6>
              <span className="ms-2">
                {studentId.emailEnterprise
                  ? studentId.emailEnterprise
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Số điện thoại: </h6>
              <span className="ms-2">
                {studentId?.phoneNumber
                  ? studentId?.phoneNumber
                  : "không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Ngày bắt đầu thực tập: </h6>
              <span className="ms-2">
                {studentId.internshipTime
                  ? studentId.internshipTime
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Địa chỉ: </h6>
              <span className="ms-2">
                {studentId?.address ? studentId?.address : "không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Ngày kết thúc thực tập: </h6>
              <span className="ms-2">
                {studentId.endInternShipTime
                  ? studentId.endInternShipTime
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Phân loại: </h6>
              {studentId.support ? (
                <span className="ms-2">
                  {studentId.support === 1
                    ? "Nhờ nhà trường hỗ trợ"
                    : "Tự tìm"}
                </span>
              ) : (
                <span className="ms-2">Chưa nhập form</span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Điểm thái độ: </h6>
              <span className="ms-2">
                {studentId.attitudePoint
                  ? studentId.attitudePoint
                  : "Không có"}
              </span>
            </Col>

            <Col span={12} className="d-flex">
              <h6 className="me-2">Trạng thái: </h6>
              {renderStatus(studentId.statusCheck)}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Điểm kết thúc: </h6>
              <span className="ms-2">
                {studentId.resultScore
                  ? studentId.resultScore
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>CV: </h6>
              {studentId.CV ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  className="ms-2 text-one-row"
                  onClick={() => window.open(studentId.CV)}
                >
                  {studentId.CV}
                </a>
              ) : (
                <span className="ms-2">Chưa nộp</span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Biên bản: </h6>
              {studentId.form ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  className="ms-2 text-one-row"
                  onClick={() => window.open(studentId.form)}
                >
                  {studentId.form}
                </a>
              ) : (
                <span className="ms-2">Chưa nộp</span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Báo cáo: </h6>
              {studentId.report ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  className="ms-2 text-one-row"
                  onClick={() => window.open(studentId.report)}
                >
                  {studentId.report}
                </a>
              ) : (
                <span className="ms-2">Chưa nộp</span>
              )}
            </Col>

            <Col style={{ marginTop: 40 }} span={24}>
              <h6>Ghi chú cho sinh viên</h6>
            </Col>
            <Col span={24}>
              <TextArea
                value={noteDetail}
                showCount
                maxLength={100}
                style={{ height: 80, marginBottom: 10 }}
                onChange={onChangeTextArea}
                
              />
              {isSetNote && (
                <Button type="primary" onClick={onUpdateNote}>
                  Cập nhật ghi chú
                </Button>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <div className="detal-form-status">
            <div
              className="d-flex justify-content-between align-items-center mb-3"
              style={{ flexWrap: "wrap" }}
            >
              <h6 className="mb-0 me-2 text-header-abc">Trạng thái: </h6>
              {isShowSelectStatus ? (
                <Select
                  onChange={onSelectStatus}
                  defaultValue="Trạng thái"
                  style={{ width: "50%" }}
                >
                  {listOption.length > 0 &&
                    listOption.map((item, index) => (
                      <Option value={item.value} key={index}>
                        {item.title}
                      </Option>
                    ))}
                </Select>
              ) : (
                renderStatus(studentId.statusCheck)
              )}

              {isShowNote && (
                <Input
                  style={{ width: "100%", marginTop: 10, marginBottom: 10 }}
                  onChange={handelChangeText}
                  placeholder="Nhập text note"
                />
              )}
              {listOption.length > 0 ? (
                submitStatus ? (
                  <Button type="primary" onClick={onUpdateStatus}>
                    Thực hiện
                  </Button>
                ) : (
                  !isShowNote && <EditOutlined onClick={onSetStatus} />
                )
              ) : (
                <span></span>
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0 me-2 text-header-abc">Người review: </h6>
              {isEditReviewer ? (
                <Select
                  onChange={onSetReviewer}
                  defaultValue="Chọn người review"
                  style={{ width: "50%" }}
                >
                  {listManager.length > 0 &&
                    listManager.map((item) => (
                      <Option key={item._id} value={item.email}>
                        {item.name} - {item.email}
                      </Option>
                    ))}
                </Select>
              ) : studentId.reviewer ? (
                studentId.reviewer
              ) : (
                "Chưa có"
              )}

              {listOption.length > 0 ? (
                <EditOutlined onClick={onShowEditReviewer} />
              ) : (
                <span></span>
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0 me-2 text-header-abc">Công ty: </h6>
              {isEditBusiness && studentId.support === 1  ? (
                <Select
                  onChange={onSelectBusiness}
                  // defaultValue="Chọn công ty"
                  style={{ width: "60%" }}
                  defaultValue={studentId.business?._id}
                >
                  {listBusiness.list.length > 0 &&
                    listBusiness.list.map((item) => (
                      <Option key={item._id} value={item._id}>
                        {item.name} - {item.internshipPosition} - {item.majors}
                      </Option>
                    ))}
                </Select>
              ) : (
                <span>
                  {studentId.support === 1 ? (
                    <span className="ms-2">
                      {studentId.business?.name
                        ? studentId.business?.name
                        : "Không có"}
                    </span>
                  ) : (
                    <span className="ms-2">
                      {studentId.nameCompany
                        ? studentId.nameCompany
                        : "Không có"}
                    </span>
                  )}
                </span>
              )}

              {listBusiness.list.length > 0 && studentId.support === 1  ? (
                <EditOutlined onClick={onShowEditBusiness} />
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default StudentDetail;
