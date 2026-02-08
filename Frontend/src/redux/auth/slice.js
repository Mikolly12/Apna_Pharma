import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getUserInfoThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
    phone: "",
  },
  token: "",
  isLoggedIn: false,
  isLoading: false,
  isRefresh: false,
  error: null,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = "";
        state.user = {
          name: "",
          email: "",
          phone: "",
        };
      })
      .addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // API returns user data directly, not wrapped in {user: ...}
        state.user = payload;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          getUserInfoThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          logoutThunk.rejected,
          getUserInfoThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const authReducer = slice.reducer;
