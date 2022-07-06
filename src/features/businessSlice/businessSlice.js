import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BusinessAPI from "../../API/Business";
export const insertBusiness = createAsyncThunk(
  "business/insertBusiness",
  async (action) => {
    const { data } = await BusinessAPI.add(action);
    return data;
  }
);
export const getBusiness = createAsyncThunk(
  "business/getBusiness",
  async (action) => {
    const {data} = await BusinessAPI.get(action)
    return data
  }
)
const businessSlice = createSlice({
  name: "business",
  initialState: {
    listBusiness: {},
    loading: false,
    error: "",
  },
  reducers: {
    getBusinessStudent: (state, action) => {
      // console.log(action.payload);
      state.listBusiness = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBusiness.fulfilled, (state, action) => {
      state.loading = false;
      state.listBusiness = action.payload;
    });
    builder.addCase(getBusiness.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBusiness.rejected, (state, action) => {
      state.error = "Thất bại";
    });


    builder.addCase(insertBusiness.fulfilled, (state, action) => {
      state.loading = false;
      state.listBusiness = action.payload;
    });
    builder.addCase(insertBusiness.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(insertBusiness.rejected, (state, action) => {
      state.error = "Không đúng định dạng";
    });
  },
});

export const { getBusinessStudent } = businessSlice.actions
export default businessSlice.reducer;
