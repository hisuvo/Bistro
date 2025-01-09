import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();

  if (loading || adminLoading) {
    return <h2>Loading...</h2>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/login"} state={{ form: location }} replace></Navigate>;
}

export default AdminRoute;
