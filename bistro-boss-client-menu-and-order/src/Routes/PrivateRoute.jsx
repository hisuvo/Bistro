import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user) return "Loading.....";

  return user ? children : <Navigate to={"/login"}></Navigate>;
}
