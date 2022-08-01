/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Table, message, Space, Form, Drawer } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch} from 'react-redux';
import {
  createCumpus,
  getListCumpus,
  removeCumpus,
  updateCumpus,
} from '../../features/cumpusSlice/cumpusSlice';
import FormCampus from './FormCampus';

const CampusManager = ({ result }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getListCumpus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: 'Tên cơ sở',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleVisible('edit', record)}>
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              dispatch(
                removeCumpus({
                  id: record._id,
                  callback: cbMessage,
                }),
              )
            }
          >
            {' '}
            Xoá{' '}
          </Button>
        </Space>
      ),
    },
  ];
  const handleVisible = (key, record) => {

    switch (key) {
      case 'edit':
        setCurrent(record);
        
        form.setFieldsValue(record);
        setText('Sửa');
        setVisible(true);
        break;
      case 'add':
        setText('Thêm');
        setVisible(true);
        break;
      default:
        break;
    }
  };
  const handleAdd = (val) => {
    dispatch(
      createCumpus({
        dataForm: val,
        callback: cbMessage,
      }),
    );
    form.resetFields();
    setVisible(false);
  };

  const handleUpdate = (val) => {
    dispatch(
      updateCumpus({
        dataForm: val,
        callback: cbMessage,
      }),
    );
    setCurrent({})
    form.resetFields();
    setVisible(false);
  };

  const cbMessage = (val) => {
    if (val.success) {
      message.success(val.message);
      return;
    } else {
      message.error(val.message);
      return;
    }
  };

  const parentMethods = {
    onFinish: _.size(current) ? handleUpdate : handleAdd,
    forms: form,
    current: current,
  };
  return (
    <>
      <div className="status">
        <div className="flex-header">
          <h4>Quản lý cơ sở</h4>
          <div style={{ display: 'flex' }}>
            <Button
              onClick={() => handleVisible('add')}
              variant="warning"
              style={{ marginRight: 10, height: 36 }}
            >
              Tạo mới cơ sở
            </Button>
          </div>
        </div>
        <div className="filter">
          <Drawer
            placement="left"
            visible={visible}
            onClose={() => {
              form.resetFields();
              setCurrent({});
              setVisible(false);
            }}
            destroyOnClose
            title={text}
          >
            <FormCampus {...parentMethods} />
          </Drawer>
        </div>
        <Table dataSource={result} columns={columns} />
      </div>
    </>
  );
};

export default connect(({ cumpus }) => ({
  result: cumpus.listCumpus,
}))(CampusManager);
