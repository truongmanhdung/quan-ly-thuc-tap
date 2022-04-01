import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
   async (action) => {
  // const { data } = await axios.post('http://localhost:8080/api/login-google',token);
  // if(data){
  //   localStorage.setItem("token",data.token)
  // }
  // return data;
  return action
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    infoUser: {},
    loading: false,
    messages:"",
  },
  reducers: {
    logout(state, action){
      state.infoUser = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.infoUser = action.payload;
    });
    builder.addCase(loginGoogle.rejected, (state) => {
      state.messages = "Login google fail";
    });
  },
});

export const {logoutAuth} = authSlice.actions
export default authSlice.reducer;
