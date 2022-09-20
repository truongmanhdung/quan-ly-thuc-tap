import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../API/requestStudent";

export const sendRequest = createAsyncThunk(
    "request/sendRequest",
    async ({
        val, callback
    }) => {
      const { data } = await requestApi.requestOfStudent(val);
        if (data.success) callback(data.success)
      return data;
    }
  );


  const semesterSlice = createSlice({
    name: "request",
    initialState: {
      loading: false,
    },
  
    extraReducers: (builder) => {
      builder.addCase(sendRequest.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(sendRequest.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(sendRequest.rejected, (state) => {
        state.loading = false;
      });
    },
  });
  
  export default semesterSlice.reducer;
  