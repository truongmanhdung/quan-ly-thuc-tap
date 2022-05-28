import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, message, Radio, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTime,
  upTimeDate,
} from "../../features/timeDateSlice/timeDateSlice";

const Formtimepicker = () => {
  const { RangePicker } = DatePicker;
  const {
    formTime: { times },
    loading,
  } = useSelector((state) => state.time);
  console.log(times)
  const [value, setValue] = useState(0);
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
  }, [dispatch]);

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
      message.success("Thành công");
    } catch (error) {
      message.error("Thất bại");
    }
  };
  return (
    <div>
    <h3 style={{marginBottom:50}}>Đặt thời gian cho các form nhập của sinh viên</h3>
      <Spin spinning={loading}/>
      <Row gutter={[16, 20]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Radio.Group onChange={onChange} value={value}>
            {times?.length > 0 && times.map((item) => (
              <Radio value={item.typeNumber} key={item._id}>{item.typeName}</Radio>
            ))}
            
          </Radio.Group>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <RangePicker
            onChange={onSetDatePicker}
            renderExtraFooter={() => "extra footer"}
            showTime
            style={{marginTop:10}}
          />
          <Button style={{marginTop:10}} onClick={onSaveTime} type="primary">
            Đặt thời gian
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Formtimepicker.propTypes = {};

export default Formtimepicker;
