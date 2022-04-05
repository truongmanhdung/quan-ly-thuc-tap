import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import StudentAPI from "../../API/StudentAPI";
export const getStudent=createAsyncThunk(
    "student/getStudent",
    async (page)=>{
        const {data}=await StudentAPI.getAll(page)
        return data
    }
)
export const insertStudent = createAsyncThunk(
    'student/insertStudent',
    async (action) => {
        const {data} = await StudentAPI.add(action)
        return data
    }
)
export const updateReviewerListStudent = createAsyncThunk(
    'student/updateReviewerListStudent',
    async (dataForm) => {
        const {data} = await StudentAPI.updateReviewerSudent(dataForm)
        return data
    }
)
export const getListStudentAssReviewer = createAsyncThunk(
    'student/updateReviewerListStudent',
    async (dataForm) => {
        const {data} = await StudentAPI.listStudentAssReviewer(dataForm)
        return data
    }
)
const studentSlice=createSlice({
    name:"student",
    initialState:{
        listStudent:{},
        loading: false,
        error: '',
        listStudentAssReviewer:[]
    },
    reducers:{
        addStudent(state,action){
            state.listStudent.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getStudent.fulfilled,(state,action)=>{
            state.loading=false
            state.listStudent = action.payload
        })
        builder.addCase(getStudent.pending, (state, action)=> {
            state.loading = true
        })
        builder.addCase(getStudent.rejected, (state,action) =>{
            state.error = 'Không thể truy vấn'
        } )
        builder.addCase(insertStudent.fulfilled, (state, action)=>{
            state.loading = false
            // state.listStudent = action.payload
        })
        builder.addCase(insertStudent.pending, (state, action)=> {
            state.loading = true
        })
        builder.addCase(insertStudent.rejected, (state, action) => {
            state.error = 'Không đúng định dạng'
        })
        //reviewerListStudent
        builder.addCase(updateReviewerListStudent.pending, (state, action)=> {
            state.loading = true
        })
        builder.addCase(updateReviewerListStudent.fulfilled,(state,action)=>{
            state.loading=false
        })
        builder.addCase(updateReviewerListStudent.rejected, (state,action) =>{
            state.error = 'Update reviewer student fail'
        } )
        
        //getListReviewerStudent
        builder.addCase(getListStudentAssReviewer.pending, (state, action)=> {
            state.loading = true
        })
        builder.addCase(getListStudentAssReviewer.fulfilled,(state,action)=>{
            state.loading=false
            state.listStudentAssReviewer = action.payload
        })
        builder.addCase(getListStudentAssReviewer.rejected, (state,action) =>{
            state.error = 'get reviewer student fail'
        } )
    }
})
export default studentSlice.reducer