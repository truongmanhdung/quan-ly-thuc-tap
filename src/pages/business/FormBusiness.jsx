import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CumpusApi from "../../API/Cumpus";
import majorAPI from "../../API/majorAPi";
import { useMutation } from "react-query";
import BusinessAPI from "../../API/Business";


const layout = {
  labelCol: {
    span: 8,
    style: { textAlign: "left" },
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const FormBusiness = ({paramsUpdate}) => {
  const [form] = Form.useForm();


  const { data: dataMajors, isLoading: isLoadingMajor } = useQuery(
    "majors",
    () => {
      return majorAPI.getList();
    }
  );

  const { data: dataCampus, isLoading: isLoadingCampus } = useQuery(
    "campus",
    () => {
      return CumpusApi.getList();
    }
  );

  const fetchCreateBusiness = (params) =>{
    return BusinessAPI.create(params)
  }

  const mutation = useMutation('business',fetchCreateBusiness,{
    onSuccess:() => console.log('thanh cong')
  })

  const onFinish = (values) => {
    mutation.mutate(values)
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        form={form}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["name"]}
          label="Tên doanh nghiệp"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["code_request"]}
          label="Mã doanh nghiệp"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name={["internshipPosition"]}
          label="Vị trí thực tập"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["address"]}
          label="Địa chỉ thực tập"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={["request"]} label="Yêu cầu từ daonh nghiệp">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={["description"]}
          label="Chi tiết khi làm việc tại doanh nghiệp"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Chuyên ngành học"
          name={["majors"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            {isLoadingMajor ? (
              <Spin />
            ) : (
              dataMajors?.data?.majors.map((major) => (
                <Select.Option key={major._id} value={major._id}>
                  {major.name}
                </Select.Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Cơ sở FPT Poly"
          name={["campus_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            {isLoadingCampus ? (
              <Spin />
            ) : (
              dataCampus?.data?.listCumpus.map((campus) => (
                <Select.Option key={campus._id} value={campus._id}>
                  {campus.name}
                </Select.Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Form.Item
          name={["amount"]}
          label="Số lượng tuyển dụng của doanh nghiệp"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
            },
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default memo(FormBusiness);
