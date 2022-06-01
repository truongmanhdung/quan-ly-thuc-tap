import { Col, Form, Input, Row, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListMajor } from "../../features/majorSlice/majorSlice";
const FormMajor = ({ onFinish, editStatusButton, text, forms }) => {
  const dispatch = useDispatch();
  const onFinishForm = (values) => {
    if (text.toLowerCase() === "sửa ngành học") {
      onFinish({ ...values, status: 1 });
    } else {
      onFinish(values);
    }
  };

  useEffect(() => {
    dispatch(getListMajor());
  }, [dispatch]);

  const sethButton = (values) => {
    editStatusButton(values);
  };
  console.log(forms);
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
              label="Tên ngành học"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên ngành học!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={4}
            md={12}
            lg={8}
            xl={8}
            style={{ padding: "0 10px" }}
          >
            <Form.Item
              name="majorCode"
              label="Mã ngành học"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã ngành học!",
                },
              ]}
            >
              <Input />
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

export default FormMajor;
