import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import registrationReducer from './registration/registrationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;