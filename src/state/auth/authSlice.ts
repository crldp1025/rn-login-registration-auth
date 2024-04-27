import { AsyncThunk, createAction, createAsyncThunk, createSlice, isAnyOf, isAsyncThunkAction, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { IUserLoginProps, IUserProps } from "../../interfaces/User";
import axios, { cookieToString } from "../../tools/axios";
import { getData, removeData, storeData } from "../../tools/storage";

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

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export const clearLoginForm = createAction('auth/clearLoginForm');

export const loginUser = createAsyncThunk('auth/login', async (arg: IUserLoginProps, { rejectWithValue }) => {
  const res = await axios.patch('/api/login', arg, {
    validateStatus: (status) => {
      return status <= 403;
    }
  });

  if(res.status >= 400 && res.status <= 403) {
    return rejectWithValue(res.data);
  }

  const jwtoken = res.data.token;
  await storeData('token', jwtoken);

  return res.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async (arg, { rejectWithValue }) => {
  const jwtoken = await getData('token');

  if(jwtoken === undefined || jwtoken === null) {
    return rejectWithValue('No token available.');
  }

  axios.defaults.headers.cookie = `token=${jwtoken}`;
  axios.defaults.headers.path = '/';

  const res = await axios.patch('/api/logout', arg, {
    validateStatus: (status) => {
      return status <= 403;
    },
    withCredentials: true
  });

  if(res.status >= 400 && res.status <= 403) {
    return rejectWithValue(res.data);
  }

  await removeData('token');

  return undefined;
});

export const authenticateUser = createAsyncThunk('auth/user', async (arg, { rejectWithValue }) => {
  const jwtoken = await getData('token');

  if(jwtoken === undefined || jwtoken === null) {
    return rejectWithValue('No token available.');
  }

  axios.defaults.headers.cookie = `token=${jwtoken}`;
  axios.defaults.headers.path = '/';
  
  const res = await axios.get('/api/authenticate-user', {
    validateStatus: (status) => {
      return status <= 403;
    },
    withCredentials: true
  });

  if(res.status >= 400 && res.status <= 403) {
    return rejectWithValue(res.data);
  }

  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(loginUser.pending, authenticateUser.pending, logoutUser.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(loginUser.fulfilled, authenticateUser.fulfilled, logoutUser.fulfilled), (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = undefined;
      })
      .addMatcher(isAnyOf(loginUser.rejected, authenticateUser.rejected, logoutUser.rejected), (state, action) => {
        state.loading = false;
        state.error = (action.type !== 'auth/user/rejected') ? action.payload as string : undefined;
      });
  },
  reducers: {
    clearLoginForm: () => initialState
  }
});

export default authSlice.reducer;