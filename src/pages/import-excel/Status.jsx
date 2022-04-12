import React, { useState, useEffect } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import '../../common/styles/status.css';
import { Select, Input, Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getStudent } from '../../features/StudentSlice/StudentSlice';
import {
  updateReviewerListStudent,
  updateStatusListStudent,
} from '../../features/reviewerStudent/reviewerSlice';
import { Link, useNavigate } from 'react-router-dom';

import { filterBranch, filterStatuss } from '../../ultis/selectOption';
import { omit } from 'lodash';
const { Option } = Select;

const Status = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.auth);
  const {
    listStudent: { list, total },
    loading,
  } = useSelector((state) => state.students);
  const [chooseIdStudent, setChooseIdStudent] = useState([]);
  const [listIdStudent, setListIdStudent] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    campus_id: infoUser.manager.cumpus,
  });
  const [filter, setFiler] = useState({});
  useEffect(() => {
    dispatch(getStudent(page));
  }, [page]);
  const columns = [
    {
      title: 'MSSV',
      dataIndex: 'mssv',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      width: 150,
      fixed: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phoneNumber',
      width: 160,
    },
    {
      title: 'Ngành',
      dataIndex: 'majors',
      width: 100,
    },
    {
      title: 'Phân loại',
      dataIndex: 'support',
      width: 90,
      render: (val) => {
        if (val === 1) {
          return 'Hỗ trợ';
        } else if (val === 0) {
          return 'Tự tìm';
        } else {
          return '';
        }
      },
    },
    {
      title: 'CV',
      dataIndex: 'CV',
      width: 50,
      render: (val) =>
        val ? <EyeOutlined className="icon-cv" onClick={() => window.open(val)} /> : '',
    },
    {
      title: 'Người review',
      dataIndex: 'reviewer',
      render: (val) => val,
      width: 230,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusCheck',
      render: (status) => {
        if (status === 0) {
          return (
            <span className="status-fail" style={{ color: 'orange' }}>
              Chờ kiểm tra <br />
              <Button>Sửa</Button>
            </span>
          );
        } else if (status === 1) {
          return (
            <span className="status-up" style={{ color: 'grey' }}>
              Đang kiểm tra
              <br />
              <Button>Sửa</Button>
            </span>
          );
        } else if (status === 2) {
          return (
            <span className="status-fail" style={{ color: 'green' }}>
              Nhận Cv <br />
              <Button>Sửa</Button>
            </span>
          );
        } else if (status === 3) {
          return (
            <span className="status-fail" style={{ color: 'red' }}>
              Không đủ Đk <br />
              <Button>Sửa</Button>
            </span>
          );
        } else if (status === 4) {
          <span className="status-fail" style={{ color: 'red' }}>
            Trượt <br />
            <Button>Sửa</Button>
          </span>;
        } else {
          return (
            <span className="status-fail" style={{ color: 'red' }}>
              Chưa đăng ký
            </span>
          );
        }
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setListIdStudent(selectedRowKeys);
      setChooseIdStudent(selectedRows);
    },
  };

  const handleStandardTableChange = (key, value) => {
    const newValue =
      value.length > 0 || value > 0
        ? {
            ...filter,
            [key]: value,
          }
        : omit(filter, [key]);
    setFiler(newValue);
  };
  const handleSearch = () => {
    const data = {
      ...page,
      ...filter,
    };
    dispatch(getStudent(data));
  };

  const comfirm = () => {
    dispatch(
      updateReviewerListStudent({ listIdStudent: listIdStudent, email: infoUser?.manager?.email }),
    );
    alert('Thêm thành công ');
    navigate('/review-cv');
  };

  return (
    <div className="status">
      <h4>Sinh viên đăng ký thực tập</h4>

      <div className="filter">
        <span>Ngành: </span>

        <Select
          style={{ width: 200 }}
          onChange={(val) => handleStandardTableChange('majors', val)}
          placeholder="Lọc theo ngành"
        >
          {filterBranch.map((item, index) => (
            <>
              <Option value={item.value} key={index}>
                {item.title}
              </Option>
            </>
          ))}
        </Select>
        <span
          style={{
            marginLeft: '30px',
          }}
        >
          Trạng thái:
        </span>
        <Select
          className="filter-status"
          style={{ width: 200 }}
          onChange={(val) => handleStandardTableChange('statusCheck', val)}
          placeholder="Lọc theo trạng thái"
        >
          {filterStatuss.map((item, index) => (
            <Option value={index} key={index}>
              {item.title}
            </Option>
          ))}
        </Select>

        <span
          style={{
            marginLeft: '30px',
          }}
        >
          Tìm Kiếm:{' '}
        </span>
        <Input
          style={{ width: 200 }}
          placeholder="Tìm kiếm theo tên"
          onChange={(val) => handleStandardTableChange('name', val.target.value)}
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
        {chooseIdStudent.length > 0 && <Button onClick={() => comfirm()}>Xác nhận</Button>}
      </div>

      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        pagination={{
          pageSize: page.limit,
          total: total,
          onChange: (page, pageSize) => {
            setPage({
              page: page,
              limit: pageSize,
              campus_id: infoUser.manager.cumpus,
              ...filter,
            });
          },
        }}
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={list}
        scroll={{ x: 'calc(700px + 50%)' }}
      />
    </div>
  );
};

export default Status;
