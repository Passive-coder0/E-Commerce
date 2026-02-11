import axios from "axios";

const axiosInstance = axios.create({
  // Local Deployment
  //baseURL: "http://localhost:5000/api",
  
  // Online Hosting
  baseURL:"https://ommerce-passive-coder0186-pwft37jb.leapcell.dev/api",
  withCredentials: true, // Sends cookies to server
});

export default axiosInstance;
