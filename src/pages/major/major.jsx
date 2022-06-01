/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Table, message, Space, Form, Spin  } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import majorAPI from "../../API/majorAPi";
import { getListMajor } from "../../features/majorSlice/majorSlice";
import FormMajor from "./majorForm";
const Major = () => {
  const dispatch = useDispatch();
  const [hideForm, setHideForm] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [text, setText] = useState("Thêm kỳ");
  const [dataEdit, setDataEdit] = useState({});
  const [form] = Form.useForm();
  const { listMajor, loading } = useSelector((state) => state.major);
  console.log(listMajor);

  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const result = listMajor?.map((item) => ({
    id: item._id,
    name: capitalizeFirstLetter(item.name),
    majorCode: item.majorCode,
  }));

  const onFinish = async (values) => {
    const data = {
      id: values.id,
      name: values.name,
      majorCode: values.majorCode,
    };
    try {
      if (values.status === 1) {
        const res = await majorAPI.update(data);
        if (res) {
          message.success("Sửa ngành học thành công");
        }
      } else {
        const res = await majorAPI.create(data);
        if (res) {
          message.success("Thêm ngành học thành công");
        }
      }
    } catch (error) {
      const dataErr = error.response.data.message;
      message.error(dataErr);
    }
    setHideForm(false);
  };

  // sửa ngành
  const getDataEdit = (value) => {
    setHideForm(true);
    console.log(value);
    form.setFieldsValue({
      id: value.id,
      name: value.name,
      majorCode: value.majorCode,
    });
    setHideButton(true);
    setText("Sửa ngành");
  };

  // Huỷ form
  const editStatusButton = (value) => {
    setHideButton(value);
    setHideForm(false);
  };

  // Bật tắt button tạo kỳ
  const isHideForm = () => {
    form.resetFields();
    setHideForm(!hideForm);
    setText("Thêm ngành");
    setDataEdit();
  };

  useEffect(() => {
    dispatch(getListMajor());
  }, [dispatch, hideForm]);

  const columns = [
    {
      dataIndex: "id",
      width: 20,
    },
    {
      title: "Tên ngành học",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "Mã ngành học",
      dataIndex: "majorCode",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: "blue" }} onClick={() => getDataEdit(record)}>
            Sửa
          </a>
        </Space>
      ),
    },
  ].filter((item) => item.dataIndex !== "id");

  return (
    <>
      <div className="status">
        <div className="flex-header">
          <h4>Quản lý ngành học</h4>
          <div style={{ display: "flex" }}>
            {hideButton ? null : (
              <Button
                onClick={() => isHideForm()}
                variant="warning"
                style={{ marginRight: 10, height: 36 }}
              >
                Tạo ngành học
              </Button>
            )}
          </div>
        </div>
        {hideForm ? (
          <div className="filter" style={{ marginTop: "20px" }}>
            <FormMajor
              onFinish={onFinish}
              dataEdit={dataEdit}
              editStatusButton={editStatusButton}
              text={text}
              forms={form}
            />
          </div>
        ) : null}
        {loading ? <Spin /> : <Table dataSource={result} columns={columns} />}
      </div>
    </>
  );
};

export default Major;
