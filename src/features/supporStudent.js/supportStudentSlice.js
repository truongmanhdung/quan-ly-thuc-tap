import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StudentAPI from "../../API/StudentAPI";

export const uploadCv = createAsyncThunk(
  "supportStudent/uploadCv",
   async (action) => {
    // console.log(action);
  const {data} = await StudentAPI.uploadCVApi(action)
  console.log(data);
});

const supportStudentSlice = createSlice({
  name: "supportStudent",
  initialState: {
    listSpecialization:[],
    loading:false,
  },
  
  extraReducers: (builder) => {
    builder.addCase()
  },
});

export default supportStudentSlice.reducer;
