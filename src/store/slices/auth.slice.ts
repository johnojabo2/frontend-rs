import { loginDriver, loginUser, registerUser } from "../actions";
import { AuthSliceData } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isLoading: false,
    error: null,
    success: false,
    successReg: false,
    message: null,
    userData: {},
    status: null,
    messageReg: null,
    statusReg: null,
  } as AuthSliceData,
  reducers: {
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    resetRegMsgStatus: (state) => {
      state.messageReg = null;
      state.statusReg = null;
    },
    resetAuthMsgStatus: (state) => {
      state.message = null;
      state.status = null;
    },
    resetData: (state) => {
      state.isAuth = false;
      state.userData = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.isLoading = false;
        state.success = true;
        state.message = payload.message;
        state.status = payload.code;
        state.userData = payload.data;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuth = false;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isAuth = false;
        state.isLoading = false;
        state.error = error;
        state.status = +(statusCode as string);
        state.message = errorMsg as string;
      })
      .addCase(loginDriver.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.isLoading = false;
        state.success = true;
        state.message = payload.message;
        state.status = payload.code;
        state.userData = payload.data;
      })
      .addCase(loginDriver.pending, (state) => {
        state.isAuth = false;
        state.isLoading = true;
      })
      .addCase(loginDriver.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isAuth = false;
        state.isLoading = false;
        state.error = error;
        state.status = +(statusCode as string);
        state.message = errorMsg as string;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isAuth = false;
        state.isLoading = false;
        state.successReg = true;
        state.messageReg = payload.message;
        state.statusReg = payload.code;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuth = false;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isAuth = false;
        state.isLoading = false;
        state.error = error;
        state.statusReg = +(statusCode as string);
        state.messageReg = errorMsg as string;
      });
  },
});

export const { setUserData, resetData, resetRegMsgStatus, resetAuthMsgStatus } = authSlice.actions;
export default authSlice.reducer;
