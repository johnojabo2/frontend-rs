import { GeneralSliceData } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    showModal: false,
    isPDFViewLoading: true,
    showPrintOut: false, 
    isLoading: false,
    hasError: false,
    pageNum: 1,
    filterPgNum: 1,
    loadSearchData: false,
    hasMore: true,
    isNext: false,    
    selectedOpt: "",
    ticketId: null,
  } as GeneralSliceData,
  reducers: {
    showTicketModal: (state, {payload}:{payload: boolean}) => {
      state.showModal = payload;
    },
    showPrintoutModal: (state, {payload}:{payload: boolean}) => {
      state.showPrintOut = payload;
    },
    setIsPDFViewLoading: (state, {payload}:{payload: boolean}) => {
      state.isPDFViewLoading = payload;
    },
    setIsLoading: (state, { payload }: { payload: boolean }) => {
      state.isLoading = payload;
    },
    setHasError: (state, { payload }: { payload: boolean }) => {
      state.hasError = payload;
    },
    setPageNum: (state) => {
      state.pageNum = state.pageNum + 1
    },
    setLoadSearchData: (state, {payload}: { payload: boolean }) => {
      state.loadSearchData = payload;
    },
    setHasMore: (state, {payload}: { payload: boolean }) => {
      state.hasMore = payload;
    },
    setFilterPgNum: (state) => {
      state.filterPgNum += 1;
    },
    setIsNext: (state, {payload}: { payload: boolean }) => {
      state.isNext = payload;
    },
    setSelectedOpt: (state, {payload}:{payload: string}) => {
      state.selectedOpt = payload
    },
    setTicketId: (state, { payload }:{ payload: string }) => {
      state.ticketId = payload;
    }
  },
});

export const {
  showTicketModal,
  showPrintoutModal,
  setIsPDFViewLoading,
  setIsLoading,
  setHasError,
  setPageNum,
  setLoadSearchData,
  setHasMore,
  setFilterPgNum,
  setIsNext,
  setSelectedOpt,
  setTicketId,
} = generalSlice.actions;
export default generalSlice.reducer;
