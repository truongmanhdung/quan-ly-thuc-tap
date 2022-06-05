/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Table, message, Space, Form, } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMajor, getListMajor, removeMajor, updateMajor } from "../../features/majorSlice/majorSlice";
import { createNarrows, getNarow } from "../../features/narrow";
import FormMajor from "./majorForm";
const Major = () => {
  const dispatch = useDispatch();
  const [hideForm, setHideForm] = useState('');
  const [change, setChange] = useState(false)
  const [text, setText] = useState("Thêm kỳ");
  const [dataEdit, setDataEdit] = useState({});
  const [form] = Form.useForm();
  const { listMajor, loading } = useSelector((state) => state.major);
  const {listNarrow, loadings} = useSelector(state => state.narrow)
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
      title: "Ngành hẹp",
      dataIndex: "",
      width: 100,
      render: (val, record) => {
                if (listNarrow && Array.isArray(listNarrow) ) {
                    const v = listNarrow.filter(i => i.id_majors._id === record._id)
                    return v.map(item => (<span>{item.name},</span>)  )
                }
      }
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
          <a style={{ color: "blue" }} onClick={() => dispatch(removeMajor(record._id))}>
           Xoá
          </a>
          
        </Space>
      ),
    },
  ]
  useEffect(() => {
    dispatch(getListMajor());
    dispatch(getNarow())
  }, [dispatch]);
  const onFinish = async (values) => {
    const data = {
      ...values,
      id: values.id,
    };
    try {
      switch (hideForm) {
        case "majors":
          if (change) {
            dispatch(updateMajor({
              ...data,
              id: change._id
            }))
          } else {
            dispatch(createMajor(data))
          }
          break;

        case "specializing":
          dispatch(createNarrows(data))
          break;
        default:
          break;
      }
    } catch (error) {
      const dataErr = error.response.data.message;
      message.error(dataErr);
    }
  };

  // sửa ngành
  const getDataEdit = (value) => {
    setHideForm("majors");
    setChange(value)
    form.setFieldsValue({
      id: value._id,
      name: value.name,
      majorCode: value.majorCode,
    });
    setText("Sửa ngành");
  };

  // Huỷ form
  const editStatusButton = (value) => {
    setChange(false)
    setHideForm('');
  };

  // Bật tắt button tạo kỳ
  const isHideForm = (type) => {
    form.resetFields();
    setHideForm(type);
    setText("Xác Nhận");
    setDataEdit();
  };


 
  return (
    <>
      <div className="status">
        <div className="flex-header">
          <h4>Quản lý ngành học</h4>
          <div style={{ display: "flex" }}>
              <Button
                onClick={() => isHideForm('majors')}
                variant="warning"
                style={{ marginRight: 10, height: 36 }}
              >
                Tạo ngành học
              </Button>
              <Button
                onClick={() => isHideForm('specializing')}
                variant="warning"
                style={{ marginRight: 10, height: 36 }}
              >
                Gán ngành hẹp
              </Button>
          </div>
        </div>
        {hideForm.length > 0 ? (
          <div className="filter" style={{ marginTop: "20px" }}>
            <FormMajor
              onFinish={onFinish}
              dataEdit={dataEdit}
              editStatusButton={editStatusButton}
              text={text}
              forms={form}
              type={hideForm}
              listMajors={listMajor}
            />
          </div>
        ) : null}
      <Table loading={loading || loadings} dataSource={listMajor} columns={columns} />
      </div>
    </>
  );
};

export default Major;
