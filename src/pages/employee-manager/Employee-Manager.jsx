import React, { useEffect,} from 'react'
import {  Select, Input,Table } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManager } from '../../features/managerSlice/managerSlice';
import { getListCumpus } from '../../features/cumpusSlice/cumpusSlice';
function EmployeeManager() {
  const dispatch = useDispatch()
  const {listManager} = useSelector(state => state.manager)
  const {listCumpus} = useSelector(state => state.cumpus)
  useEffect(() => {
    dispatch(fetchManager())
    dispatch(getListCumpus())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rowSelection = {
    onChange: (selectedRows) => {
      
    },
  };
  const columns = [
    {
      title: 'Mã NV',
      dataIndex: 'maNV',
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    }
    ,
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
    }
    ,
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
    }
    ,
    {
      title: 'Cơ sở',
      dataIndex: 'campus',
    }
    ,
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => {
          if (status === 0) {
            return <span className='status-suscess' style={{ color: 'green' }}>Đang đi làm <br /></span>
          } else if (status === 1) {
            return <span className='status-failed' style={{ color: 'red' }}>Đã nghỉ việc<br /><button>Sửa</button></span>
          } else if (status === 2) {
            return <span className='status-check' style={{ color: 'rgb(255, 106, 0)' }}>Có việc bận <br/><button>Sửa</button></span>
          } 
      }
     
    }
  ];
  const handleChange = (key, value) => {

  }
  return (
    <div>
        <h4>Danh sách nhân viên</h4>

      <div className="filter">
        <Select style={{ width: 200 }} onChange={val => handleChange('campus', val)} placeholder="Lọc theo cơ sở">
        <Option value='0' >Tất cả</Option>
          {
            listCumpus.map((item,index) => (
              <Option value={item._id} key={index} >{item.name}</Option>
            ))
          }
        </Select>
        <Select className='filter-status' style={{ width: 200 }} onChange={val => handleChange('status', val)} placeholder="Lọc theo trạng thái">
          <Option value="0">Đang đi làm</Option>
          <Option value="1">Đã nghỉ việc</Option>
          <Option value="2">Có việc bận</Option>
        </Select>
        <Input style={{ width: 200 }} placeholder="Tìm kiếm theo tên" onChange={val => handleChange(val.target.value)} />
        
      </div>
          <Table
           rowkey="_id"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={listManager}
      />
    </div>
  )
}



export default EmployeeManager
