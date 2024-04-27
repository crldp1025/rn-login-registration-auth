import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../tools/axios";
import { IUserRegistrationProps } from "../../interfaces/User";

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

export const clearRegistrationForm = createAction('registration/clearRegistrationForm');

export const registerUser = createAsyncThunk('registration/register', async (arg: IUserRegistrationProps, { rejectWithValue }) => {
  const res = await axios.post('/api/register', arg, {
    validateStatus: (status) => {
      return status <= 403;
    }
  });

  if(res.status >= 400 && res.status <= 403) {
    return rejectWithValue(res.data);
  }

  return res;
});

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'success';
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
  reducers: {
    clearRegistrationForm: () => initialState
  }
});

export default registrationSlice.reducer;