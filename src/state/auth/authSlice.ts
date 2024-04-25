import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserLoginProps, IUserProps } from "../../interfaces/User";

interface IAuthStateProps {
  loading: boolean;
  user: IUserProps | undefined;
  error: string | undefined;
}

const initialState: IAuthStateProps = {
  loading: false,
  user: undefined,
  error: undefined
}

export const login = createAsyncThunk('auth/login', async (arg: IUserLoginProps, { rejectWithValue }) => {

});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      })
  },
  reducers: {}
});

export default authSlice.reducer;