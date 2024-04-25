import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type RegistrationStatus = 'success' | 'failed';

interface IRegistrationStateProps {
  loading: boolean;
  status: RegistrationStatus | undefined;
  error: string | undefined;
}

const initialState: IRegistrationStateProps = {
  loading: false,
  status: undefined,
  error: undefined
}

const register = createAsyncThunk('registration/register', async (arg, { rejectWithValue }) => {

});

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
      });
  },
  reducers: {}
});

export default registrationSlice.reducer;