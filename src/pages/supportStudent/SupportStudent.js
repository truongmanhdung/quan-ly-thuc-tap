import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSpecialization } from "../../features/specializationSlice/specializationSlice";
import styles from "./SupportStudent.module.css";
const { Option } = Select;
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
const SupportStudent = () => {
  const dispatch = useDispatch();
  const [linkCV, setLinkCV] = useState();
  const [form] = Form.useForm();
  const { listSpecialization } = useSelector((state) => state.specialization);
  const { infoUser } = useSelector((state) => state.auth);

  const normFile = (e) => {
    //xử lí ảnh firebase or google drive
    setLinkCV(e.file);
    console.log("data: ", e.file);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const data = {
      ...values,
      cv: linkCV,
      email: infoUser?.student?.email,
      ///dispatch Redux
    };
  };

  useEffect(() => {
    dispatch(getListSpecialization());
  }, []);

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        className={styles.form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="user_code"
          label="Mã sinh viên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã sinh viên",
            },
          ]}
        >
          <Input placeholder="Mã sinh viên" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Họ và Tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>
        <Form.Item
          name="majors"
          label="Ngành học"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngành học",
            },
          ]}
        >
          <Select
            style={{
              width: "50%",
              marginLeft: "20px",
            }}
            placeholder="Chọn ngành học"
          >
            {listSpecialization.map((item, index) => (
              <Option value={item._id} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="dream"
          label="Vị trí mong muốn"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
        >
          <Input placeholder="Vị trí mong muốn" />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              style={{
                marginLeft: "20px",
              }}
              icon={<UploadOutlined />}
            >
              Click to upload
            </Button>
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
};

export default SupportStudent;
