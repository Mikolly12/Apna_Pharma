import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }
};

export default PrivateRoute;
