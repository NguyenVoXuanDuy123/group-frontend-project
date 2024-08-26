import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastType = 'success' | 'error';

interface Toast {
  message: string;
  type: ToastType;
}

interface ToastState {
  currentToast: Toast | null;
}

const initialState: ToastState = {
  currentToast: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<Toast>) => {
      state.currentToast = action.payload;
    },
    clearToast: (state) => {
      state.currentToast = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
