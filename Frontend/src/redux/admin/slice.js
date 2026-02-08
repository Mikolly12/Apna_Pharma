import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAdminInfoThunk,
  adminLoginThunk,
  adminLogoutThunk,
} from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
    _id: "",
  },
  token: "",
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(adminLogoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = "";
        state.user = {
          name: "",
          email: "",
          _id: "",
        };
      })
      .addCase(getAdminInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addMatcher(
        isAnyOf(
          adminLoginThunk.pending,
          adminLogoutThunk.pending,
          getAdminInfoThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          adminLoginThunk.rejected,
          adminLogoutThunk.rejected,
          getAdminInfoThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const adminAuthReducer = adminSlice.reducer;
