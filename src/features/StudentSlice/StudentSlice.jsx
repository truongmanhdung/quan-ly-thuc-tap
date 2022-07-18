import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StudentAPI from "../../API/StudentAPI";
export const getStudent = createAsyncThunk(
  "student/getStudent",
  async (page) => {
    const { data } = await StudentAPI.getAll(page);
    return data;
  }
);
export const getAllStudent = createAsyncThunk(
  "student/getAllStudent",
  async (params) => {
    const { data } = await StudentAPI.getAll(params);
    return data;
  }
);
export const insertStudent = createAsyncThunk(
  "student/insertStudent",
  async (action) => {
    const { data } = await StudentAPI.add(action);
    return data;
  }
);
export const getSmester = createAsyncThunk(
  "student/getSmester",
  async (action) => {
    const { data } = await StudentAPI.getSmesterSchool(action);
    return data;
  }
);

export const getStudentId = createAsyncThunk("student/getById", async (inforUser) => {
  const { data } = await StudentAPI.get(inforUser);
  return data;
});

const studentSlice = createSlice({
  name: "student",
  initialState: {
    listStudent: {
      list: []
    },
    listAllStudent: {},
    loading: false,
    listSmester: [],
    defaultSemester: {},
    studentById: {},
    error: "",
  },
  reducers: {
    getListStudentReducer: (state, action) => {
      if(action.payload.list){
        state.listStudent = action.payload; 
      }else{
        state.listStudent = {
          list: [],
          total: 0
        }
      }
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStudent.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listAllStudent = payload;
    });
    builder.addCase(getAllStudent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllStudent.rejected, (state, action) => {
      state.error = "Không thể truy vấn";
    });
    builder.addCase(getStudent.fulfilled, (state, { payload }) => {
      state.loading = false;
      if(payload.list){
        state.listStudent = payload;
      }else{
        state.listStudent = {
          list: [],
          total: 0
        }
      }
    });
    builder.addCase(getStudent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getStudent.rejected, (state, action) => {
      state.error = "Không thể truy vấn";
    });
    builder.addCase(insertStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.listStudent = action.payload;
    });
    builder.addCase(insertStudent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(insertStudent.rejected, (state, action) => {
      state.error = "Không đúng định dạng";
    });
    //smester
    builder.addCase(getSmester.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSmester.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listSmester = payload.listSemesters;
      state.defaultSemester = payload.defaultSemester;
    });
    builder.addCase(getSmester.rejected, (state, action) => {
      state.loading = false;
      state.error = "Thất bại";
    });
    //studentByID

    builder.addCase(getStudentId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentId.fulfilled, (state, action) => {
      state.loading = false;
      state.studentById = action.payload;
    });
    builder.addCase(getStudentId.rejected, (state) => {
      state.messages = "Get student fail";
    });
  },
});
export const { getListStudentReducer } = studentSlice.actions;
export default studentSlice.reducer;
