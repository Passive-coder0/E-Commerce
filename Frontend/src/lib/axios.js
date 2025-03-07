import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "http://localhost:5000/api",   This is for local backend server
  baseURL:"https://e-commerce-production-3024.up.railway.app/api",
  withCredentials: true, // Sends cookies to server
});

export default axiosInstance;
