import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { notification, Select, Input, Checkbox, Table } from 'antd';
import { Option } from 'antd/lib/mentions';
import { getStudent } from '../../features/StudentSlice/StudentSlice';
import { useDispatch, useSelector } from 'react-redux';
function EmployeeManager(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()

  // Tạm để data.students.value vì chưa có api
  const employee = useSelector(data => data.students.value);

  // lọc ra sinh viên mà user đã chọn để review cv
  const selectedEmployee = employee.filter(item => item.user_id == user.id)
  const [employeeSearch, setEmployeeSearch] = useState([])
  useEffect(() => {
   
  }, [])

  // lọc theo ngành
  const filterCampus = async (value) => {
    setEmployeeSearch(employee.filter(item => item.campus.toLowerCase().includes(value.toLowerCase())))
  }
  // lọc theo trạng thái
  const filterStatus = async (value) => {
    setEmployeeSearch(employee.filter(item => item.status.toLowerCase().includes(value.toLowerCase())))
  }
 
  // xóa tìm kiếm
  const deleteFilter = () => {
    setEmployeeSearch([])
  }
  // tìm kiếm theo tên
  const filterInput = async (e) => {
    setEmployeeSearch(employee.filter(item => item.name.toLowerCase().includes(e.toLowerCase())))
  }
  const data = [];
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
        function ji() {
          if (status == 0) {
            return <span className='status-suscess' style={{ color: 'green' }}>Đang đi làm <br /></span>
          } else if (status == 1) {
            return <span className='status-failed' style={{ color: 'red' }}>Đã nghỉ việc<br /><button>Sửa</button></span>
          } else if (status == 2) {
            return <span className='status-check' style={{ color: 'rgb(255, 106, 0)' }}>Có việc bận <br/><button>Sửa</button></span>
          } 
        }
       
      }
     
    }
  ];
  return (
    <div>
        <h4>Danh sách nhân viên</h4>

      <div className="filter">
        <Select style={{ width: 200 }} onChange={filterCampus} placeholder="Lọc theo cơ sở">
          <Option value="CSHANOI">Cơ sở Hà Nội</Option>
          <Option value="CSDANANG">Cơ sở Đà Nẵng</Option>
          <Option value="CSHCM">Cơ sở Hồ Chí Minh</Option>
          <Option value="CSTAYNGUYEN">Cơ sở Tây Nguyên</Option>
          <Option value="CSCANTHO">Cơ sở Cần Thơ</Option>
        </Select>
        <Select className='filter-status' style={{ width: 200 }} onChange={filterStatus} placeholder="Lọc theo trạng thái">
          <Option value="0">Đang đi làm</Option>
          <Option value="1">Đã nghỉ việc</Option>
          <Option value="2">Có việc bận</Option>
        </Select>
        <Input style={{ width: 200 }} placeholder="Tìm kiếm theo tên" onChange={(e) => filterInput(e.target.value)} />
        
      </div>
          <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}



export default EmployeeManager
