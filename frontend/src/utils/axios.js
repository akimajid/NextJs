import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const axiosInstance = axios.create({
  baseURL: "http://localhost:3010",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
