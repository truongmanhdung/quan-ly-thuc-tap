import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
} from 'antd';
import styles from "./ProactiveStudent.module.css"
import React, { useState } from 'react';
const { Option } = Select;
const dataSelect = [
  {
    id: 1,
    title: 'Thiết kế website',
  },
  {
    id: 2,
    title: 'Thiết kế đồ hoạ',
  },
  {
    id: 3,
    title: 'Digital marketting',
  },
  {
    id: 4,
    title: 'Marketting Sales',
  },
  {
    id: 5,
    title: 'Ứng dụng phần mềm',
  },
  {
    id: 6,
    title: 'Lập trình Mobile',
  },

]
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const ProactiveStudent = () => {

  const [linkCV, setLinkCV]= useState()

  const [form] = Form.useForm();

  const normFile = (e) => {
        //xử lí ảnh firebase or google drive
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const data = {
      ...values,
      cv: linkCV
    ///dispatch Redux
    }
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        className={styles.form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Email FPT Polytechnic"

          rules={[
            {
              type: 'email',
              message: 'Email không đúng định dạng'
            },
            {
              required: true,
              message: 'Vui lòng nhập Email',
            },
          ]}
        >
          <Input
            placeholder='Email'
            
          />
        </Form.Item>
        <Form.Item
          name="user_code"
          label="Mã sinh viên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã sinh viên',
            },
          ]}
        >
          <Input
            placeholder='Mã sinh viên'

          />
        </Form.Item>

        <Form.Item
          name="name"
          label="Họ và Tên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên',
              whitespace: true,
            },
          ]}
        >
          <Input
            placeholder='Họ và tên'

          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại',
            },
          ]}
        >
<Input
            placeholder='Số điện thoại'

            
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ',
            },
          ]}
        >
          <Input
            placeholder='Địa chỉ'
            
          />
        </Form.Item>
        <Form.Item
          name="majors"
          label="Ngành học"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngành học',
            },
          ]}
        >
          <Select style={{
             width: '50%',
             marginLeft: '20px'
          }} placeholder="Chọn ngành học">
            {
              dataSelect.map((item, index) => (
                <Option value={item.id} key={index} >{item.title}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="dream"
          label="Vị trí mong muốn"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ',
            },
          ]}
        >
          <Input
            placeholder='Vị trí mong muốn'
            
          />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload  name="logo" action="/upload.do" listType="picture">
            <Button style={{
             marginLeft: '20px'
          }} icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ProactiveStudent
  ;
