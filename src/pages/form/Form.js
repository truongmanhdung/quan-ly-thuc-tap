import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Spin,
  Space,
  DatePicker,
} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReportFormAPI from "../../API/ReportFormAPI";

import styles from "./Form.module.css";

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
const Formrp = () => {
  const [spin, setSpin] = useState(false);
  const [startDate, setStartDate] = useState();
  const [file, setFile] = useState();
  const [form] = Form.useForm();
  const { infoUser } = useSelector((state) => state.auth);
  console.log("inforUser: ", infoUser);
  const mssv = infoUser.student.mssv;
  const email = infoUser?.student?.email;
  const datePicker = (date) => {
    setStartDate(date._d);
    console.log(date);
  };

  function guardarArchivo(files, data) {
    const file = files; //the file
    const urlGGDriveCV = `https://script.google.com/macros/s/AKfycbzu7yBh9NkX-lnct-mKixNyqtC1c8Las9tGixv42i9o_sMYfCvbTqGhC5Ps8NowC12N/exec
     `;

    console.log("file: ", files);
    var reader = new FileReader(); //this for convert to Base64
    reader.readAsDataURL(file); //start conversion...
    reader.onload = function (e) {
      //.. once finished..
      var rawLog = reader.result.split(",")[1]; //extract only thee file data part
      var dataSend = {
        dataReq: { data: rawLog, name: file.name, type: file.type },
        fname: "uploadFilesToGoogleDrive",
      }; //preapre info to send to API
      fetch(
        urlGGDriveCV, //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }
      ) //send to Api
        .then((res) => res.json())
        .then((a) => {
          const newData = { ...data, form: a.url };
          console.log(newData);
          ReportFormAPI.uploadForm(newData)
            .then((res) => {
              console.log(newData);
              message.success(res.data.message);
              form.resetFields();
            })
            .catch(async (err) => {
              const dataErr = await err.response.data;
              if (!dataErr.status) {
                message.error(`${dataErr.message}`);
                form.resetFields();
                console.log("error: ", err.response.data);
              } else {
                message.error(`${dataErr.message}`);
              }
            });
          setSpin(false);
        })
        .catch((e) => {
          message.success("Có lỗi xảy ra! Vui lòng đăng ký lại");
          form.resetFields();
          setSpin(false);
        }); // Or Error in console
    };
  }

  const normFile = (e) => {
    const valueFile = e.file.originFileObj.type;
    console.log(valueFile);
    const isJPEG = valueFile === "image/jpeg";

    if (!isJPEG) {
      form.resetFields();
      message.error("Vui lòng nhập file đúng định dạng PNG hoặc JPEG");
    }

    setFile(e.file.originFileObj);
  };

  const onFinish = async (values) => {
    setSpin(true);
    try {
      const newData = {
        ...values,
        mssv: mssv,
        email: email,
        internshipTime: startDate,
      };
      await guardarArchivo(file, newData);
    } catch (error) {
      const dataErr = await error.response.data;
      message.error(dataErr.message);
    }
    console.log(values);
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
          name="attitudePoint"
          label="Mã số thuế"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã số thuế của doanh nghiệp",
            },
          ]}
        >
          <Input placeholder="Nhập mã số thuế doanh nghiệp" />
        </Form.Item>

        <Form.Item
          name="internshipTime"
          label="Thời gian bắt đầu thực tập"
          // rules={[{}]}
        >
          <Space direction="vertical">
            <DatePicker onChange={datePicker} placeholder="Bắt đầu thực tập" />
          </Space>
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              //     style={{
              //       marginLeft: "20px",
              //     }}
              icon={<UploadOutlined />}
            >
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Formrp;
