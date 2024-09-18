import { BookTicketData, GetTicketData, LoginDriverData, LoginUserData, RegisterUserData, UpdatTicketData } from "../interfaces";
import { constant } from "../configs/constant.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { envConfig } from "../configs/env.config";
import ApiClient from "../utils/axios.util";
import axios from "axios";

const { dev } = envConfig;
const { devURL, liveURL } = constant;
const rootUrl = dev ? devURL : liveURL;

const api = new ApiClient();

export const loginUser = createAsyncThunk(
  "userlogin/login",
  async (loginData: LoginUserData) => {
    try {
      const { matricNo, password } = loginData;
      const resp = await axios.post(`${rootUrl}/api/v1/users/login`, {
        matricNo,
        password,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const loginDriver = createAsyncThunk(
  "userlogin/loginDriver",
  async (loginData: LoginDriverData) => {
    try {
      const { email, password } = loginData;
      const resp = await axios.post(`${rootUrl}/api/v1/users/login/driver`, {
        email,
        password,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "userlogin/registerUser",
  async (registerData: RegisterUserData) => {
    try {
      const { email, password, firstName, lastName, matricNo, phone } =
        registerData;
      const resp = await axios.post(`${rootUrl}/api/v1/users/register`, {
        email,
        password,
        firstName,
        lastName,
        matricNo,
        phone,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const bookTicket = createAsyncThunk(
  "bookTicket",
  async (bookTicket: BookTicketData) => {
    try {
      const { from, to, seat, amount } = bookTicket;

      const resp = await api.post(`/api/v1/tickets/books`, {
        from,
        to,
        seat,
        amount,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const verifyTicket = createAsyncThunk(
  "verifyTicket",
  async (id: string) => {
    try {
      const resp = await api.post(`/api/v1/tickets/books/verify`, {
        id,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const updateTicket = createAsyncThunk(
  "updateTicket",
  async (UpdateData: UpdatTicketData) => {
    try {
      const { tx_ref, transaction_id } = UpdateData;

      const resp = await api.post(`/api/v1/tickets/books/update`, {
        tx_ref,
        transaction_id,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const cancelTicket = createAsyncThunk(
  "cancelTicket",
  async (id: string) => {
    try {
      const resp = await api.post(`/api/v1/tickets/books/cancelled`, {
        id,
      });

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const getAllUserTickets = createAsyncThunk(
  "getUsersTicket",
  async (data: GetTicketData) => {
    const { limit, page } = data;

    try {
      const resp = await api.get(
        `/api/v1/tickets/books?limit=${limit}&page=${page}`
      );

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);

export const getSingleTicket = createAsyncThunk(
  "getSingleTicket",
  async (id: string) => {
    try {
      const resp = await api.get(`/api/v1/tickets/books/:${id}`);

      const data = resp.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);
