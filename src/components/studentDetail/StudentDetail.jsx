import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Modal, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentAPI from "../../API/StudentAPI";
import {getBusiness} from '../../features/businessSlice/businessSlice'
import { fetchManager } from "../../features/managerSlice/managerSlice";
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
  const { onShowModal, studentId } = props;
  const [isShowSelectStatus, setIsShowSelectStatus] = useState(false);
  const [isEditReviewer, setIsEditReviewer] = useState(false);
  const [isEditBusiness, setIsEditBusiness] = useState(false)
  const [studentdetail, setStudentdetail] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(0);
  const { infoUser } = useSelector((state) => state.auth);
  const { listManager } = useSelector((state) => state.manager);
  const { listBusiness } = useSelector((state) => state.business);
  console.log("business", listBusiness);
  const [isShowNote, setIsShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [isSetNote, setIsSetNote] = useState(false);
  const [noteDetail, setNoteDetail] = useState("");
  const [listOption, setListOption] = useState([]);
  const dispatch = useDispatch();

  const getDataStudent = useCallback(async () => {
    const { data } = await StudentAPI.getStudentById(studentId);
    setStudentdetail(data);
    if(data){
      dispatch(getBusiness({
        campus_id: data.campus_id._id,
        smester_id: data.smester_id._id,
      }));
    }
    setNoteDetail(data.note);
  }, [dispatch, studentId]);

  useEffect(() => {
    dispatch(fetchManager());
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
    if (value !== +studentdetail.statusCheck) {
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
      listIdStudent: [studentdetail._id],
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
        listEmailStudent: [{ email: studentdetail.email }],
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
      // console.log(data);
    }
  };

  const onUpdateNote = async () => {
    const { data } = await StudentAPI.updateStatusSudent({
      listIdStudent: [studentId],
      listEmailStudent: [{ email: studentdetail.email }],
      email: infoUser?.manager?.email,
      status: studentdetail.statusCheck,
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
      listIdStudent: [studentdetail._id],
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
      studentdetail.CV &&
      !studentdetail.form &&
      !studentdetail.report &&
      studentdetail.statusCheck !== 3
    ) {
      setListOption(statusConfigCV);
    } else if (
      studentdetail.CV &&
      studentdetail.form &&
      !studentdetail.report &&
      studentdetail.statusCheck !== 3
    ) {
      setListOption(statusConfigForm);
    } else if (studentdetail.CV && studentdetail.form && studentdetail.report) {
      setListOption(statusConfigReport);
    } else {
      setListOption([]);
    }
  }, [
    studentdetail.CV,
    studentdetail.form,
    studentdetail.report,
    studentdetail.statusCheck,
  ]);

  return (
    <Modal
      width="90%"
      title="Chi tiết sinh viên"
      onCancel={onShowModal}
      visible={true}
    >
      <h4>Thông tin sinh viên</h4>
      <Row>
        <Col span={16} className="border-right" style={{ paddingRight: 20 }}>
          <Row className="d-flex align-items-center">
            <Col span={12} className="d-flex">
              <h6>Họ tên: </h6>
              <span className="ms-2">
                {studentdetail.name ? studentdetail.name : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Tên công ty: </h6>
              {studentdetail.support === 1 ? (
                <span className="ms-2">
                  {studentdetail.business?.name
                    ? studentdetail.business?.name
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentdetail.nameCompany
                    ? studentdetail.nameCompany
                    : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Mã sinh viên: </h6>
              <span className="ms-2">
                {studentdetail.mssv ? studentdetail.mssv : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Địa chỉ công ty: </h6>
              {studentdetail.support === 1 ? (
                <span className="ms-2">
                  {studentdetail.business?.address
                    ? studentdetail.business?.address
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentdetail.addressCompany
                    ? studentdetail.addressCompany
                    : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Email: </h6>
              <span className="ms-2">
                {studentdetail.email ? studentdetail.email : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Mã số thuế: </h6>
              {studentdetail.support === 1 ? (
                <span className="ms-2">
                  {studentdetail.business?.taxCode
                    ? studentdetail.business?.taxCode
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentdetail.taxCode ? studentdetail.taxCode : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Chuyên ngành: </h6>
              <span className="ms-2">
                {studentdetail.majors ? studentdetail.majors : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Vị trí thực tập: </h6>
              {studentdetail.support === 1 ? (
                <span className="ms-2">
                  {studentdetail.business?.internshipPosition
                    ? studentdetail.business?.internshipPosition
                    : "Không có"}
                </span>
              ) : (
                <span className="ms-2">
                  {studentdetail.position ? studentdetail.position : "Không có"}
                </span>
              )}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Khoá học: </h6>
              <span className="ms-2">
                {studentdetail.course ? studentdetail.course : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>SĐT công ty: </h6>
              <span className="ms-2">
                {studentdetail.phoneNumberCompany
                  ? studentdetail.phoneNumberCompany
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Kỳ thực tập: </h6>
              <span className="ms-2">
                {studentdetail?.smester_id?.name
                  ? studentdetail.smester_id?.name
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Email người xác nhận: </h6>
              <span className="ms-2">
                {studentdetail.emailEnterprise
                  ? studentdetail.emailEnterprise
                  : "Không có"}
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
              <h6>Ngày bắt đầu thực tập: </h6>
              <span className="ms-2">
                {studentdetail.internshipTime
                  ? studentdetail.internshipTime
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Địa chỉ: </h6>
              <span className="ms-2">
                {studentdetail?.address ? studentdetail?.address : "không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Ngày kết thúc thực tập: </h6>
              <span className="ms-2">
                {studentdetail.endInternShipTime
                  ? studentdetail.endInternShipTime
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>Phân loại: </h6>
              {studentdetail.support ? (
                <span className="ms-2">
                  {studentdetail.support === 1
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
                {studentdetail.attitudePoint
                  ? studentdetail.attitudePoint
                  : "Không có"}
              </span>
            </Col>

            <Col span={12} className="d-flex">
              <h6 className="me-2">Trạng thái: </h6>
              {renderStatus(studentdetail.statusCheck)}
            </Col>
            <Col span={12} className="d-flex">
              <h6>Điểm kết thúc: </h6>
              <span className="ms-2">
                {studentdetail.resultScore
                  ? studentdetail.resultScore
                  : "Không có"}
              </span>
            </Col>
            <Col span={12} className="d-flex">
              <h6>CV: </h6>
              {studentdetail.CV ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
                renderStatus(studentdetail.statusCheck)
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
              ) : studentdetail.reviewer ? (
                studentdetail.reviewer
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
              {isEditBusiness && studentdetail.support === 1  ? (
                <Select
                  onChange={onSelectBusiness}
                  // defaultValue="Chọn công ty"
                  style={{ width: "60%" }}
                  defaultValue={studentdetail.business?._id}
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
                  {studentdetail.support === 1 ? (
                    <span className="ms-2">
                      {studentdetail.business?.name
                        ? studentdetail.business?.name
                        : "Không có"}
                    </span>
                  ) : (
                    <span className="ms-2">
                      {studentdetail.nameCompany
                        ? studentdetail.nameCompany
                        : "Không có"}
                    </span>
                  )}
                </span>
              )}

              {listBusiness.list.length > 0 && studentdetail.support === 1  ? (
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
