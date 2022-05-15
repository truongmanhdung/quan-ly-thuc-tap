import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SemestersAPI from "../../API/SemestersAPI";

export const getSemesters = createAsyncThunk(
  "semesters/getSemesters",
  async () => {
    const { data } = await SemestersAPI.getSemesters();
    return data;
  }
);

export const insertSemester = createAsyncThunk(
  "semesters/insertSemester",
  async (action) => {
    const { data } = await SemestersAPI.insertSemester(action);
  }
);

const semesterSlice = createSlice({
  name: "semesters",
  initialState: {
    listSemesters: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getSemesters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSemesters.fulfilled, (state, action) => {
      state.loading = false;
      state.listSemesters = action.payload;
    });
    builder.addCase(getSemesters.rejected, (state) => {
      state.messages = "Get Semesters fail!";
    });
    builder.addCase(insertSemester.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertSemester.fulfilled, (state, action) => {
      state.loading = false;
      state.listSemesters = action.payload;
    });
    builder.addCase(insertSemester.rejected, (state) => {
      state.messages = "Get Semesters fail!";
    });
  },
});

export default semesterSlice.reducer;
