import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, DatePicker, message, Radio, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTime,
  upTimeDate,
} from "../../features/timeDateSlice/timeDateSlice";

const Formtimepicker = (props) => {
  const { RangePicker } = DatePicker;
  const { formTime: {times}, loading } = useSelector((state) => state.time);
  const [value, setValue] = useState(1);
  const [date, setDate] = useState(new Date().getTime());
  const dispatch = useDispatch();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSetDatePicker = (date) => {
    setDate(date);
  };

  useEffect(() => {
    dispatch(getListTime());
  }, []);

  const onSaveTime = () => {
    const startTime = date[0]._d.getTime();
    const endTime = date[1]._d.getTime();
    const timeObject = {
      typeNumber: Number(value),
      startTime: startTime,
      endTime: endTime,
    };
    try {
    dispatch(upTimeDate(timeObject));
      message.success("Thành công")
    } catch (error) {
      message.error("Thất bại")
    }
  };
  return (
    <div>
      <h3>Chọn thời gian hoạt động của form</h3>
      <Spin spinning={loading}  >
      <Row>
        <Col span={8}>
          <Radio.Group onChange={onChange} value={value}>
            {times?.length > 0 && times.map((item) => (
              <Radio value={item.typeNumber} key={item._id}>{item.typeName}</Radio>
            ))}
            
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
      </Spin>
    </div>
  );
};

Formtimepicker.propTypes = {};

export default Formtimepicker;
