import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSuppliersThunk } from "../../../redux/admin/operations";
import { deleteSupplier, updateSupplier } from "../../../redux/admin/adminSuppliersSlice";
import { toast } from "react-toastify";
import {
  Section,
  SectionTitle,
  TableWrapper,
  Table,
} from "../AdminDashboard.styled";

const SupplierManagement = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [manualRefresh, setManualRefresh] = useState(0);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  // Get suppliers directly from Redux store
  const adminSuppliersState = useSelector((state) => state.adminSuppliers);
  const suppliers = Array.isArray(adminSuppliersState?.suppliers) 
    ? adminSuppliersState.suppliers 
    : [];
  const isLoading = adminSuppliersState?.isLoading || false;
  const error = adminSuppliersState?.error || null;

  // Fetch real data from database on mount and when manually refreshing
  useEffect(() => {
    console.log("🔄 [SupplierManagement] Mounting - fetching suppliers from database...");
    dispatch(getAdminSuppliersThunk()).then((result) => {
      console.log("🔄 [SupplierManagement] Thunk completed with result:", result);
    });
  }, [dispatch, manualRefresh]);

  // Log to verify data is being received
  useEffect(() => {
    console.log("📊 Current suppliers in Redux:", suppliers);
    console.log("📊 Total count:", suppliers.length);
    if (suppliers.length > 0) {
      console.log("📊 First supplier:", suppliers[0]);
    }
  }, [suppliers]);

  // Filter suppliers based on search
  const filteredSuppliers = suppliers.filter((supplier) => {
    if (!searchTerm.trim()) return true;
    
    const search = searchTerm.toLowerCase().trim();
    const name = (supplier.supplierName || "").toLowerCase();
    const email = (supplier.contactEmail || "").toLowerCase();
    const phone = (supplier.phone || "").toLowerCase();
    const location = (supplier.location || "").toLowerCase();
    
    return (
      name.includes(search) ||
      email.includes(search) ||
      phone.includes(search) ||
      location.includes(search)
    );
  });

  const handleRefresh = () => {
    console.log("🔄 Manually refreshing suppliers...");
    setManualRefresh(prev => prev + 1);
  };

  const handleEditSupplier = (supplier) => {
    console.log("📝 Edit supplier:", supplier);
    setEditingSupplier(supplier);
    setEditFormData({
      supplierName: supplier.supplierName,
      contactEmail: supplier.contactEmail,
      phone: supplier.phone,
      location: supplier.location,
      address: supplier.address,
      licenseNumber: supplier.licenseNumber,
      isActive: supplier.isActive
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editFormData.supplierName || !editFormData.contactEmail || !editFormData.phone) {
      toast.error("Please fill all required fields");
      return;
    }
    
    console.log("💾 Saving supplier changes:", editingSupplier.id);
    dispatch(updateSupplier({
      id: editingSupplier.id,
      ...editFormData
    }));
    
    toast.success(`${editFormData.supplierName} updated successfully!`);
    setShowEditModal(false);
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = (supplierId, supplierName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${supplierName}? This action cannot be undone.`
    );
    
    if (confirmed) {
      console.log("🗑️ Delete supplier:", supplierId);
      dispatch(deleteSupplier(supplierId));
      toast.success(`${supplierName} deleted successfully!`);
    }
  };

  return (
    <Section>
      <SectionTitle>🏪 Supplier Management</SectionTitle>

      {/* Search and Filter Section */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by name, email, phone, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 15px",
            minWidth: "350px",
            border: "2px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "border-color 0.3s",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#ff9800")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          style={{
            background: isLoading ? "#ccc" : "#ff9800",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "13px",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#f57c00")}
          onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#ff9800")}
        >
          {isLoading ? "⏳ Loading..." : "🔄 Refresh"}
        </button>
        <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>
          Showing {filteredSuppliers.length} of {suppliers.length}
        </span>
      </div>

      {/* Status Bar */}
      <div
        style={{
          background: "#fff3e0",
          padding: "12px 15px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ffb74d",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          color: "#e65100",
        }}
      >
        <span>
          <strong>Total Suppliers: {suppliers.length}</strong>
        </span>
        <span>
          {isLoading ? "🔄 Syncing..." : "✓ Data loaded"}
        </span>
      </div>

      {/* Error Message - Only show if we have no suppliers to display */}
      {error && !isLoading && suppliers.length === 0 && (
        <div
          style={{
            background: "#fff3e0",
            padding: "12px 15px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ffb74d",
            color: "#e65100",
            fontSize: "13px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#ff9800",
            fontSize: "15px",
          }}
        >
          <p>🔄 Fetching real-time supplier data from database...</p>
          <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
            Loading suppliers from suppliers table
          </p>
        </div>
      )}

      {/* Suppliers Table */}
      {suppliers.length > 0 && !isLoading && (
        <TableWrapper>
          <Table>
            <thead>
              <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: "12px" }}>Supplier Name</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Email</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Phone</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Location</th>
                <th style={{ textAlign: "center", padding: "12px" }}>Status</th>
                <th style={{ textAlign: "center", padding: "12px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    style={{
                      borderBottom: "1px solid #eee",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fafafa")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={{ padding: "12px", fontWeight: "500", color: "#333" }}>
                      {supplier.supplierName}
                    </td>
                    <td style={{ padding: "12px", color: "#0066cc", fontSize: "13px" }}>
                      {supplier.contactEmail}
                    </td>
                    <td style={{ padding: "12px", fontSize: "13px" }}>
                      {supplier.phone}
                    </td>
                    <td style={{ padding: "12px", fontSize: "13px", color: "#666" }}>
                      {supplier.location}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <span
                        style={{
                          background: supplier.isActive ? "#4caf50" : "#ff9800",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        {supplier.isActive ? "✓ Active" : "⊘ Inactive"}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={() => handleEditSupplier(supplier)}
                        style={{
                          background: "#ff9800",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: "bold",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#f57c00")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#ff9800")
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(supplier.id, supplier.supplierName)}
                        style={{
                          background: "#f44336",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: "bold",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d32f2f")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#f44336")
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: "30px", textAlign: "center" }}>
                    <p style={{ color: "#999", fontSize: "14px", margin: 0 }}>
                      🔍 No suppliers found matching "{searchTerm}"
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      {!isLoading && suppliers.length === 0 && (
        <div style={{ padding: "60px 20px", textAlign: "center", color: "#999" }}>
          <p style={{ fontSize: "16px" }}>📭 No supplier data available</p>
          <p style={{ fontSize: "13px", marginTop: "10px" }}>
            Click "Refresh" button to fetch data from database
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingSupplier && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowEditModal(false)}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              maxWidth: "550px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
              ✏️ Edit Supplier
            </h2>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
                Supplier Name *
              </label>
              <input
                type="text"
                value={editFormData.supplierName || ""}
                onChange={(e) => setEditFormData({ ...editFormData, supplierName: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
                Contact Email *
              </label>
              <input
                type="email"
                value={editFormData.contactEmail || ""}
                onChange={(e) => setEditFormData({ ...editFormData, contactEmail: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
                Phone *
              </label>
              <input
                type="tel"
                value={editFormData.phone || ""}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
                Location
              </label>
              <input
                type="text"
                value={editFormData.location || ""}
                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
                Address
              </label>
              <textarea
                value={editFormData.address || ""}
                onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  minHeight: "60px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
                License Number
              </label>
              <input
                type="text"
                value={editFormData.licenseNumber || ""}
                onChange={(e) => setEditFormData({ ...editFormData, licenseNumber: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold", color: "#555", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={editFormData.isActive || false}
                  onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.checked })}
                  style={{ cursor: "pointer" }}
                />
                Active Supplier
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  background: "#999",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#777")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#999")}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  background: "#ff9800",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f57c00")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default SupplierManagement;
