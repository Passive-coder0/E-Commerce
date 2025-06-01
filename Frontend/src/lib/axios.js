import axios from "axios";

const axiosInstance = axios.create({
  // Local Deployment
  //baseURL: "http://localhost:5000/api",
  
  // Online Hosting
  baseURL:"https://e-commerce-production-d6f4.up.railway.app/api",
  withCredentials: true, // Sends cookies to server
});

export default axiosInstance;
