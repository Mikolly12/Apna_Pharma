import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminCustomersThunk } from "../../../redux/admin/operations";
import { deleteCustomer, updateCustomer } from "../../../redux/admin/adminCustomersSlice";
import { toast } from "react-toastify";
import {
  Section,
  SectionTitle,
  TableWrapper,
  Table,
} from "../AdminDashboard.styled";

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [manualRefresh, setManualRefresh] = useState(0);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  // Get customers directly from Redux store
  const adminCustomersState = useSelector((state) => state.adminCustomers);
  const customers = Array.isArray(adminCustomersState?.customers) 
    ? adminCustomersState.customers 
    : [];
  const isLoading = adminCustomersState?.isLoading || false;
  const error = adminCustomersState?.error || null;

  // Fetch real data from database on mount and when manually refreshing
  useEffect(() => {
    console.log("🔄 [CustomerManagement] Mounting - fetching customers from database...");
    console.log("🔄 [CustomerManagement] Dispatching getAdminCustomersThunk");
    dispatch(getAdminCustomersThunk()).then((result) => {
      console.log("🔄 [CustomerManagement] Thunk completed with result:", result);
    });
  }, [dispatch, manualRefresh]);

  // Log to verify data is being received
  useEffect(() => {
    console.log("📊 Current customers in Redux:", customers);
    console.log("📊 Total count:", customers.length);
    if (customers.length > 0) {
      console.log("📊 First customer:", customers[0]);
    }
  }, [customers]);

  // Filter customers based on search
  const filteredCustomers = customers.filter((customer) => {
    if (!searchTerm.trim()) return true;
    
    const search = searchTerm.toLowerCase().trim();
    const fullName = `${customer.firstName || ""} ${customer.lastName || ""}`.toLowerCase();
    const email = (customer.email || "").toLowerCase();
    const phone = (customer.phoneNumber || "").toLowerCase();
    
    return (
      fullName.includes(search) ||
      email.includes(search) ||
      phone.includes(search)
    );
  });

  const handleRefresh = () => {
    console.log("🔄 Manually refreshing customers...");
    setManualRefresh(prev => prev + 1);
  };

  const handleEditCustomer = (customer) => {
    console.log("📝 Edit customer:", customer);
    setEditingCustomer(customer);
    setEditFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      enabled: customer.enabled
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editFormData.firstName || !editFormData.lastName || !editFormData.email) {
      toast.error("Please fill all required fields");
      return;
    }
    
    console.log("💾 Saving customer changes:", editingCustomer.id);
    dispatch(updateCustomer({
      id: editingCustomer.id,
      ...editFormData
    }));
    
    toast.success(`${editFormData.firstName} ${editFormData.lastName} updated successfully!`);
    setShowEditModal(false);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (customerId, customerName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${customerName}? This action cannot be undone.`
    );
    
    if (confirmed) {
      console.log("🗑️ Delete customer:", customerId);
      dispatch(deleteCustomer(customerId));
      toast.success(`${customerName} deleted successfully!`);
    }
  };

  return (
    <Section>
      <SectionTitle>👥 Customer Management</SectionTitle>

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
          placeholder="🔍 Search by name, email, or phone..."
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
          onFocus={(e) => (e.target.style.borderColor = "#4caf50")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          style={{
            background: isLoading ? "#ccc" : "#4caf50",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "13px",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#4caf50")}
        >
          {isLoading ? "⏳ Loading..." : "🔄 Refresh"}
        </button>
        <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>
          Showing {filteredCustomers.length} of {customers.length}
        </span>
      </div>

      {/* Status Bar */}
      <div
        style={{
          background: "#e8f5e9",
          padding: "12px 15px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #81c784",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          color: "#2e7d32",
        }}
      >
        <span>
          <strong>Total Customers: {customers.length}</strong>
        </span>
        <span>
          {isLoading ? "🔄 Syncing..." : "✓ Data loaded"}
        </span>
      </div>

      {/* Error Message - Only show if we have no customers to display */}
      {error && !isLoading && customers.length === 0 && (
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
            color: "#4caf50",
            fontSize: "15px",
          }}
        >
          <p>🔄 Fetching real-time customer data from database...</p>
          <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
            Loading customers from auth_user_details table
          </p>
        </div>
      )}

      {/* Customers Table */}
      {customers.length > 0 && !isLoading && (
        <TableWrapper>
          <Table>
            <thead>
              <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: "12px" }}>ID</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Full Name</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Email</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Phone Number</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Joined Date</th>
                <th style={{ textAlign: "center", padding: "12px" }}>Status</th>
                <th style={{ textAlign: "center", padding: "12px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
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
                    <td style={{ padding: "12px", fontSize: "12px", color: "#999" }}>
                      {customer.id}
                    </td>
                    <td style={{ padding: "12px", fontWeight: "500", color: "#333" }}>
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td style={{ padding: "12px", color: "#0066cc", fontSize: "13px" }}>
                      {customer.email}
                    </td>
                    <td style={{ padding: "12px", fontSize: "13px" }}>
                      {customer.phoneNumber || "N/A"}
                    </td>
                    <td style={{ padding: "12px", fontSize: "12px", color: "#666" }}>
                      {customer.createdOn
                        ? new Date(customer.createdOn).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <span
                        style={{
                          background: customer.enabled ? "#4caf50" : "#ff9800",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        {customer.enabled ? "✓ Active" : "⊘ Inactive"}
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
                        onClick={() => handleEditCustomer(customer)}
                        style={{
                          background: "#2196F3",
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
                          (e.target.style.backgroundColor = "#1976D2")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#2196F3")
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id, `${customer.firstName} ${customer.lastName}`)}
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
                  <td colSpan="7" style={{ padding: "30px", textAlign: "center" }}>
                    <p style={{ color: "#999", fontSize: "14px", margin: 0 }}>
                      🔍 No customers found matching "{searchTerm}"
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      {!isLoading && customers.length === 0 && (
        <div style={{ padding: "60px 20px", textAlign: "center", color: "#999" }}>
          <p style={{ fontSize: "16px" }}>📭 No customer data available</p>
          <p style={{ fontSize: "13px", marginTop: "10px" }}>
            Click "Refresh" button to fetch data from database
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingCustomer && (
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
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
              ✏️ Edit Customer
            </h2>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
                First Name
              </label>
              <input
                type="text"
                value={editFormData.firstName || ""}
                onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
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
                Last Name
              </label>
              <input
                type="text"
                value={editFormData.lastName || ""}
                onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
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
                Email
              </label>
              <input
                type="email"
                value={editFormData.email || ""}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
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
                Phone Number
              </label>
              <input
                type="tel"
                value={editFormData.phoneNumber || ""}
                onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })}
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
                  checked={editFormData.enabled || false}
                  onChange={(e) => setEditFormData({ ...editFormData, enabled: e.target.checked })}
                  style={{ cursor: "pointer" }}
                />
                Active Customer
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
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
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

export default CustomerManagement;
