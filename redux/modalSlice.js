import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
  logInModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
    openLogInModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeLogInModal: (state) => {
      state.signUpModalOpen = false;
    },
  },
});

export const { openSignUpModal, closeSignUpModal, openLogInModal, closeLogInModal } = modalSlice.actions;

export default modalSlice.reducer;
