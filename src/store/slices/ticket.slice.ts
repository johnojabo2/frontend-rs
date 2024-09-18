import { bookTicket, cancelTicket, getAllUserTickets, getSingleTicket, updateTicket, verifyTicket } from "../actions";
import { TicketSliceData } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    isLoading: false,
    error: null,
    errorCan: null,
    errorVer: null,
    errorUpd: null,
    success: false,
    successUpd: false,
    successCan: false,
    message: null,
    ticketArrData: null,
    ticketData: {},
    status: null,
    messageBook: null,
    statusBook: null,
    messageVerify: null,
    statusVerify: null,
    messageUpdate: null,
    statusUpdate: null,
    messageCancel: null,
    statusCancel: null,
    totalPages: 0,
  } as TicketSliceData,
  reducers: {
    setTicketData: (state, { payload }) => {
      state.ticketData = payload;
    },
    resetCanSuccess: (state) => {
      state.successCan = false;
      state.errorCan = null;
    },
    resetMsgStatus: (state) => {
      state.message = null;
      state.status = null;
    },
    resetBookMsgStatus: (state) => {
      state.messageBook = null;
      state.statusBook = null;
    },
    resetUpdMsgStatus: (state) => {
      state.messageUpdate = null;
      state.statusUpdate = null;
    },
    resetCanMsgStatus: (state) => {
      state.messageCancel = null;
      state.statusCancel = null;
    },
    resetVerMsgStatus: (state) => {
      state.messageVerify = null;
      state.statusVerify = null;
    },
    resetTicketData: (state) => {
      state.ticketData = null;
      state.ticketArrData = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.successCan = false;
      state.successUpd = false;
      state.message = null;
      state.status = null;
      state.messageBook = null;
      state.statusBook = null;
      state.messageVerify = null;
      state.statusVerify = null;
      state.messageUpdate = null;
      state.statusUpdate = null;
      state.messageCancel = null;
      state.statusCancel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = true;
        state.messageBook = payload.message;
        state.statusBook = payload.code;
      })
      .addCase(bookTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookTicket.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.error = error;
        state.statusBook = +(statusCode as string);
        state.messageBook = errorMsg as string;
      })
      .addCase(updateTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUpd = true;
        state.messageUpdate = payload.message;
        state.statusUpdate = payload.code;
        state.ticketData = payload.data;
      })
      .addCase(updateTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTicket.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorUpd = error;
        state.statusUpdate = +(statusCode as string);
        state.messageUpdate = errorMsg as string;
      })
      .addCase(cancelTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successCan = true;
        state.messageCancel = payload.message;
        state.statusCancel = payload.code;
        state.ticketData = payload.data;
      })
      .addCase(cancelTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelTicket.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorCan = error;
        state.statusCancel = +(statusCode as string);
        state.messageCancel = errorMsg as string;
      })
      .addCase(verifyTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = true;
        state.messageVerify = payload.message;
        state.statusVerify = payload.code;
        state.ticketData = payload.data;
      })
      .addCase(verifyTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyTicket.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.errorVer = error;
        state.statusVerify = +(statusCode as string);
        state.messageVerify = errorMsg as string;
      })
      .addCase(getAllUserTickets.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = true;
        state.message = payload.message;
        state.status = payload.code;
        state.ticketArrData = payload.data;
        state.totalPages = payload.other.totalPages;
      })
      .addCase(getAllUserTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserTickets.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.error = error;
        state.status = +(statusCode as string);
        state.message = errorMsg as string;
      })
      .addCase(getSingleTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = true;
        state.message = payload.message;
        state.status = payload.code;
        state.ticketData = payload.data;
      })
      .addCase(getSingleTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTicket.rejected, (state, { error }) => {
        const statusCode = error.message?.split(":")[0];
        const errorMsg = error.message?.split(":")[1];
        state.isLoading = false;
        state.error = error;
        state.status = +(statusCode as string);
        state.message = errorMsg as string;
      });
  },
});

export const {
  setTicketData,
  resetCanSuccess,
  resetMsgStatus,
  resetTicketData,
  resetBookMsgStatus,
  resetCanMsgStatus,
  resetUpdMsgStatus,
  resetVerMsgStatus,
} = ticketSlice.actions;
export default ticketSlice.reducer;
