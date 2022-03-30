import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import StudentAPI from '../../API/StudentAPI';

export const fetchStudent = createAsyncThunk(
    "student/fetchStudent",
    async () => {
        const { data } = await StudentAPI.getAll()
        return data;
    }
);

const initialState = {
    error: "",
    loading: false,
    listStudent: []
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // trường hợp 1: gọi đến action fetchProduct và thành công
        builder.addCase(fetchStudent.fulfilled, (state, action) => {
            state.listStudent = action.payload;
            state.loading = false;
        });

        builder.addCase(fetchStudent.rejected, (state, action) => {
            state.error = "Không thể truy xuất dữ liệu";
        });

        // trường hợp 2: Trang thai call api chua thanh cong
        builder.addCase(fetchStudent.pending, (state) => {
            state.loading = true;
        });
        // fullfillmed, rejected, pending
    }
})




export default studentSlice.reducer