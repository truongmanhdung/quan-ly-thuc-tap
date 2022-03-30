import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginGoogle = createAsyncThunk("auth/loginGoogle", async (token) => {
  const { data } = await axios.post('http://localhost:8080/api/login-google',token);
  console.log(data);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    infoUser: {},
    loading: false,
    messages:"",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginGoogle.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      state.loading = true;
      state.infoUser = action.payload;
    });
    builder.addCase(loginGoogle.rejected, (state) => {
      state.messages = "Login google fail";
    });
  },
});

export default authSlice;
