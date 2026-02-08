import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrdersThunk,
  updateOrderStatusThunk,
  cancelOrderThunk,
} from "../../../redux/admin/operations";
import {
  setSelectedOrder,
  clearSelectedOrder,
} from "../../../redux/admin/adminOrdersSlice";
import {
  Section,
  SectionTitle,
  TableWrapper,
  Table,
  Button,
  Modal,
  ModalContent,
  CloseBtn,
  ActionButtons,
  DeleteBtn,
} from "../AdminDashboard.styled";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, selectedOrder, isLoading } = useSelector(
    (state) => state.adminOrders
  );
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Fetch orders on component mount
  useEffect(() => {
    console.log("📦 [OrderManagement] Fetching orders...");
    dispatch(getAdminOrdersThunk());
  }, [dispatch]);

  // Log orders for debugging
  useEffect(() => {
    console.log("📦 [OrderManagement] Orders from Redux:", orders);
    console.log("📦 [OrderManagement] Total orders:", orders?.length);
  }, [orders]);

  // Filter orders based on status
  const filteredOrders = orders?.filter((order) => {
    if (statusFilter === "ALL") return true;
    return order.status === statusFilter;
  });

  const handleViewDetails = (order) => {
    dispatch(setSelectedOrder(order));
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedOrder());
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrderThunk(orderId)).then(() => {
        // Refresh orders list
        dispatch(getAdminOrdersThunk());
        handleCloseDetails();
      });
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    dispatch(
      updateOrderStatusThunk({
        orderId: orderId,
        status: newStatus,
      })
    ).then(() => {
      // Refresh orders list
      dispatch(getAdminOrdersThunk());
      handleCloseDetails();
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "#4caf50";
      case "PENDING":
        return "#ff9800";
      case "CANCELLED":
        return "#e85050";
      case "FAILED":
        return "#d43f3f";
      default:
        return "#999";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <SectionTitle>Order Management</SectionTitle>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="ALL">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        View and manage customer orders ({filteredOrders?.length || 0} orders)
      </p>

      {isLoading && (
        <p style={{ textAlign: "center", color: "#4caf50" }}>Loading orders...</p>
      )}

      {!isLoading && (!filteredOrders || filteredOrders.length === 0) ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No {statusFilter !== "ALL" ? statusFilter.toLowerCase() : ""} orders available
                </td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order) => (
                <tr key={order.id || order.paymentIntentId}>
                  <td>
                    <code style={{ fontSize: "12px", color: "#666" }}>
                      {(order.id || order.paymentIntentId || "").substring(0, 8)}
                      ...
                    </code>
                  </td>
                  <td>{order.userEmail || order.customer || "Unknown"}</td>
                  <td style={{ fontSize: "13px" }}>
                    {formatDate(order.createdAt || order.orderDate)}
                  </td>
                  <td>
                    <span
                      style={{
                        background: getStatusColor(order.status),
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {order.status || "UNKNOWN"}
                    </span>
                  </td>
                  <td>
                    <strong>₹{order.totalAmount || order.amount || 0}</strong>
                  </td>
                  <td style={{ fontSize: "13px", color: "#666" }}>
                    {order.paymentMethod || "N/A"}
                  </td>
                  <td>
                    <ActionButtons>
                      <Button onClick={() => handleViewDetails(order)}>
                        Details
                      </Button>
                      {order.status !== "CANCELLED" && (
                        <DeleteBtn onClick={() => handleCancelOrder(order.id)}>
                          Cancel
                        </DeleteBtn>
                      )}
                    </ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal onClick={handleCloseDetails}>
          <ModalContent
            style={{ maxWidth: "700px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseBtn onClick={handleCloseDetails}>×</CloseBtn>

            <h2 style={{ marginBottom: "20px", color: "#1d1e21" }}>
              Order Details
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                  ORDER ID
                </label>
                <p style={{ margin: "5px 0", wordBreak: "break-all", fontSize: "14px" }}>
                  {selectedOrder.id || selectedOrder.paymentIntentId || "N/A"}
                </p>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                  CUSTOMER EMAIL
                </label>
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  {selectedOrder.userEmail || selectedOrder.customer || "Unknown"}
                </p>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                  ORDER DATE
                </label>
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  {formatDate(selectedOrder.createdAt || selectedOrder.orderDate)}
                </p>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                  STATUS
                </label>
                <span
                  style={{
                    background: getStatusColor(selectedOrder.status),
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "inline-block",
                    marginTop: "5px",
                  }}
                >
                  {selectedOrder.status || "UNKNOWN"}
                </span>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                  PAYMENT METHOD
                </label>
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  {selectedOrder.paymentMethod || "Not Specified"}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                ORDER ITEMS
              </label>
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <div
                  style={{
                    background: "#f9f9f9",
                    padding: "10px",
                    borderRadius: "4px",
                    marginTop: "8px",
                  }}
                >
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "8px",
                        borderBottom:
                          idx < selectedOrder.items.length - 1
                            ? "1px solid #eee"
                            : "none",
                      }}
                    >
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>
                        {item.productName || item.name || "Unknown Product"}
                      </div>
                      <div style={{ fontSize: "13px", color: "#666" }}>
                        Qty: {item.quantity || item.qty || 1} × ₹
                        {item.price || item.productPrice || 0}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: "13px", color: "#666", marginTop: "8px" }}>
                  No items information available
                </p>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                TOTAL AMOUNT
              </label>
              <p
                style={{
                  margin: "5px 0",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#4caf50",
                }}
              >
                ₹{selectedOrder.totalAmount || selectedOrder.amount || 0}
              </p>
            </div>

            {selectedOrder.status !== "CANCELLED" && (
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {selectedOrder.status === "PENDING" && (
                  <>
                    <Button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder.id, "COMPLETED")
                      }
                      style={{ flex: 1, background: "#4caf50" }}
                    >
                      Mark as Completed
                    </Button>
                    <DeleteBtn
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      style={{ flex: 1 }}
                    >
                      Cancel Order
                    </DeleteBtn>
                  </>
                )}
                {selectedOrder.status === "COMPLETED" && (
                  <Button
                    onClick={handleCloseDetails}
                    style={{ flex: 1, background: "#999" }}
                  >
                    Close
                  </Button>
                )}
                {selectedOrder.status === "FAILED" && (
                  <>
                    <Button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder.id, "PENDING")
                      }
                      style={{ flex: 1, background: "#ff9800" }}
                    >
                      Retry Order
                    </Button>
                    <DeleteBtn
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      style={{ flex: 1 }}
                    >
                      Cancel Order
                    </DeleteBtn>
                  </>
                )}
              </div>
            )}
          </ModalContent>
        </Modal>
      )}
    </Section>
  );
};

export default OrderManagement;
