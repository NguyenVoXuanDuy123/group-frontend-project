import authSlice from "@/redux/slices/authSlice";
import messageSlice from "@/redux/slices/errorModalSlice";
import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./slices/toastSlice";
import newsfeedSlice from "./slices/newsfeedSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    messageModal: messageSlice.reducer,
    toast: toastSlice.reducer,
    newsfeedSlice: newsfeedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
