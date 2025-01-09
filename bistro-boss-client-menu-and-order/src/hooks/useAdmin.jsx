import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

function useAdmin() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: adminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/users/admin/${user.email}`);

      return res.data.admin;
    },
  });
  return [isAdmin, adminLoading];
}

export default useAdmin;
