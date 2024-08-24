import { authSlice } from "@/redux/slices/authSlice";
import { messageSlice } from "@/redux/slices/errorModalSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    messageModal: messageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
