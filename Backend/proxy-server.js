import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://threadsmith.netlify.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Proxy auth routes
app.post("/api/auth/login", async (req, res) => {
  try {
    const response = await axios.post(
      "https://ommerce-passive-coder0186-pwft37jb.leapcell.dev/api/auth/login",
      req.body,
      { withCredentials: true }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: "Proxy error" });
  }
});

// Proxy profile route
app.get("/api/auth/profile", async (req, res) => {
  try {
    const response = await axios.get(
      "https://ommerce-passive-coder0186-pwft37jb.leapcell.dev/api/auth/profile",
      { headers: { cookie: req.headers.cookie } }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: "Proxy error" });
  }
});

// Add other endpoints (cart, products) the same way if needed

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));