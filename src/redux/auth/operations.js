import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance, { setToken, clearToken } from "../instance";

// 🔹 LOGIN THUNK (existing)
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const payload = {
        userName: body.email,
        password: body.password,
      };

      const response = await instance.post("/api/auth/login", payload);

      setToken(response.data.token);
      localStorage.setItem("accessToken", response.data.token);

      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      toast.error("Email or password is invalid");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 LOGOUT THUNK (existing)
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      clearToken();
      localStorage.removeItem("accessToken");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 REGISTER THUNK (NEW)
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      // 🔹 Use body as-is, frontend already sends firstName, lastName, phoneNumber
      const payload = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: body.password,
      };

      const response = await instance.post("/api/auth/register", payload);

      if (response.data.code === 200) {
        toast.success("Registration successful!");
      } else {
        toast.error(response.data.message || "Registration failed!");
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// 🔹 GET USER INFO THUNK (NEW)
export const getUserInfoThunk = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📡 Fetching user info from /api/users/me");
      const response = await instance.get(`/api/users/me`);
      console.log("✅ User info received:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch user info:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 UPDATE USER INFO THUNK (NEW)
export const updateUserInfoThunk = createAsyncThunk(
  "auth/updateUserInfo",
  async (body, { rejectWithValue }) => {
    try {
      const payload = {
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
      };
      const response = await instance.put(`/api/users/update`, payload);
      toast.success("Profile updated successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to update profile");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 VERIFY EMAIL THUNK (NEW)
export const verifyEmailThunk = createAsyncThunk(
  "auth/verifyEmail",
  async (body, { rejectWithValue }) => {
    try {
      // ✅ Match backend endpoint - uses userName and code
      const payload = {
        userName: body.email,
        code: body.verificationCode,
      };

      const response = await instance.post("/api/auth/verify", payload);

      if (response.status === 200) {
        return { code: 200, message: "Email verified successfully" };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Verification code is incorrect or expired!";
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 RESEND VERIFICATION CODE THUNK (NEW)
export const resendVerificationCodeThunk = createAsyncThunk(
  "auth/resendVerificationCode",
  async (body, { rejectWithValue }) => {
    try {
      const payload = {
        email: body.email,
      };

      const response = await instance.post("/api/auth/resend-verification-code", payload);

      if (response.data.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "Failed to resend code!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to resend verification code!";
      return rejectWithValue(errorMessage);
    }
  }
);
