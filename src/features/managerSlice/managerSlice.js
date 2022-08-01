import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import managerApi from '../../API/managerApi';

export const fetchManager = createAsyncThunk('manager/fetchManager', async () => {
  const { data } = await managerApi.getAll();
  return data?.manager;
});

export const createManager = createAsyncThunk('manager/createManager', async (payload) => {
  const { dataForm, callback } = payload;
  const { data } = await managerApi.create(dataForm);
  if (callback) callback(data);
  return data;
});

export const updateManager = createAsyncThunk('manager/updateManager', async (payload) => {
  const { dataForm, callback } = payload;
  const { data } = await managerApi.update(dataForm);
  if (callback) callback(data);
  return data;
});

export const removeManager = createAsyncThunk('major,removeManager', async (payload) => {
  const { id, callback } = payload;
  const { data } = await managerApi.remove(id);
  if (callback) callback(data);
  return data;
});

const managerSlice = createSlice({
  name: 'manager',
  initialState: {
    listManager: [],
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchManager.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchManager.fulfilled, (state, action) => {
      state.loading = false;
      state.listManager = action.payload;
    });
    builder.addCase(fetchManager.rejected, (state, action) => {
      state.error = 'Không thể truy vấn';
    });

    //createManager
    builder.addCase(createManager.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createManager.fulfilled, (state, { payload }) => {
      if (payload.success === true) {
        state.listManager = [payload.manager, ...state.listManager];
      }
      state.loading = false;
    });
    builder.addCase(createManager.rejected, (state, action) => {
      state.error = 'Không thể tạo mới người quản lý';
    });

    //updateManager
    builder.addCase(updateManager.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateManager.fulfilled, (state, { payload }) => {
      let data = state.listManager.filter((item) => item._id !== payload._id);
      if (payload.success === true) {
        state.listManager = [payload.manager, ...data];
      }
      state.loading = false;
    });
    builder.addCase(updateManager.rejected, (state, action) => {
      state.error = 'Không thể sửa thông tin quản lý';
    });

    //removeManager
    builder.addCase(removeManager.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeManager.fulfilled, (state, { payload }) => {
      state.listManager = state.listManager.filter((item) => item._id !== payload.manager._id);
      state.loading = false;
    });
    builder.addCase(removeManager.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});
export default managerSlice.reducer;
