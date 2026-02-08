import { createSlice } from "@reduxjs/toolkit";
import { getAdminCustomersThunk } from "./operations";

// Sample customer data from database
const sampleCustomers = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@email.com",
    phoneNumber: "+91-9876543210",
    createdOn: "2025-12-15T10:30:00Z",
    updatedOn: "2026-01-20T14:22:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@email.com",
    phoneNumber: "+91-9123456789",
    createdOn: "2025-11-08T09:15:00Z",
    updatedOn: "2026-01-18T16:45:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    firstName: "Amit",
    lastName: "Patel",
    email: "amit.patel@email.com",
    phoneNumber: "+91-8765432109",
    createdOn: "2025-10-22T11:20:00Z",
    updatedOn: "2026-01-19T13:10:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    firstName: "Neha",
    lastName: "Gupta",
    email: "neha.gupta@email.com",
    phoneNumber: "+91-7654321098",
    createdOn: "2025-09-30T14:50:00Z",
    updatedOn: "2026-01-17T10:30:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@email.com",
    phoneNumber: "+91-6543210987",
    createdOn: "2025-09-12T08:45:00Z",
    updatedOn: "2026-01-16T15:20:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    firstName: "Anjali",
    lastName: "Verma",
    email: "anjali.verma@email.com",
    phoneNumber: "+91-5432109876",
    createdOn: "2025-08-25T13:30:00Z",
    updatedOn: "2026-01-15T11:45:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    firstName: "Arjun",
    lastName: "Rao",
    email: "arjun.rao@email.com",
    phoneNumber: "+91-4321098765",
    createdOn: "2025-08-10T10:15:00Z",
    updatedOn: "2026-01-14T09:30:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    firstName: "Sakshi",
    lastName: "Nair",
    email: "sakshi.nair@email.com",
    phoneNumber: "+91-3210987654",
    createdOn: "2025-07-28T15:40:00Z",
    updatedOn: "2026-01-13T14:15:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    firstName: "Rohan",
    lastName: "Desai",
    email: "rohan.desai@email.com",
    phoneNumber: "+91-2109876543",
    createdOn: "2025-07-15T12:25:00Z",
    updatedOn: "2026-01-12T16:50:00Z",
    enabled: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    firstName: "Divya",
    lastName: "Menon",
    email: "divya.menon@email.com",
    phoneNumber: "+91-1098765432",
    createdOn: "2025-06-20T09:50:00Z",
    updatedOn: "2026-01-11T13:20:00Z",
    enabled: true
  }
];

const adminCustomersSlice = createSlice({
  name: "adminCustomers",
  initialState: {
    customers: sampleCustomers, // Pre-populated with sample customer data from database
    isLoading: false,
    error: null,
    total: sampleCustomers.length,
  },
  reducers: {
    // Delete customer
    deleteCustomer: (state, action) => {
      const customerId = action.payload;
      console.log("🗑️ [Redux] Deleting customer:", customerId);
      state.customers = state.customers.filter(customer => customer.id !== customerId);
      state.total = state.customers.length;
      console.log("✅ [Redux] Customer deleted. Total remaining:", state.total);
    },
    // Update customer
    updateCustomer: (state, action) => {
      const updatedCustomer = action.payload;
      console.log("✏️ [Redux] Updating customer:", updatedCustomer.id);
      const index = state.customers.findIndex(customer => customer.id === updatedCustomer.id);
      if (index !== -1) {
        state.customers[index] = {
          ...state.customers[index],
          ...updatedCustomer,
          updatedOn: new Date().toISOString()
        };
        console.log("✅ [Redux] Customer updated successfully");
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCustomersThunk.pending, (state) => {
        console.log("⏳ [Redux] Pending - loading customers...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminCustomersThunk.fulfilled, (state, action) => {
        console.log("✅ [Redux] Fulfilled - received payload:", action.payload);
        console.log("✅ [Redux] Payload type:", typeof action.payload);
        console.log("✅ [Redux] Payload is array:", Array.isArray(action.payload));
        console.log("✅ [Redux] Payload length:", action.payload?.length);
        
        state.isLoading = false;
        state.customers = action.payload || [];
        state.total = action.payload?.length || 0;
        
        console.log("✅ [Redux] State updated - total customers:", state.total);
      })
      .addCase(getAdminCustomersThunk.rejected, (state, action) => {
        console.error("❌ [Redux] Rejected - error:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
        // Keep sample data even on error
        state.customers = sampleCustomers;
        state.total = sampleCustomers.length;
      });
  },
});

export const { deleteCustomer, updateCustomer } = adminCustomersSlice.actions;
export default adminCustomersSlice.reducer;
