import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:5000/api": "/api", // The backend server URL, whether it be in development or deployed mode
    withCredentials: true, // Sends cookies to server
});

export default axiosInstance;
