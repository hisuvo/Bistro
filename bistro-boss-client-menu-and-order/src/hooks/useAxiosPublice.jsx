import axios from "axios";

const axiosPublice = axios.create({
  baseURL: `http://localhost:5000`,
});

export default function useAxiosPublice() {
  return axiosPublice;
}
