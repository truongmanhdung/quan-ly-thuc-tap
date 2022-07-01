import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TimeApi from "../../API/timeApi";

export const upTimeDate = createAsyncThunk(
  "times/upTimeDate",
  async (action) => {
    const { data } = await TimeApi.setTimeDate(action);
    return await data.time;
  }
);

export const getListTime = createAsyncThunk("times/getListTime", async (action) => {
  const { data } = await TimeApi.getListTime(action);
  return await data.time;
});

export const getTimeForm = createAsyncThunk(
  "times/getTimeForm",
  async (action) => {
    const { data } = await TimeApi.getTimeForm(action);
    return await data.time;
  }
);
const userSlice = createSlice({
  name: "time",
  initialState: {
    formTime: {
      time: {},
      times: [],
    },
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListTime.fulfilled, (state, action) => {
      state.formTime.times = action.payload;
      state.loading = false;
    });
    builder.addCase(upTimeDate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(upTimeDate.fulfilled, (state, action) => {
      state.loading = false;
      state.formTime.time = action.payload;
    });
    builder.addCase(getTimeForm.fulfilled, (state, action) => {
      state.formTime.time = action.payload;
      state.loading = false;
    });
    builder.addCase(getTimeForm.pending, (state, action) => {
      state.loading = true;
    });
  },
});
export default userSlice.reducer;
