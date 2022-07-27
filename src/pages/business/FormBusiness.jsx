import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CumpusApi from "../../API/Cumpus";
import majorAPI from "../../API/majorAPi";
import { useMutation } from "react-query";
import BusinessAPI from "../../API/Business";
import { useForm, FormProvider } from "react-hook-form";

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

const FormBusiness = ({ paramsUpdate }) => {
  const [defaultValues, setDefaultValues] = useState({
    address: '',
    amount: "",
    campus_id: "",
    code_request: "",
    description: "",
    internshipPosition: "",
    majors: "",
    name: "",
    request: "",
  });

  const methods = useForm({
    defaultValues,
  });

  const [form] = Form.useForm();
  const { val, type } = paramsUpdate;

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

  const fetchCreateBusiness = (params) => {
    return BusinessAPI.create(params);
  };

  const fetchUpdateBusiness = (params) => {
    return BusinessAPI.update(params);
  };

  const fetchBusinessItem = (params) => {
    return BusinessAPI.getItem(params);
  };

  const getSuccessItem = (data) => {
    setDefaultValues({
      address: data.address,
      amount: data.amount,
      campus_id: data.campus_id,
      code_request: data.code_request,
      description: data.description,
      internshipPosition: data.internshipPosition,
      majors: data.majors,
      name: data.name,
      request: data.request,
    });
  };

  const { data, isLoading } = useQuery(
    ["businessItem", val],
    () => fetchBusinessItem(val),
    {
      enabled:type,
      onSuccess: (data) => getSuccessItem(data?.data?.itemBusiness),
      onError: () => console.log("loi"),
    }
  );

  const mutationCreate = useMutation("businessCreate", fetchCreateBusiness, {
    onSuccess: () => console.log("thanh cong"),
  });

  const mutationUpdate = useMutation(["businessUpdate"], fetchUpdateBusiness, {
    onSuccess: () => console.log("thanh cong"),
  });

  const onFinish = (values) => {
    type ?  mutationUpdate.mutate({...values,val}) : mutationCreate.mutate(values);
  };

  useEffect(() => {
    form.resetFields();
  }, [defaultValues]);

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        form={form}
        validateMessages={validateMessages}
        initialValues={defaultValues}
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
