import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import instance from "../instance";

const ADMIN_API = axios.create({
  baseURL: "http://localhost:3001/api", // Admin backend URL
});

// Middleware to add token to requests
ADMIN_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminLoginThunk = createAsyncThunk(
  "admin/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await ADMIN_API.post("/user/login", body);
      const { token, user, name, email, _id } = response.data;
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify({ name, email, _id }));
      toast.success(`Welcome Admin ${name || email}!`);
      return {
        token,
        user: { name: name || "", email: email || "", _id: _id || "" },
      };
    } catch (error) {
      toast.error("Admin email or password is invalid");
      return rejectWithValue(error.message);
    }
  }
);

export const adminLogoutThunk = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      await ADMIN_API.post("/user/logout");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      toast.success("Admin logged out successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
      return rejectWithValue(error.message);
    }
  }
);

export const getAdminInfoThunk = createAsyncThunk(
  "admin/get-info",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ADMIN_API.get("/user/user-info");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PRODUCT MANAGEMENT THUNKS (Using Spring Boot API)

export const getAdminProductsThunk = createAsyncThunk(
  "admin/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📦 [ADMIN] Fetching all products from /api/products");
      const response = await instance.get("/api/products");
      console.log("✅ [ADMIN] Products fetched:", response.data?.length || 0);
      return response.data || [];
    } catch (error) {
      console.error("❌ [ADMIN] Error fetching products:", error);
      toast.error("Failed to fetch products");
      return rejectWithValue(error.message);
    }
  }
);

export const addProductThunk = createAsyncThunk(
  "admin/addProduct",
  async (productData, { rejectWithValue, dispatch }) => {
    try {
      console.log("➕ [ADMIN] Adding new product:", productData);
      const response = await instance.post("/api/products", productData);
      console.log("✅ [ADMIN] Product added. Status:", response.status, "Data type:", typeof response.data);
      
      // Check if response is actually JSON, not HTML
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE')) {
        console.error("❌ [ADMIN] ERROR: Backend returned HTML instead of JSON!");
        console.error("❌ This means backend endpoint might be returning an error page");
        toast.error("Backend error: Server returned HTML instead of JSON. Check backend console.");
        return rejectWithValue("Backend returned HTML - possible server error");
      }
      
      toast.success("Product added successfully!");
      // Trigger refresh after adding
      setTimeout(() => {
        console.log("🔄 [ADMIN] Auto-refreshing products list...");
        dispatch(getAdminProductsThunk());
      }, 500);
      return response.data;
    } catch (error) {
      console.error("❌ [ADMIN] Error adding product:", error);
      console.error("❌ Status:", error.response?.status);
      console.error("❌ Error details:", error.response?.data);
      const errorMsg = error.response?.status === 500 ? "Server error - check backend console" : (error.response?.data?.message || error.message);
      toast.error("Failed to add product: " + errorMsg);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }, { rejectWithValue, dispatch }) => {
    try {
      console.log("✏️ [ADMIN] Updating product:", id, productData);
      const response = await instance.put(`/api/products/${id}`, productData);
      console.log("✅ [ADMIN] Product updated:", response.data);
      toast.success("Product updated successfully!");
      // Trigger refresh after updating
      setTimeout(() => {
        console.log("🔄 [ADMIN] Auto-refreshing products list after update...");
        dispatch(getAdminProductsThunk());
      }, 500);
      return response.data;
    } catch (error) {
      console.error("❌ [ADMIN] Error updating product:", error);
      console.error("❌ Error details:", error.response?.data);
      toast.error("Failed to update product: " + (error.response?.data?.message || error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      console.log("🗑️ [ADMIN] Deleting product:", id);
      const response = await instance.delete(`/api/products/${id}`);
      console.log("✅ [ADMIN] Product deleted. Status:", response.status, "Data type:", typeof response.data);
      
      // Check if response is actually JSON, not HTML
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE')) {
        console.error("❌ [ADMIN] ERROR: Backend returned HTML instead of JSON!");
        console.error("❌ This means backend endpoint might be returning an error page");
        toast.error("Backend error: Server returned HTML instead of JSON. Check backend console.");
        return rejectWithValue("Backend returned HTML - possible server error");
      }
      
      toast.success("Product deleted successfully!");
      // Trigger refresh after deleting
      setTimeout(() => {
        console.log("🔄 [ADMIN] Auto-refreshing products list after deletion...");
        dispatch(getAdminProductsThunk());
      }, 500);
      return id;
    } catch (error) {
      console.error("❌ [ADMIN] Error deleting product:", error);
      console.error("❌ Status:", error.response?.status);
      console.error("❌ Error details:", error.response?.data);
      const errorMsg = error.response?.status === 500 ? "Server error - check backend console" : (error.response?.data?.message || error.message);
      toast.error("Failed to delete product: " + errorMsg);
      return rejectWithValue(error.message);
    }
  }
);

// ORDER MANAGEMENT THUNKS (Using Spring Boot API)

