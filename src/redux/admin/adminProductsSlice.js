import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminProductsThunk,
  addProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "./operations";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET PRODUCTS
      .addCase(getAdminProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminProductsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = Array.isArray(payload) ? payload : [];
        console.log("📦 [SLICE] Admin products updated:", state.products.length);
      })
      .addCase(getAdminProductsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // ADD PRODUCT
      .addCase(addProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products.push(payload);
      })
      .addCase(addProductThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // UPDATE PRODUCT
      .addCase(updateProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.products.findIndex((p) => p.id === payload.id);
        if (index !== -1) {
          state.products[index] = payload;
        }
      })
      .addCase(updateProductThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // DELETE PRODUCT
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p.id !== payload);
      })
      .addCase(deleteProductThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const adminProductsReducer = adminProductsSlice.reducer;
