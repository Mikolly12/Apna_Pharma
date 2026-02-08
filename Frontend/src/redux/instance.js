import axios from "axios";

// Configure API base URL
const BASE_URL = "http://16.171.177.144:8080";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Intercept requests to add auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("accessToken", token);
};

export const clearToken = () => {
  delete instance.defaults.headers.common.Authorization;
  localStorage.removeItem("accessToken");
};

export default instance;
