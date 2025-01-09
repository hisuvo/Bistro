import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});

export default function useAxiosSecure() {
  const navigate = useNavigate();
  const { singOut } = useAuth();

  //  add request intercepter

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Access-token");
      config.headers.authorization = `bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        await singOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}
