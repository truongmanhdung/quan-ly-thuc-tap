import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import StudentAPI from "../../API/StudentAPI";
export const getStudent=createAsyncThunk(
    "student/getStudent",
    async ()=>{
        const {data:student}=await StudentAPI.getAll()
        return student
    }
)
const studentSlice=createSlice({
    name:"student",
    initialState:{
        value:[]
    },
    reducers:{
        addStudent(state,action){
            state.value.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getStudent.fulfilled,(state,action)=>{
            state.value = action.payload
        })
    }
})
export default studentSlice.reducer