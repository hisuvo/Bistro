import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export default useAuth;
