import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import majorAPI from "../../API/majorAPi";

export const getListMajor = createAsyncThunk("major,getListMajor", async () => {
  const { data } = await majorAPI.getList();
  return data?.majors;
});

export const createMajor = createAsyncThunk(
  "major,createMajor",
  async (dataForm) => {
    const { data } = await majorAPI.create(dataForm);
    return data?.message;
  }
);

export const updateMajor = createAsyncThunk(
  "major,updateMajor",
  async (id, dataForm) => {
    const { data } = await majorAPI.update(id, dataForm);
    return data?.message;
  }
);

export const removeMajor = createAsyncThunk("major,removeMajor", async (id) => {
  const { data } = await majorAPI.remove(id);
  return data?.message;
});
const majorSlice = createSlice({
  name: "major",
  initialState: {
    listMajor: [],
    loading: false,
    message: "",
    success: false,
  },
  extraReducers: (builder) => {
    //getListMajor
    builder.addCase(getListMajor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListMajor.fulfilled, (state, action) => {
      state.listMajor = action.payload;
      state.loading = false;
    });
    builder.addCase(getListMajor.rejected, (state) => {
      state.loading = false;
    });

    //createMajor
    builder.addCase(createMajor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMajor.fulfilled, (state, action) => {
      state.message = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createMajor.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    //updateMajor
    builder.addCase(updateMajor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateMajor.fulfilled, (state, action) => {
      state.message = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(updateMajor.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    //removeMajor
    builder.addCase(removeMajor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeMajor.fulfilled, (state, action) => {
      state.message = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(removeMajor.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

export default majorSlice.reducer;
