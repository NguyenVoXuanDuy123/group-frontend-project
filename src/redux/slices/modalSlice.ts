import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
  openModalsCount: number;
};

const initialState: ModalState = {
  openModalsCount: 0,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.openModalsCount += 1;
    },
    closeModal: (state) => {
      state.openModalsCount = Math.max(state.openModalsCount - 1, 0);
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
