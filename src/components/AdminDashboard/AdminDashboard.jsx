import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogoutThunk } from "../../redux/admin/operations";
import ProductManagement from "./ProductManagement/ProductManagement";
import OrderManagement from "./OrderManagement/OrderManagement";
import CustomerManagement from "./CustomerManagement/CustomerManagement";
import SupplierManagement from "./SupplierManagement/SupplierManagement";
import {
  DashboardContainer,
  Header,
  HeaderTitle,
  LogoutBtn,
  SidebarNav,
  MainContent,
  NavItem,
  Section,
  SectionTitle,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  TableWrapper,
  Table,
} from "./AdminDashboard.styled";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminUser = useSelector((state) => state.adminAuth.user);
  const [activeSection, setActiveSection] = useState("dashboard");

  // Get data from Redux for real-time statistics
  const products = useSelector((state) => state.adminProducts?.products || []);
  const orders = useSelector((state) => state.adminOrders?.orders || []);
  const customers = useSelector((state) => state.adminCustomers?.customers || []);
  const suppliers = useSelector((state) => state.adminSuppliers?.suppliers || []);

  // Calculate statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalSuppliers = suppliers.length;
  const completedOrders = orders.filter(o => o.status === "COMPLETED").length;
  const pendingOrders = orders.filter(o => o.status === "PENDING").length;

  // Calculate total revenue (sum of completed orders)
  const totalRevenue = orders
    .filter(o => o.status === "COMPLETED")
    .reduce((sum, o) => sum + (o.totalAmount || o.amount || 0), 0);

  const handleLogout = async () => {
    try {
      await dispatch(adminLogoutThunk());
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <HeaderTitle>Apna-Pharma Admin Dashboard</HeaderTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ color: "#1d1e21" }}>
            Welcome, {adminUser?.name || adminUser?.email || "Admin"}!
          </span>
          <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
        </div>
      </Header>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <SidebarNav>
          <NavItem
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </NavItem>
          <NavItem
            active={activeSection === "products"}
            onClick={() => setActiveSection("products")}
          >
            Products
          </NavItem>
          <NavItem
            active={activeSection === "orders"}
            onClick={() => setActiveSection("orders")}
          >
            Orders
          </NavItem>
          <NavItem
            active={activeSection === "customers"}
            onClick={() => setActiveSection("customers")}
          >
            Customers
          </NavItem>
          <NavItem
            active={activeSection === "suppliers"}
            onClick={() => setActiveSection("suppliers")}
          >
            Suppliers
          </NavItem>
        </SidebarNav>

        <MainContent>
          {activeSection === "dashboard" && (
            <Section>
              <SectionTitle>📊 Dashboard Overview</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <StatValue>{totalProducts}</StatValue>
                  <StatLabel>Total Products</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{totalOrders}</StatValue>
                  <StatLabel>Total Orders</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{totalCustomers}</StatValue>
                  <StatLabel>Total Customers</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{totalSuppliers}</StatValue>
                  <StatLabel>Total Suppliers</StatLabel>
                </StatCard>
              </StatsGrid>

              {/* Additional Statistics */}
              <div style={{ marginTop: "30px" }}>
                <h3 style={{ marginBottom: "20px", color: "#333" }}>📈 Quick Statistics</h3>
                <StatsGrid>
                  <StatCard style={{ background: "#e8f5e9", border: "2px solid #4caf50" }}>
                    <StatValue style={{ color: "#4caf50" }}>{completedOrders}</StatValue>
                    <StatLabel>Completed Orders</StatLabel>
                  </StatCard>
                  <StatCard style={{ background: "#fff3e0", border: "2px solid #ff9800" }}>
                    <StatValue style={{ color: "#ff9800" }}>{pendingOrders}</StatValue>
                    <StatLabel>Pending Orders</StatLabel>
                  </StatCard>
                  <StatCard style={{ background: "#e3f2fd", border: "2px solid #2196f3" }}>
                    <StatValue style={{ color: "#2196f3" }}>₹{totalRevenue.toLocaleString()}</StatValue>
                    <StatLabel>Total Revenue</StatLabel>
                  </StatCard>
                  <StatCard style={{ background: "#f3e5f5", border: "2px solid #9c27b0" }}>
                    <StatValue style={{ color: "#9c27b0" }}>
                      {totalOrders > 0 ? (Math.round((completedOrders / totalOrders) * 100)) : 0}%
                    </StatValue>
                    <StatLabel>Completion Rate</StatLabel>
                  </StatCard>
                </StatsGrid>
              </div>

              {/* Recent Activity Summary */}
              <div style={{ marginTop: "30px" }}>
                <h3 style={{ marginBottom: "15px", color: "#333" }}>📋 Activity Summary</h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "15px"
                }}>
                  <div style={{
                    background: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666", fontWeight: "bold" }}>
                      👥 Active Users
                    </p>
                    <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#2196f3" }}>
                      {totalCustomers}
                    </p>
                  </div>
                  <div style={{
                    background: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666", fontWeight: "bold" }}>
                      🏪 Active Suppliers
                    </p>
                    <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#ff9800" }}>
                      {totalSuppliers}
                    </p>
                  </div>
                  <div style={{
                    background: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666", fontWeight: "bold" }}>
                      💊 Available Products
                    </p>
                    <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#4caf50" }}>
                      {totalProducts}
                    </p>
                  </div>
                  <div style={{
                    background: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666", fontWeight: "bold" }}>
                      📦 Total Orders
                    </p>
                    <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#9c27b0" }}>
                      {totalOrders}
                    </p>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {activeSection === "products" && (
            <ProductManagement />
          )}

          {activeSection === "orders" && (
            <OrderManagement />
          )}

          {activeSection === "customers" && (
            <CustomerManagement />
          )}

          {activeSection === "suppliers" && (
            <SupplierManagement />
          )}
        </MainContent>
      </div>
    </DashboardContainer>
  );
};

export default AdminDashboard;
