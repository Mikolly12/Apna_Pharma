import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addToCart,
  cartCheckout,
  decreaseQuantity,
  deleteFromCart,
  getAllStores,
  getCartItems,
  getCustomerReviews,
  getNearestStores,
  getProductById,
  getSearchProducts,
  updateCart,
} from "./operations";

const initialState = {
  stores: [],
  nearestStores: [],
  reviews: [],
  products: [],
  product: null,
  cart: { cartProducts: [], total: 0 },
  currentPage: 1,
  totalPages: null,
  totalProducts: null,
  isLoading: false,
  error: null,
};

export const slice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.reviews = payload;
      })
      .addCase(getNearestStores.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.nearestStores = payload;
      })
      .addCase(getAllStores.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stores = payload;
      })
      .addCase(getSearchProducts.fulfilled, (state, { payload }) => {
        console.log("📝 [SLICE] getSearchProducts.fulfilled - Storing", payload?.length || 0, "products in Redux state");
        state.isLoading = false;
        state.products = Array.isArray(payload) ? payload : [];
        console.log("📝 [SLICE] State.products is now:", state.products.length, "items");
      })
      .addCase(getProductById.fulfilled, (state, { action }) => {
        state.selectedProduct = action.payload;
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Ensure payload is valid cart object
        if (payload && typeof payload === 'object' && payload.cartProducts && Array.isArray(payload.cartProducts)) {
          state.cart = payload;
        } else {
          console.error("❌ Invalid payload in getCartItems.fulfilled:", payload);
          state.cart = { cartProducts: [], total: 0 };
        }
      })
      .addCase(updateCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Ensure payload is valid cart object
        if (payload && typeof payload === 'object' && payload.cartProducts && Array.isArray(payload.cartProducts)) {
          state.cart = payload;
        } else {
          console.error("❌ Invalid payload in updateCart.fulfilled:", payload);
          state.cart = { cartProducts: [], total: 0 };
        }
      })
      .addCase(cartCheckout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Clear cart after successful order
        state.cart = { cartProducts: [], total: 0 };
      })
      .addCase(deleteFromCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Ensure payload is valid cart object, not HTML
        if (payload && typeof payload === 'object' && payload.cartProducts && Array.isArray(payload.cartProducts)) {
          state.cart = payload;
        } else {
          console.error("❌ Invalid payload in deleteFromCart.fulfilled:", payload);
          state.cart = { cartProducts: [], total: 0 };
        }
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Ensure payload is valid cart object
        if (payload && typeof payload === 'object' && payload.cartProducts && Array.isArray(payload.cartProducts)) {
          state.cart = payload;
        } else {
          console.error("❌ Invalid payload in addToCart.fulfilled:", payload);
          state.cart = { cartProducts: [], total: 0 };
        }
      })
      .addCase(decreaseQuantity.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Ensure payload is valid cart object
        if (payload && typeof payload === 'object' && payload.cartProducts && Array.isArray(payload.cartProducts)) {
          state.cart = payload;
        } else {
          console.error("❌ Invalid payload in decreaseQuantity.fulfilled:", payload);
          state.cart = { cartProducts: [], total: 0 };
        }
      })
      .addMatcher(
        isAnyOf(
          getCustomerReviews.pending,
          getNearestStores.pending,
          getAllStores.pending,
          getSearchProducts.pending,
          getProductById.pending,
          getCartItems.pending,
          updateCart.pending,
          cartCheckout.pending,
          deleteFromCart.pending,
          addToCart.pending,
          decreaseQuantity.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getCustomerReviews.rejected,
          getNearestStores.rejected,
          getAllStores.rejected,
          getSearchProducts.rejected,
          getProductById.rejected,
          getCartItems.rejected,
          updateCart.rejected,
          cartCheckout.rejected,
          deleteFromCart.rejected,
          addToCart.rejected,
          decreaseQuantity.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const { setCurrentPage } = slice.actions;

export const pharmacyReducer = slice.reducer;
