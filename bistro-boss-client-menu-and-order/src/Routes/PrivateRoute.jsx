import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // if (loading) return "loading.....";

  return user ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ form: location.pathname }}></Navigate>
  );
}
