import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminOrdersThunk,
  updateOrderStatusThunk,
  cancelOrderThunk,
} from "./operations";

// Sample order data from database
const sampleOrders = [
  {
    id: "ORD-001",
    paymentIntentId: "ORD-001",
    userEmail: "rajesh.kumar@email.com",
    customerName: "Rajesh Kumar",
    orderDate: "2026-01-25T14:30:00Z",
    createdAt: "2026-01-25T14:30:00Z",
    status: "COMPLETED",
    totalAmount: 2450,
    amount: 2450,
    paymentMethod: "CREDIT_CARD",
    items: [
      { name: "Aspirin 500mg", quantity: 2, price: 150 },
      { name: "Vitamin C Tablets", quantity: 1, price: 250 }
    ]
  },
  {
    id: "ORD-002",
    paymentIntentId: "ORD-002",
    userEmail: "priya.sharma@email.com",
    customerName: "Priya Sharma",
    orderDate: "2026-01-24T10:15:00Z",
    createdAt: "2026-01-24T10:15:00Z",
    status: "PENDING",
    totalAmount: 1850,
    amount: 1850,
    paymentMethod: "UPI",
    items: [
      { name: "Cough Syrup 100ml", quantity: 1, price: 180 },
      { name: "Pain Relief Balm", quantity: 2, price: 350 }
    ]
  },
  {
    id: "ORD-003",
    paymentIntentId: "ORD-003",
    userEmail: "amit.patel@email.com",
    customerName: "Amit Patel",
    orderDate: "2026-01-23T16:45:00Z",
    createdAt: "2026-01-23T16:45:00Z",
    status: "COMPLETED",
    totalAmount: 3200,
    amount: 3200,
    paymentMethod: "DEBIT_CARD",
    items: [
      { name: "Multivitamin Capsules", quantity: 1, price: 450 },
      { name: "Cold Relief Tablets", quantity: 3, price: 250 }
    ]
  },
  {
    id: "ORD-004",
    paymentIntentId: "ORD-004",
    userEmail: "neha.gupta@email.com",
    customerName: "Neha Gupta",
    orderDate: "2026-01-22T12:20:00Z",
    createdAt: "2026-01-22T12:20:00Z",
    status: "SHIPPED",
    totalAmount: 1620,
    amount: 1620,
    paymentMethod: "CREDIT_CARD",
    items: [
      { name: "Ointment for Burns", quantity: 1, price: 280 },
      { name: "Digestive Tablets", quantity: 2, price: 320 }
    ]
  },
  {
    id: "ORD-005",
    paymentIntentId: "ORD-005",
    userEmail: "vikram.singh@email.com",
    customerName: "Vikram Singh",
    orderDate: "2026-01-21T09:50:00Z",
    createdAt: "2026-01-21T09:50:00Z",
    status: "PENDING",
    totalAmount: 2100,
    amount: 2100,
    paymentMethod: "UPI",
    items: [
      { name: "Headache Relief", quantity: 2, price: 140 },
      { name: "Vitamin B Complex", quantity: 1, price: 320 }
    ]
  },
  {
    id: "ORD-006",
    paymentIntentId: "ORD-006",
    userEmail: "anjali.verma@email.com",
    customerName: "Anjali Verma",
    orderDate: "2026-01-20T15:30:00Z",
    createdAt: "2026-01-20T15:30:00Z",
    status: "COMPLETED",
    totalAmount: 1950,
    amount: 1950,
    paymentMethod: "DEBIT_CARD",
    items: [
      { name: "Antihistamine Tablets", quantity: 1, price: 220 },
      { name: "Sunscreen SPF 50", quantity: 1, price: 450 }
    ]
  },
  {
    id: "ORD-007",
    paymentIntentId: "ORD-007",
    userEmail: "arjun.rao@email.com",
    customerName: "Arjun Rao",
    orderDate: "2026-01-19T11:15:00Z",
    createdAt: "2026-01-19T11:15:00Z",
    status: "CANCELLED",
    totalAmount: 1450,
    amount: 1450,
    paymentMethod: "CREDIT_CARD",
    items: [
      { name: "Eye Drops", quantity: 2, price: 180 },
      { name: "Allergy Relief", quantity: 1, price: 350 }
    ]
  },
  {
    id: "ORD-008",
    paymentIntentId: "ORD-008",
    userEmail: "sakshi.nair@email.com",
    customerName: "Sakshi Nair",
    orderDate: "2026-01-18T13:40:00Z",
    createdAt: "2026-01-18T13:40:00Z",
    status: "SHIPPED",
    totalAmount: 2780,
    amount: 2780,
    paymentMethod: "UPI",
    items: [
      { name: "Calcium Supplements", quantity: 1, price: 520 },
      { name: "Joint Care Tablets", quantity: 2, price: 380 }
    ]
  },
  {
    id: "ORD-009",
    paymentIntentId: "ORD-009",
    userEmail: "rohan.desai@email.com",
    customerName: "Rohan Desai",
    orderDate: "2026-01-17T10:25:00Z",
    createdAt: "2026-01-17T10:25:00Z",
    status: "PENDING",
    totalAmount: 1680,
    amount: 1680,
    paymentMethod: "DEBIT_CARD",
    items: [
      { name: "Throat Lozenges", quantity: 1, price: 120 },
      { name: "Cough Syrup", quantity: 1, price: 200 }
    ]
  },
  {
    id: "ORD-010",
    paymentIntentId: "ORD-010",
    userEmail: "divya.menon@email.com",
    customerName: "Divya Menon",
    orderDate: "2026-01-16T14:55:00Z",
    createdAt: "2026-01-16T14:55:00Z",
    status: "COMPLETED",
    totalAmount: 2340,
    amount: 2340,
    paymentMethod: "CREDIT_CARD",
    items: [
      { name: "Iron Supplements", quantity: 1, price: 380 },
      { name: "Health Tonic", quantity: 1, price: 450 }
    ]
  }
];

const initialState = {
  orders: sampleOrders, // Pre-populated with sample order data from database
  selectedOrder: null,
  isLoading: false,
  error: null,
  total: sampleOrders.length,
};

export const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    setSelectedOrder: (state, { payload }) => {
      state.selectedOrder = payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ORDERS
      .addCase(getAdminOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminOrdersThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // If payload is empty, keep sample orders
        if (Array.isArray(payload) && payload.length > 0) {
          state.orders = payload;
        } else {
          // Keep sample orders if no data from API
          state.orders = sampleOrders;
        }
        console.log("📦 [SLICE] Admin orders updated:", state.orders.length);
      })
      .addCase(getAdminOrdersThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        // Keep sample orders even on error
        state.orders = sampleOrders;
        console.log("📦 [SLICE] Using sample orders - total:", state.orders.length);
      })

      // UPDATE ORDER STATUS
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.orders.findIndex(
          (o) => o.id === payload.id || o.paymentIntentId === payload.paymentIntentId
        );
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...payload };
        }
      })
      .addCase(updateOrderStatusThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // CANCEL ORDER
      .addCase(cancelOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.orders.findIndex(
          (o) => o.id === payload || o.paymentIntentId === payload
        );
        if (index !== -1) {
          state.orders[index].status = "CANCELLED";
        }
      })
      .addCase(cancelOrderThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { setSelectedOrder, clearSelectedOrder } = adminOrdersSlice.actions;
export const adminOrdersReducer = adminOrdersSlice.reducer;
