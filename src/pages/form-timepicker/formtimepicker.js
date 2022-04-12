import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, DatePicker, Radio, Row } from "antd";
import { useDispatch } from "react-redux";
import { upTimeDate } from "../../features/timeDateSlice/timeDateSlice";

const Formtimepicker = (props) => {
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState(1);
  const [date, setDate] = useState(new Date().getTime());

  const dispatch = useDispatch();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSetDatePicker = (date) => {
    setDate(date);
  };

  const onSaveTime = () => {
    const startTime = date[0]._d.getTime();
    const endTime = date[1]._d.getTime();
    const timeObject = {
      typeRegister: Number(value),
      startTime: startTime,
      endTime: endTime,
    };
    dispatch(upTimeDate(timeObject));
  };
  return (
    <div>
      <h3>Chọn thời gian hoạt động của form</h3>
      <Row>
        <Col span={4}>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Form đăng ký</Radio>
            <Radio value={2}>Form tự tìm</Radio>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <RangePicker
            onChange={onSetDatePicker}
            renderExtraFooter={() => "extra footer"}
            showTime
          />
        </Col>
        <Col span={8}>
          <Button onClick={onSaveTime} type="primary">
            Đặt thời gian
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Formtimepicker.propTypes = {};

export default Formtimepicker;
