import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StudentAPI from '../../API/StudentAPI';
export const getAllStudent = createAsyncThunk('student/getAllStudent', async (params) => {
  const { data } = await StudentAPI.getAll(params);
  return data;
});
export const getDataExport = createAsyncThunk(
  'student/getDataExport',
  async ({ filter, callback }) => {
    const { data } = await StudentAPI.getAll(filter);
    if (callback) callback(data.list);
    return data;
  },
);
export const insertStudent = createAsyncThunk('student/insertStudent', async (action) => {
  const { data } = await StudentAPI.add(action);
  return data;
});
export const getSmester = createAsyncThunk('student/getSmester', async (action) => {
  const { data } = await StudentAPI.getSmesterSchool(action);
  return data;
});

export const resetStudentAction = createAsyncThunk(
  'student/resetStudentAction',
  async ({ id, callback }) => {
    const { data } = await StudentAPI.resetApi(id);
    if (callback) callback();
    return data;
  },
);

export const getStudentId = createAsyncThunk('student/getById', async (inforUser) => {
  const { data } = await StudentAPI.get(inforUser);
  return data;
});

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    listStudent: {
      list: [],
      total:0
    },
    listAllStudent: {
      list: [],
      total:0
    },
    loading: false,
    listSmester: [],
    defaultSemester: {},
    studentById: {},
    error: '',
    listExport: {
      list: [],
    },
  },
  reducers: {
    getListStudentReducer: (state, action) => {
      if (action.payload.list) {
        state.listStudent = action.payload;
      } else {
        state.listStudent = {
          list: [],
          total: 0,
        };
      }
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStudent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllStudent.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listAllStudent = payload;
    });
    builder.addCase(getAllStudent.rejected, (state, action) => {
      state.error = 'Không thể truy vấn';
    });
    builder.addCase(insertStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.listStudent = action.payload;
    });
    builder.addCase(insertStudent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(insertStudent.rejected, (state, action) => {
      state.error = 'Không đúng định dạng';
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
      state.error = 'Thất bại';
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
      state.messages = 'Get student fail';
    });

    //resetStudent

    builder.addCase(resetStudentAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetStudentAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetStudentAction.rejected, (state, action) => {
      state.messages = action.payload.message;
    });

    ///export

    builder.addCase(getDataExport.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDataExport.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
  },
});
export const { getListStudentReducer } = studentSlice.actions;
export default studentSlice.reducer;
