import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, Upload, message, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterInternAPI from "../../API/RegisterInternAPI";
import { getListSpecialization } from "../../features/specializationSlice/specializationSlice";
import { getTimeForm } from "../../features/timeDateSlice/timeDateSlice";
import Countdown from 'react-countdown';
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
  const [file, setFile] = useState();
  const [spin, setSpin] = useState(false);
  const {time} = useSelector((state) => state.time);
  console.log(time);
  const [form] = Form.useForm();
  const { listSpecialization } = useSelector((state) => state.specialization);
  const { infoUser } = useSelector((state) => state.auth);

  function guardarArchivo(files, data) {
    setSpin(true);
    const file = files; //the file

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
        `https://script.google.com/macros/s/AKfycbzu7yBh9NkX-lnct-mKixNyqtC1c8Las9tGixv42i9o_sMYfCvbTqGhC5Ps8NowC12N/exec
    `, //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }
      ) //send to Api
        .then((res) => res.json())
        .then((a) => {
          const newData = { ...data, CV: a.url };
          RegisterInternAPI.upload(newData)
            .then((res) => {
              message.success("Đăng ký hỗ trợ thực tập thành công");
              form.resetFields();
            })
            .catch(async (err) => {
              const dataErr = await err.response.data;
              if (!dataErr.status) {
                message.error(`${dataErr.message}`);
                form.resetFields();
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
    const valueFile = e.file.originFileObj;

    const isPDF = valueFile.type === "application/pdf";

    if (!isPDF) {
      form.resetFields();
      message.error("Vui lòng nhập file đúng định dạng PDF");
    }
    setFile(e.file.originFileObj);
  };
  const onFinish = async (values) => {
    try {
      const compare = values.user_code === infoUser?.student?.mssv;

      if (!compare) {
        message.error("Vui lòng nhập đúng mã sinh viên của bạn");
      } else {
        const data = {
          ...values,
          email: infoUser?.student?.email,
          ///dispatch Redux
        };
        await guardarArchivo(file, data);
      }
    } catch (error) {
      const dataErr = await error.response.data.message;
      message.error(dataErr);
    }
  };

  useEffect(() => {
    dispatch(getListSpecialization());
    dispatch(getTimeForm(2))
  }, []);
  const Completionist = () => <span>You are good to go!</span>;
  console.log(time.endTime - time.startTime);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };
  console.log(Date.now() + 5000);
  return (
    <>
      <Countdown date={Date.now() + time.endTime - time.startTime} renderer={renderer} />
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
              <Option value={item.name} key={index}>
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
          label="Upload file PDF"
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
