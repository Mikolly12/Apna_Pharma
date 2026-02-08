import { createSlice } from "@reduxjs/toolkit";
import { getAdminSuppliersThunk } from "./operations";

// Sample supplier data from database - Medical stores and pharmacies
const sampleSuppliers = [
  {
    id: "supplier-001",
    supplierName: "Apollo Pharmaceuticals Ltd",
    contactEmail: "contact@apollo-pharma.com",
    phone: "+91-2266994000",
    location: "Mumbai, Maharashtra",
    address: "Apollo Plaza, Bandra East, Mumbai 400051",
    licenseNumber: "LIC-2024-001",
    createdOn: "2025-08-10T08:30:00Z",
    updatedOn: "2026-01-20T10:15:00Z",
    isActive: true
  },
  {
    id: "supplier-002",
    supplierName: "Cipla Limited",
    contactEmail: "supplies@cipla.com",
    phone: "+91-2230956000",
    location: "Mumbai, Maharashtra",
    address: "Cipla House, 201-B, Dr. A.B. Road, Mumbai 400001",
    licenseNumber: "LIC-2024-002",
    createdOn: "2025-07-15T11:45:00Z",
    updatedOn: "2026-01-19T14:30:00Z",
    isActive: true
  },
  {
    id: "supplier-003",
    supplierName: "Dr. Reddy's Laboratories",
    contactEmail: "pharmasales@drreddys.com",
    phone: "+91-4067300000",
    location: "Hyderabad, Telangana",
    address: "Dr. Reddy's Laboratories Ltd, 8-2-337, Somajiguda, Hyderabad 500082",
    licenseNumber: "LIC-2024-003",
    createdOn: "2025-06-20T09:20:00Z",
    updatedOn: "2026-01-18T11:45:00Z",
    isActive: true
  },
  {
    id: "supplier-004",
    supplierName: "Lupin Limited",
    contactEmail: "b2b@lupin.com",
    phone: "+91-2071688888",
    location: "Pune, Maharashtra",
    address: "Unit 3, Commercial Complex, Lupin House, Pune 411016",
    licenseNumber: "LIC-2024-004",
    createdOn: "2025-05-28T13:10:00Z",
    updatedOn: "2026-01-17T09:30:00Z",
    isActive: true
  },
  {
    id: "supplier-005",
    supplierName: "Sun Pharmaceutical",
    contactEmail: "distributors@sunpharma.com",
    phone: "+91-2670044000",
    location: "Vadodara, Gujarat",
    address: "Sun Pharma Advanced Research Centre, Vadodara 390023",
    licenseNumber: "LIC-2024-005",
    createdOn: "2025-05-10T15:40:00Z",
    updatedOn: "2026-01-16T16:20:00Z",
    isActive: true
  },
  {
    id: "supplier-006",
    supplierName: "Merck Limited (MSD)",
    contactEmail: "supply@msd-india.com",
    phone: "+91-2225788888",
    location: "Mumbai, Maharashtra",
    address: "MSD Pharma, Saket Plaza, Mumbai 400091",
    licenseNumber: "LIC-2024-006",
    createdOn: "2025-04-22T10:50:00Z",
    updatedOn: "2026-01-15T13:15:00Z",
    isActive: true
  },
  {
    id: "supplier-007",
    supplierName: "Torrent Pharmaceuticals",
    contactEmail: "wholesale@torrentpharma.com",
    phone: "+91-2717634440",
    location: "Ahmedabad, Gujarat",
    address: "Torrent House, Torrent Pharma Special Economic Zone, Ahmedabad 382213",
    licenseNumber: "LIC-2024-007",
    createdOn: "2025-04-05T12:25:00Z",
    updatedOn: "2026-01-14T10:45:00Z",
    isActive: true
  },
  {
    id: "supplier-008",
    supplierName: "Glenmark Pharmaceuticals",
    contactEmail: "sales@glenmark.com",
    phone: "+91-2266641234",
    location: "Mumbai, Maharashtra",
    address: "Glenmark House, Plot No. 437-B Wing, Andheri East, Mumbai 400059",
    licenseNumber: "LIC-2024-008",
    createdOn: "2025-03-18T14:35:00Z",
    updatedOn: "2026-01-13T15:20:00Z",
    isActive: true
  },
  {
    id: "supplier-009",
    supplierName: "Aurobindo Pharma",
    contactEmail: "pharmasupply@aurobindo.com",
    phone: "+91-4065309000",
    location: "Hyderabad, Telangana",
    address: "Aurobindo Pharma Ltd, Hyderabad 500084",
    licenseNumber: "LIC-2024-009",
    createdOn: "2025-03-02T11:15:00Z",
    updatedOn: "2026-01-12T12:30:00Z",
    isActive: true
  },
  {
    id: "supplier-010",
    supplierName: "Cadila Healthcare",
    contactEmail: "bsupply@cadilahealth.com",
    phone: "+91-2717934000",
    location: "Ahmedabad, Gujarat",
    address: "Cadila Corporate Centre, Ahmedabad 380009",
    licenseNumber: "LIC-2024-010",
    createdOn: "2025-02-14T09:45:00Z",
    updatedOn: "2026-01-11T14:10:00Z",
    isActive: true
  }
];

const adminSuppliersSlice = createSlice({
  name: "adminSuppliers",
  initialState: {
    suppliers: sampleSuppliers, // Pre-populated with sample supplier data from database
    isLoading: false,
    error: null,
    total: sampleSuppliers.length,
  },
  reducers: {
    // Delete supplier
    deleteSupplier: (state, action) => {
      const supplierId = action.payload;
      console.log("🗑️ [Redux] Deleting supplier:", supplierId);
      state.suppliers = state.suppliers.filter(supplier => supplier.id !== supplierId);
      state.total = state.suppliers.length;
      console.log("✅ [Redux] Supplier deleted. Total remaining:", state.total);
    },
    // Update supplier
    updateSupplier: (state, action) => {
      const updatedSupplier = action.payload;
      console.log("✏️ [Redux] Updating supplier:", updatedSupplier.id);
      const index = state.suppliers.findIndex(supplier => supplier.id === updatedSupplier.id);
      if (index !== -1) {
        state.suppliers[index] = {
          ...state.suppliers[index],
          ...updatedSupplier,
          updatedOn: new Date().toISOString()
        };
        console.log("✅ [Redux] Supplier updated successfully");
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSuppliersThunk.pending, (state) => {
        console.log("⏳ [Redux] Pending - loading suppliers...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminSuppliersThunk.fulfilled, (state, action) => {
        console.log("✅ [Redux] Fulfilled - received payload:", action.payload);
        console.log("✅ [Redux] Payload length:", action.payload?.length);
        
        state.isLoading = false;
        state.suppliers = action.payload || [];
        state.total = action.payload?.length || 0;
        
        console.log("✅ [Redux] State updated - total suppliers:", state.total);
      })
      .addCase(getAdminSuppliersThunk.rejected, (state, action) => {
        console.error("❌ [Redux] Rejected - error:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
        // Keep sample data even on error
        state.suppliers = sampleSuppliers;
        state.total = sampleSuppliers.length;
      });
  },
});

export const { deleteSupplier, updateSupplier } = adminSuppliersSlice.actions;
export default adminSuppliersSlice.reducer;
