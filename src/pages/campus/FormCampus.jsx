import { Form, Input, Button } from 'antd';
import { size } from 'lodash';
import React from 'react';

const FormCampus = ({ onFinish,  forms, current }) => {
  const onFinishForm = (values) => {
    const data = size(current)
      ? {
          id: current._id,
          ...values,
        }
      : values;
    onFinish(data);
  };

  return (
    <>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} form={forms} onFinish={onFinishForm}>
        <Form.Item
          name="name"
          label="Tên cơ sở"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên cơ sở!',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="Tên cơ sở" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormCampus;
