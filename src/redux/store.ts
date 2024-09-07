import authSlice from "@/redux/slices/authSlice";
import modalSlice from "@/redux/slices/modalSlice";
import notificationSlice from "@/redux/slices/notificationSlice";
import toastSlice from "@/redux/slices/toastSlice";
import reactionsSlice from "@/redux/slices/reactionSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    notification: notificationSlice,
    modal: modalSlice,
    reactions: reactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
