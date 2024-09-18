import { SerializedError } from "@reduxjs/toolkit";
import store, { rootReducer } from "./store/store";

export interface BackDropProps {
  children: JSX.Element;
}

// Infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;

// Infer the `RootReducer` type from the rootReducer defined above
export type RootReducer = typeof rootReducer;

export type data = {
  link: string;
  title: string;
  State: string;
  LGA: string;
  views: number;
  date: string;
  id: string;
  actor: string;
};

export interface DummyDataType {
  [key: string]: data[];
}

export interface SelectedFileType {
  file: File | null;
  isUploaded: boolean;
}

export interface IEnvConfig {
  dev: boolean;
  prod: boolean;
  test: boolean;
}

export interface OptionType {
  label: string;
  value: string;
}

export interface LoadingBtnProps {
  title: string;
  styles: any;
}

export interface IDummyTableData {
  id: number;
  icon: JSX.Element | null;
  name: string;
  date: string;
  type: string;
  size: string;
  username: string;
}

export interface LoginDriverData {
  email: string;
  password: string;
}

export interface LoginUserData {
  matricNo: string;
  password: string;
}

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  matricNo: string;
  phone: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface TicketUserData {
  id: string;
  firstName: string;
  lastName: string;
  matricNo: string;
  email: string;
  phone: string;
  role: "User" | "Driver";
  createAt: string;
}

export interface TicketData {
  id: string;
  slug: string;
  from: string;
  to: string;
  seat: number;
  price: string;
  amount: string;
  status: "Cancelled" | "Active" | "Refunded" | "Paid" | "Used";
  date: string;
  isPaymentMade: boolean;
  currency: string;
  trans_id: string | null;
  payment_type: string | null;
  callbackUrl: string;
  userId: string;
  driverId: string;
  user: TicketUserData;
}

export interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  matricNo: string;
  phone: string;
}

export interface BookTicketData {
  from: string;
  to: string;
  seat: string;
  amount: string;
}

export interface UpdatTicketData {
  tx_ref: string;
  transaction_id: string;
}

export interface GetTicketData {
  limit: number;
  page: number;
}

export interface AuthSliceData {
  isAuth: boolean;
  isLoading: boolean;
  error: SerializedError | null;
  success: boolean;
  successReg: boolean;
  message: string | null;
  status: number | null;
  messageReg: string | null;
  statusReg: number | null;
  userData: UserData | null;
}

export interface GeneralSliceData {
  showModal: boolean;
  isPDFViewLoading: boolean;
  showPrintOut: boolean;
  isLoading: boolean;
  hasError: boolean;
  pageNum: number;
  filterPgNum: number;
  loadSearchData: boolean;
  hasMore: boolean;
  isNext: boolean;
  selectedOpt: string;
  ticketId: string | null;
}

export interface TicketSliceData {
  isLoading: boolean;
  error: SerializedError | null;
  errorCan: SerializedError | null;
  errorVer: SerializedError | null;
  errorUpd: SerializedError | null;
  success: boolean;
  successUpd: boolean;
  successCan: boolean;
  messageBook: string | null;
  statusBook: number | null;
  messageVerify: string | null;
  statusVerify: number | null;
  messageUpdate: string | null;
  statusUpdate: number | null;
  messageCancel: string | null;
  statusCancel: number | null;
  message: string | null;
  status: number | null;
  totalPages: number;
  ticketData: TicketData | null;
  ticketArrData: TicketData[] | null;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
