import React, { useState, useEffect } from 'react'
import StudentAPI from '../../../API/StudentAPI'
import { EyeOutlined } from '@ant-design/icons'
import '../../../common/styles/status.css'
import { notification, Select, Input, Checkbox } from 'antd';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const Status = () => {
    const [student, setStudent] = useState([])
    const [studentSearch, setStudentSearch] = useState([])
    const [nameSearch, setNameSearch] = useState('')
    useEffect(() => {
        const listData = async () => {
            const { data: student } = await StudentAPI.getAll()
            setStudent(student)
            setStudentSearch([])

        }
        listData()
    }, [])
    // xem cv
    const showCV = (cv) => {
        window.open(cv)
    }

    // ấn chi tiết để xem được chi tiết trạng thái
    const openDetail = async (id, status) => {
        const { data: student } = await StudentAPI.getAll()
        const notificationStudent = student.find(item => item.id == id)
        notification[status == 'warning' ? 'warning' : 'error']({
            message: 'Chi tiết',
            description:
                `${notificationStudent.status_detail}`,
        })

    }

    const filterMajors = async (value) => {
        const { data: student } = await StudentAPI.getAll()
        setStudentSearch(student.filter(item => item.majors.toLowerCase().includes(value.toLowerCase())))
    }

    const deleteFilter = () => {
        setStudentSearch([])
    }
    const filterInput = async (e) => {
        const { data: student } = await StudentAPI.getAll()
        setStudentSearch(student.filter(item => item.name.toLowerCase().includes(e.toLowerCase())))
    }

    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const defaultCheckedList = ['Apple', 'Orange'];


    const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);

    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <div className='status'>
            <h3>Sinh viên đăng ký thực tập</h3>
            <div className="filter">
                <Select style={{ width: 200 }} onChange={filterMajors} placeholder="Lọc theo ngành">

                    {studentSearch.length == 0 && <Option value=""></Option>}

                    <Option value="QTDN">Quản trị doanh nghiệp</Option>
                    <Option value="TKĐH">Thiết kế đồ họa</Option>
                    <Option value="UDPM">Ứng dụng phần mềm</Option>
                    <Option value="TMĐT">Maketing</Option>
                    <Option value="LTMT">Lập trình máy trính</Option>
                    <Option value="TKTW">Thiết kế Website</Option>
                    <Option value="QHCC">Quan hệ công chúng</Option>
                </Select>
                <Input style={{ width: 200 }} placeholder="Tìm kiếm theo tên" onChange={(e) => filterInput(e.target.value)} />
                {studentSearch.length > 0 && <button onClick={() => deleteFilter()}>Xóa lọc</button>}

                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />

            </div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ và Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ngành thực tập</th>
                        <th>CV</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (studentSearch.length == 0 ? student : studentSearch).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.mssv}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td>{item.internship_industry}</td>
                                    <td>
                                        <EyeOutlined className='icon-cv' onClick={() => showCV(item.link_cv)} />
                                    </td>
                                    <td className='list-status'>
                                        {item.status == 0 && <span className='status-not-reached' style={{ color: 'red' }}>Chưa đạt <br /> <button onClick={() => openDetail(item.id, 'warning')}>Chi tiết</button></span>}
                                        {item.status == 1 && <span className='status-fail' style={{ color: 'red' }}>Đã tạch <br /><button onClick={() => openDetail(item.id, 'error')}>Đã tạch</button></span>}
                                        {item.status == 2 && <span className='status-up' style={{ color: 'red' }}>Sửa CV <br /><button>Sửa</button></span>}
                                        {item.status == 3 && <span className='status-check' style={{ color: 'rgb(255, 106, 0)' }}>Đang kiểm tra</span>}
                                        {item.status == 4 && <span className='status-true' style={{ color: 'rgb(44, 194, 21)' }}>CV đã ổn <br /><button>Chọn doanh nghiệp</button></span>}
                                        {item.status == 5 && <span className='status-true' style={{ color: 'rgb(44, 194, 21)' }}>Đi phỏng vấn</span>}
                                        {item.status == 6 && <span className='status-fail' style={{ color: 'red' }}>Trượt phỏng ấn đang đợi nhà trường chọn doanh nghiệp<br /><button>Chi tiết</button></span>}
                                        {item.status == 7 && <span className='status-successful' style={{ color: 'rgb(44, 194, 21)' }}>Đang thực tập</span>}
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Status