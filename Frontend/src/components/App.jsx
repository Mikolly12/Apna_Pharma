import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import EmailVerificationPage from "pages/EmailVerificationPage";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "pages/HomePage";
import MedicineStorePage from "pages/MedicineStorePage";
import MedicinePage from "pages/MedicinePage";
import ProductPage from "pages/ProductPage";
import CartPage from "pages/CartPage";
import PrescriptionsPage from "pages/PrescriptionsPage";
import NotFoundPage from "pages/NotFoundPage";
import PrivateRoute from "routes/PrivateRoute";
import AdminPrivateRoute from "routes/AdminPrivateRoute";
import AdminLogin from "./AdminLogin/AdminLogin";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Payment from "./Payment/Payment";

export const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email-verification" element={<EmailVerificationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminPrivateRoute>
            <AdminDashboard />
          </AdminPrivateRoute>
        }
      />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="medicine-store" element={<MedicineStorePage />} />
        <Route path="medicine" element={<MedicinePage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="payment" element={<Payment />} />
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="prescriptions"
          element={
            <PrivateRoute>
              <PrescriptionsPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
