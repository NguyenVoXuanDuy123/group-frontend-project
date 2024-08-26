import  authSlice  from "@/redux/slices/authSlice";
import  messageSlice  from "@/redux/slices/errorModalSlice";
import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    messageModal: messageSlice,
    toast: toastSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
