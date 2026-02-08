import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const selectAdminIsLoggedIn = (state) => state.adminAuth.isLoggedIn;

const AdminPrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectAdminIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute;
