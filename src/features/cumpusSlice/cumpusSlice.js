import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CumpusApi from "../../API/Cumpus";
import StudentAPI from "../../API/StudentAPI";

export const getListCumpus = createAsyncThunk(
  "cumpus/getListCumpus",
  async () => {
    const { data } = await CumpusApi.getList();
    return data.cumpusList;
  }
);

export const getStudentId = createAsyncThunk("student/getById", async (id) => {
  const { data } = await StudentAPI.get(id);
  return data;
});

const cumpusSlice = createSlice({
  name: "cumpus",
  initialState: {
    listCumpus: [],
    studentById: {},
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getListCumpus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListCumpus.fulfilled, (state, action) => {
      state.loading = false;
      state.listCumpus = action.payload;
    });
    builder.addCase(getListCumpus.rejected, (state) => {
      state.messages = "Get list cumpus fail";
    });

    builder.addCase(getStudentId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentId.fulfilled, (state, action) => {
      state.loading = false;
      state.student = action.payload;
    });
    builder.addCase(getStudentId.rejected, (state) => {
      state.messages = "Get student fail";
    });
  },
});

export default cumpusSlice.reducer;
