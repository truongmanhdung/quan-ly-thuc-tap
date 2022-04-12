import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TimeApi from "../../API/timeApi";

export const upTimeDate = createAsyncThunk(
    "times/upTimeDate",
    async (action) =>{
        const {data} = await TimeApi.setTimeDate(action)
        return await data.time
    }
)
const userSlice=createSlice({
    name:"time",
    initialState:{
        time : {}
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(upTimeDate.fulfilled, (state,action)=>{
            state.time = action.payload
        })
    }
    
})
export default userSlice.reducer