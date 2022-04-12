import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StudentAPI from "../../API/StudentAPI";

export const getListStudentAssReviewer = createAsyncThunk(
    'reviewer/getListStudentAssReviewer',
    async (dataForm) => {
        const { data } = await StudentAPI.listStudentAssReviewer(dataForm)
        return data
    }
)

export const updateReviewerListStudent = createAsyncThunk(
    'student/updateReviewerListStudent',
    async (dataForm) => {
        const { data } = await StudentAPI.updateReviewerSudent(dataForm)
        return data
    }
)
export const updateStatusListStudent = createAsyncThunk(
    'student/updateStatusListStudent',
    async (dataForm) => {
        const { data } = await StudentAPI.updateStatusSudent(dataForm)
        return data
    }
)
export const listStudentForm = createAsyncThunk(
    'student/listStudent',
    async (dataForm) => {
        const { data } = await StudentAPI.listStudentForm(dataForm)
        return data
    }
)
export const listStudentReport = createAsyncThunk(
    'student/listStudentReport',
    async (dataForm) => {
        const { data } = await StudentAPI.listStudentReport(dataForm)
        return data
    }
)
const reviewerSlice = createSlice({
    name: "reviewer",
    initialState: {
        listStudentAssReviewer: {
            list: [],
            total: 0
        }
    },
    reducers: {
        uploadStudent(state, action) {
            state.listStudentAssReviewer.list = action.payload
        }
    },
    extraReducers: (builder) => {
        //reviewerListStudent
        builder.addCase(updateReviewerListStudent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateReviewerListStudent.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(updateReviewerListStudent.rejected, (state, action) => {
            state.error = 'Update reviewer student fail'
        })
        //UpdateStatusStudent
        builder.addCase(updateStatusListStudent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateStatusListStudent.fulfilled, (state, action) => {
            state.loading = false
            // state.listStudentAssReviewer.list += action.payload
        })
        builder.addCase(updateStatusListStudent.rejected, (state, action) => {
            state.error = 'Update reviewer student fail'
        })
        //getListReviewerStudent
        builder.addCase(getListStudentAssReviewer.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getListStudentAssReviewer.fulfilled, (state, action) => {
            state.loading = false
            state.listStudentAssReviewer = action.payload
        })
        builder.addCase(getListStudentAssReviewer.rejected, (state, action) => {
            state.error = 'get reviewer student fail'
        })
        //list Student form
        builder.addCase(listStudentForm.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(listStudentForm.fulfilled, (state, action) => {
            state.loading = false
            state.listStudentAssReviewer = action.payload
        })
        builder.addCase(listStudentForm.rejected, (state, action) => {
            state.error = 'get reviewer student fail'
        })
        //list Student report
        builder.addCase(listStudentReport.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(listStudentReport.fulfilled, (state, action) => {
            state.loading = false
            state.listStudentAssReviewer = action.payload
        })
        builder.addCase(listStudentReport.rejected, (state, action) => {
            state.error = 'get reviewer student fail'
        })
    }
})
export const { uploadStudent } = reviewerSlice.actions
export default reviewerSlice.reducer