import {
  Form,
  Input,
  Select,
  Button,
  message,
  Spin,
  Space,
  DatePicker,
} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReportFormAPI from "../../API/ReportFormAPI";

import styles from "./ReportForm.module.css";

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
const ReportForm = () => {
  const [spin, setSpin] = useState(false);
  const [startDate, setStartDate] = useState();
  const [form] = Form.useForm();
  const { infoUser } = useSelector((state) => state.auth);
  console.log(infoUser);
  const mssv = infoUser.student.mssv;
  const email = infoUser.student.email;
  const lForm = infoUser.student.form;
  const datePicker = (date) => {
    setStartDate(date);
  };

  const onFinish = async (values) => {
    setSpin(true);
    try {
      const newData = {
        ...values,
        internshipTime: startDate,
        mssv: mssv,
        email: email,
      };
      const result = await ReportFormAPI.uploadReport(newData);
      console.log(newData);
      message.success(result.data.message);
      form.resetFields();
    } catch (error) {
      const dataErr = await error.response.data;
      message.error(dataErr.message);
    }
    setSpin(false);
  };

  return (
    <>
      {spin ? <Spin /> : null}
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
          name="nameCompany"
          label="Tên doanh nghiệp"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên doanh nghiệp",
            },
          ]}
        >
          <Input placeholder="Tên doanh nghiệp" />
        </Form.Item>

        <Form.Item
          name="internshipTime"
          label="Thời gian thực tập"
          // rules={[{}]}
        >
          <Space direction="vertical">
            <DatePicker onChange={datePicker} placeholder="Bắt đầu thực tập" />
          </Space>
        </Form.Item>
        <Form.Item
          name="attitudePoint"
          label="Điểm thái độ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập điểm thái độ",
            },
          ]}
        >
          <Input placeholder="Nhập điểm thái độ thực tập" />
        </Form.Item>

        <Form.Item
          name="resultScore"
          label="Điểm kết quả"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập điểm kết quả thực tập",
            },
          ]}
        >
          <Input placeholder="Nhập điểm kết quả thực tập" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{
              margin: "0 5px 0",
            }}
            type="link"
            href={lForm}
          >
            Xem biểu mẫu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ReportForm;
