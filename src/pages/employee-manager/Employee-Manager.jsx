/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Table, message, Space, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import managerApi from "../../API/managerApi";
import { fetchManager } from "../../features/managerSlice/managerSlice";
import {getListCumpus} from "../../features/cumpusSlice/cumpusSlice"
import FormManager from "./formManager";

const EmployeeManager = () => {
  const dispatch = useDispatch();
  const [hideForm, setHideForm] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [text, setText] = useState();
  const [dataEdit, setDataEdit] = useState({});
  const [form] = Form.useForm();
  const { listManager} = useSelector((state) => state.manager);
  const { listCumpus } = useSelector((state) => state.cumpus);

  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  
  const result = listManager.map((item) => ({
    id: item._id,
    name: capitalizeFirstLetter(item.name),
    email:item.email,
    role:item.role,
    campus:item.campus_id
  }));


  const onFinish = async (values) => {
    const data = {
      id: values.id,
      name: values.name,
      email:values.email,
      role:values.role,
      campus:values.campus_id,
      
    };
    try {
      if (values.status === 1) {
        const res = await managerApi.update(data);
        if (res) {
          message.success("Sửa thông tin nhân viên thành công");
          dispatch(fetchManager())
        }
      } else {
        const res = await managerApi.create(data);
        if (res) {
          message.success("Tạo mới nhân viên thành công thành công");
          dispatch(fetchManager())
        }
      }
    } catch (error) {
      const dataErr = error.response.data.message;
      message.error(dataErr);
    }
    setHideForm(false);
  };

  // sửa kỳ
  const getDataEdit = (value) => {
    setHideForm(true);
    form.setFieldsValue({
      id: value.id,
      name: value.name,
      email:value.email,
      role:value.role,
      campus:value.campus_id
    });
    setHideButton(true);
    setText(2);
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
    setText(1);
    setDataEdit();
  };

  useEffect(() => {
    dispatch(fetchManager());
    dispatch(getListCumpus());
  }, [dispatch, hideForm]);

  const columns = [
    {
      dataIndex: "id",
      width: 20,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "Email nhân viên",
      dataIndex: "email",
      width: 100,
    },
    {
      title: "Cơ sở đang làm việc",
      dataIndex: "campus",
      width: 100,
    },
    {
      title: "Quyền hạn quản lý",
      dataIndex: "role",
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
          <h4>Quản lý nhân viên</h4>
          <div style={{ display: "flex" }}>
            {hideButton ? null : (
              <Button
                onClick={() => isHideForm()}
                variant="warning"
                style={{ marginRight: 10, height: 36 }}
              >
                Tạo mới nhân viên
              </Button>
            )}
          </div>
        </div>
        {hideForm ? (
          <div className="filter" style={{ marginTop: "20px" }}>
            <FormManager
              onFinish={onFinish}
              dataEdit={dataEdit}
              editStatusButton={editStatusButton}
              text={text}
              forms={form}
              listCumpus={listCumpus}
            />
          </div>
        ) : null}
        <Table dataSource={result} columns={columns} />
      </div>
    </>
  );
};

export default EmployeeManager;
