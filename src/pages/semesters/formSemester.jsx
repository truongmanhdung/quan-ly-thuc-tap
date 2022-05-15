import { Col, DatePicker, Form, Input, Row, Button } from "antd";
import React from "react";
const { RangePicker } = DatePicker;

const FSemester = ({ onFinish, editStatusButton, text, forms }) => {
  const onFinishForm = (values) => {
    if (text.toLowerCase() === "sửa kỳ") {
      onFinish({ ...values, status: 1 });
    } else {
      onFinish(values);
    }
  };

  const sethButton = (values) => {
    editStatusButton(values);
  };

  return (
    <>
      <Form form={forms} onFinish={onFinishForm}>
        <Row>
          <Col
            xs={24}
            sm={4}
            md={12}
            lg={8}
            xl={8}
            style={{ padding: "0 10px" }}
          >
            <Form.Item
              name="name"
              label="Tên kỳ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên kỳ học!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={4} md={12} lg={8} xl={8}>
            <Form.Item
              name="time"
              label="Thời gian bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thời gian của kỳ học!",
                },
              ]}
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ marginLeft: "20px" }}>
              <Button type="primary" htmlType="submit">
                {text}
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                type="danger"
                onClick={() => sethButton(false)}
              >
                Huỷ
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FSemester;
