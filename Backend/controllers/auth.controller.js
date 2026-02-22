import User from "../models/user.model.js";
import { redis } from "../lib/redis.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 Days before expiring
};

const setCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Prevents XSS Attacks
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 mins
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Prevents XSS Attacks
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  // Checks if user exists before signing up
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });

    // authenticate user with tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in sign up controller: " + error.message);
    res.status(500).json({ message: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);

      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "Logged in successfully",
      });
    }
    else {
      res.status(400).json({Message: "Invalid email or password"})
    }
  } catch (error) {
    console.log("Error in login controller: " + error.message);
    res.status(500).json({ message: `Error in Login: ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: " + error.message);
    res.status(500).json({ message: error.message});
  }
};
// This wil lrefresh the access token
export const refreshToken = async (req, res) => {
try {
  const isProduction = process.env.NODE_ENV === "production";
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided"})
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

  if(storedToken !== refreshToken) {
    return res.status(401).json({message: "Invalid refresh token"})
  }

  const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Prevents XSS Attacks
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.json({message: "Token refreshed Successfully"})
} catch (error) {
  console.log("Error in refreshToken controller", error.message);
  res.status(500).json({message: "server error", error: error.message})
}
}


 export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({message: "Server error in auth.controller.js", error: error.message})
  }
 }