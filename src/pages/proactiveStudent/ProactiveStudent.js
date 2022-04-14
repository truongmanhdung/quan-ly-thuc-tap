import { Form, Input, Select, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterInternAPI from "../../API/RegisterInternAPI";
import { getListSpecialization } from "../../features/specializationSlice/specializationSlice";
import styles from "./ProactiveStudent.module.css";
import { getTimeForm } from "../../features/timeDateSlice/timeDateSlice";
import Countdown from "react-countdown";
import CountDownCustorm from "../../components/CountDownCustorm";
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
const ProactiveStudent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { listSpecialization } = useSelector((state) => state.specialization);
  const { infoUser } = useSelector((state) => state.auth);
  const { time } = useSelector((state) => state.time.formTime);
  const onFinish = async (values) => {
    try {
      const useCode = values.user_code.toUpperCase();
      const studentMssv = infoUser?.student?.mssv;
      const compare = useCode.toLowerCase() === studentMssv.toLowerCase();
      if (!compare) {
        message.error("Vui lòng nhập đúng mã sinh viên của bạn");
      } else {
        const data = {
          ...values,
          mssv: infoUser?.student?.mssv,
          email: infoUser?.student?.email,
          ///dispatch Redux
        };
        const result = await RegisterInternAPI.uploadProactive(data);
        console.log(result);
        message.success(result.data.message);
        form.resetFields();
      }
    } catch (error) {
      const dataErr = await error.response.data.message;
      message.error(dataErr);
    }
  };

  useEffect(() => {
    dispatch(getListSpecialization());
    dispatch(getTimeForm(1));
  }, []);
  const check = time.endTime > new Date().getTime();
  return (
    <>
      {check && <CountDownCustorm time={time} />}
      {check ? (
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          className={styles.form}
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
              {listSpecialization
                ? listSpecialization.map((item, index) => (
                    <Option value={item.name} key={index}>
                      {item.title}
                    </Option>
                  ))
                : ""}
            </Select>
          </Form.Item>

          <Form.Item
            name="unit"
            label="Đơn vị thực tập"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn vị thực tập",
              },
            ]}
          >
            <Input placeholder="Đơn vị thực tập/Tên doanh nghiệp" />
          </Form.Item>
          <Form.Item
            name="unitAddress"
            label="Địa chỉ thực tập"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ thực tập",
              },
            ]}
          >
            <Input placeholder="Địa chỉ đơn vị thực tập" />
          </Form.Item>
          <Form.Item
            name="taxCode"
            label="Mã số thuế"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Mã số thuế",
              },
            ]}
          >
            <Input placeholder="Mã số thuế" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Chức vụ người tiếp nhận"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập chức vụ người tiếp nhận sinh viên",
              },
            ]}
          >
            <Input placeholder="Chức vụ người tiếp nhận" />
          </Form.Item>

          <Form.Item
            name="numberEnterprise"
            label="Số điện thoại doanh nghiệp"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Số điện thoại doanh nghiệp",
              },
            ]}
          >
            <Input placeholder="Số điện thoại doanh nghiệp(VD:Giám đốc, Leader, Hr)" />
          </Form.Item>

          <Form.Item
            name="emailEnterprise"
            label="Email người tiếp nhận"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Email người tiếp nhận",
              },
            ]}
          >
            <Input placeholder="Email người tiếp nhận" />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Thời gian đăng ký đã hết</p>
      )}
    </>
  );
};

export default ProactiveStudent;
