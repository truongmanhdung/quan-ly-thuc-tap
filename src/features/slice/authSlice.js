import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export const logoutAuth = createAsyncThunk(
  'auth/logoutAuth',
  async (action) => {
    const navatigate = useNavigate()
    return navatigate('/login')
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState: {
    infoUser: {},
    loading: false,
    messages:"",
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
    builder.addCase(logoutAuth.fulfilled, (state, action)=> {
      state.infoUser = undefined
    })
  },
});

export default authSlice.reducer;