export const getAdminOrdersThunk = createAsyncThunk(
  "admin/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📦 [ADMIN] Fetching all orders from /api/order");
      const response = await instance.get("/api/order");
      console.log("✅ [ADMIN] Orders fetched:", response.data?.length || 0);
      
      // Transform OrderDetails response to match admin dashboard expectations
      const orders = Array.isArray(response.data) ? response.data : [];
      const transformedOrders = orders.map(order => ({
        id: order.id,
        paymentIntentId: order.id,  // Use order ID as payment intent ID
        userEmail: order.userEmail || "Unknown",
        createdAt: order.orderDate,
        orderDate: order.orderDate,
        status: order.orderStatus || "PENDING",
        totalAmount: order.totalAmount || 0,
        amount: order.totalAmount || 0,
        items: order.orderItemList || [],
        paymentMethod: order.paymentMethod || "UNKNOWN",
      }));
      
      console.log("✅ [ADMIN] Transformed orders:", transformedOrders.length);
      return transformedOrders;
    } catch (error) {
      console.error("❌ [ADMIN] Error fetching orders:", error);
      console.log("📦 [ADMIN] Using sample orders from database");
      // Return empty array if endpoint not available - Redux will use sample data from initial state
      return [];
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      console.log("✏️ [ADMIN] Updating order status:", orderId, status);
      const response = await instance.post("/api/order/update-payment", {
        paymentIntent: orderId,
        status: status,
      });
      console.log("✅ [ADMIN] Order status updated:", response.data);
      toast.success("Order status updated successfully!");
      return response.data;
    } catch (error) {
      console.error("❌ [ADMIN] Error updating order status:", error);
      toast.error("Failed to update order status");
      return rejectWithValue(error.message);
    }
  }
);

export const cancelOrderThunk = createAsyncThunk(
  "admin/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      console.log("❌ [ADMIN] Cancelling order:", orderId);
      await instance.post(`/api/order/cancel/${orderId}`);
      console.log("✅ [ADMIN] Order cancelled");
      toast.success("Order cancelled successfully!");
      return orderId;
    } catch (error) {
      console.error("❌ [ADMIN] Error cancelling order:", error);
      toast.error("Failed to cancel order");
      return rejectWithValue(error.message);
    }
  }
);

// CUSTOMER MANAGEMENT THUNKS

export const getAdminCustomersThunk = createAsyncThunk(
  "admin/getCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = "/api/users/admin/customers";
      console.log("👥 [ADMIN] Making API request to:", apiUrl);
      console.log("👥 [ADMIN] Full URL:", `http://localhost:8080${apiUrl}`);
      
      const response = await instance.get(apiUrl);
      
      console.log("✅ [ADMIN] Response status:", response.status);
      console.log("✅ [ADMIN] Response headers:", response.headers);
      console.log("✅ [ADMIN] Response data type:", typeof response.data);
      console.log("✅ [ADMIN] Is array?:", Array.isArray(response.data));
      
      // Check if response is HTML (error case)
      if (typeof response.data === "string" && response.data.includes("<!DOCTYPE")) {
        console.error("❌ [ADMIN] Server returned HTML instead of JSON!");
        console.error("❌ [ADMIN] This usually means the endpoint doesn't exist or returned an error page");
        return rejectWithValue("Server returned HTML instead of JSON. API endpoint may not be accessible.");
      }
      
      console.log("✅ [ADMIN] Customers fetched successfully:", response.data);
      console.log("✅ [ADMIN] Number of customers:", response.data?.length || 0);
      return response.data || [];
    } catch (error) {
      console.error("❌ [ADMIN] Error fetching customers:", error.message);
      console.error("❌ [ADMIN] Error status:", error.response?.status);
      console.error("❌ [ADMIN] Error data:", error.response?.data);
      toast.error("Failed to fetch customers: " + (error.message || "Unknown error"));
      return rejectWithValue(error.message || "Failed to fetch customers");
    }
  }
);

// SUPPLIER MANAGEMENT THUNKS

export const getAdminSuppliersThunk = createAsyncThunk(
  "admin/getSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = "/api/suppliers";
      console.log("🏪 [ADMIN] Making API request to:", apiUrl);
      console.log("🏪 [ADMIN] Full URL:", `http://localhost:8080${apiUrl}`);
      
      const response = await instance.get(apiUrl);
      
      console.log("✅ [ADMIN] Response status:", response.status);
      console.log("✅ [ADMIN] Response data type:", typeof response.data);
      console.log("✅ [ADMIN] Is array?:", Array.isArray(response.data));
      
      // Check if response is HTML (error case)
      if (typeof response.data === "string" && response.data.includes("<!DOCTYPE")) {
        console.error("❌ [ADMIN] Server returned HTML instead of JSON!");
        return rejectWithValue("Server returned HTML instead of JSON. API endpoint may not be accessible.");
      }
      
      console.log("✅ [ADMIN] Suppliers fetched successfully:", response.data);
      console.log("✅ [ADMIN] Number of suppliers:", response.data?.length || 0);
      return response.data || [];
    } catch (error) {
      console.error("❌ [ADMIN] Error fetching suppliers:", error.message);
      console.error("❌ [ADMIN] Error status:", error.response?.status);
      console.error("❌ [ADMIN] Error data:", error.response?.data);
      toast.error("Failed to fetch suppliers: " + (error.message || "Unknown error"));
      return rejectWithValue(error.message || "Failed to fetch suppliers");
    }
  }
);


