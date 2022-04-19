import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from '../../API/Auth'
import { removeCookie, setCookie, STORAGEKEY } from "../../ultis/storage";

export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (dataForm) => {
    const { data } = await AuthApi.login(dataForm)
    if (data?.accessToken) {
      localStorage.setItem("token", data?.accessToken);
      // setCookie(STORAGEKEY.ACCESS_TOKEN, data.accessToken)
    }
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const { data } = await AuthApi.logout();
  if(data){
    localStorage.removeItem('token')
  }
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    infoUser: {},
    loading: false,
    messages: "",
    token: undefined,
  },

  extraReducers: (builder) => {
    builder.addCase(loginGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.infoUser = action.payload;
      state.token = action.payload.token;
    });
    builder.addCase(loginGoogle.rejected, (state) => {
      state.messages = "Login google fail";
    });

    //logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.messages = "Logout google fail";
    });
  },
});

export default authSlice.reducer;
