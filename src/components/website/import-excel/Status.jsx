import React, { useState, useEffect } from 'react'
import StudentAPI from '../../../API/StudentAPI'
import { EyeOutlined, FilePdfOutlined } from '@ant-design/icons'
import '../../../common/styles/status.css'
import { notification, Select, Input, Checkbox, Row, Col } from 'antd';
import { $ } from '../../../ultis';
const { Option } = Select;
const Status = () => {
    const [student, setStudent] = useState([])
    const [studentSearch, setStudentSearch] = useState([])
    const [nameSearch, setNameSearch] = useState('')
    const [chooseIdStudent, setChooseIdStudent] = useState([])
    const [statusButton, setStatusButton] = useState(true)
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

    // lọc theo ngành
    const filterMajors = async (value) => {
        const { data: student } = await StudentAPI.getAll()
        setStudentSearch(student.filter(item => item.majors.toLowerCase().includes(value.toLowerCase())))
    }
    // lọc theo trạng thái
    const filterStatus = async (value) => {
        const { data: student } = await StudentAPI.getAll()
        setStudentSearch(student.filter(item => item.status.toLowerCase().includes(value.toLowerCase())))
    }

    // xóa tìm kiếm
    const deleteFilter = () => {
        setStudentSearch([])
    }
    // tìm kiếm theo tên
    const filterInput = async (e) => {
        const { data: student } = await StudentAPI.getAll()
        setStudentSearch(student.filter(item => item.name.toLowerCase().includes(e.toLowerCase())))
    }


    const chooseId = (id, e) => {
        if (chooseIdStudent == []) {
            setChooseIdStudent(id)
        } else {
            if (e.target.checked == true) {
                setChooseIdStudent([...chooseIdStudent, id])
            } else {
                setChooseIdStudent(chooseIdStudent.filter(item => item !== id))
            }
        }
    }
    const chooseStudent = () => {
        console.log(chooseIdStudent)

    }

    const editCv = async (id) => {
        const { data } = await StudentAPI.get(id)
        $(".name-student").innerHTML = `${data.name}`
        $(".edit-cv").classList.add('active-cv')
        window.addEventListener("click", function (e) {
            if (e.target == $(".edit-cv")) {
                $(".edit-cv").classList.remove('active-cv')

            }
        })

    }

    return (
        <div className='status'>
            <h3>Sinh viên đăng ký thực tập</h3>
            <div className="filter">
                <Select style={{ width: 200 }} onChange={filterMajors} placeholder="Lọc theo ngành">
                    <Option value="QTDN">Quản trị doanh nghiệp</Option>
                    <Option value="TKĐH">Thiết kế đồ họa</Option>
                    <Option value="UDPM">Ứng dụng phần mềm</Option>
                    <Option value="TMĐT">Maketing</Option>
                    <Option value="LTMT">Lập trình máy trính</Option>
                    <Option value="TKTW">Thiết kế Website</Option>
                    <Option value="QHCC">Quan hệ công chúng</Option>
                </Select>
                <Select className='filter-status' style={{ width: 200 }} onChange={filterStatus} placeholder="Lọc theo trạng thái">
                    <Option value="0">Chưa đạt</Option>
                    <Option value="1">Đã tạch</Option>
                    <Option value="2">Sửa CV</Option>
                    <Option value="3">Đang kiểm tra</Option>
                    <Option value="4">CV đã ổn</Option>
                    <Option value="5">Đi phỏng vấn</Option>
                    <Option value="6">Trượt phỏng ấn đang đợi nhà trường chọn doanh nghiệp</Option>
                    <Option value="7">Đang thực tập</Option>
                </Select>
                <Input style={{ width: 200 }} placeholder="Tìm kiếm theo tên" onChange={(e) => filterInput(e.target.value)} />
                {studentSearch.length > 0 && <button onClick={() => deleteFilter()}>Xóa lọc</button>}
                <button onClick={() => chooseStudent()}>Chọn sinh viên</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Chọn</th>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ và Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ngành thực tập</th>
                        <th>CV</th>
                        <th>Trạng thái</th>
                        <th>Người review CV</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (studentSearch.length == 0 ? student : studentSearch).map((item, index) => {

                            return (
                                <tr key={index}>
                                    <td className='checkbox'>
                                        <Checkbox onChange={(e) => chooseId(item.id, e)}></Checkbox>
                                    </td>

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

                                        {item.status == 2 && <span className='status-up' style={{ color: 'red' }}>Sửa CV <br /><button onClick={() => editCv(item.id, index)}>Sửa</button>

                                        </span>}
                                        {item.status == 3 && <span className='status-check' style={{ color: 'rgb(255, 106, 0)' }}>Đang kiểm tra</span>}

                                        {item.status == 4 && <span className='status-true' style={{ color: 'rgb(44, 194, 21)' }}>CV đã ổn <br /><button>Chọn doanh nghiệp</button></span>}

                                        {item.status == 5 && <span className='status-true' style={{ color: 'rgb(44, 194, 21)' }}>Đi phỏng vấn</span>}

                                        {item.status == 6 && <span className='status-fail' style={{ color: 'red' }}>Trượt phỏng ấn đang đợi nhà trường chọn doanh nghiệp<br /><button>Chi tiết</button></span>}

                                        {item.status == 7 && <span className='status-successful' style={{ color: 'rgb(44, 194, 21)' }}>Đang thực tập</span>}
                                    </td>
                                    <td>Lê Trọng Đạt</td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>

            {/* sửa cv */}

            <div className="edit-cv " >
                <div className="form-edit-cv">
                    <h3>Sửa CV</h3>
                    <div className="input-edit-cv">
                        <div className="name">Tên sinh viên : <span className='name-student'></span></div>
                        <br />
                        <label htmlFor="ediv-cv">
                            <span>Sửa CV</span><FilePdfOutlined className='icon-edit-cv' />
                        </label>
                        <input type="file" id='ediv-cv' />
                    </div>

                    <button>Sửa</button>
                </div>
            </div>
        </div>
    )
}

export default Status