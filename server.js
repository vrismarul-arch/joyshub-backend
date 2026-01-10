// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running ✅",
    uptime: process.uptime(), // seconds
    timestamp: new Date().toISOString(),
  });
});

// Optional ready endpoint (for load balancers)
app.get("/ready", (req, res) => {
  res.status(200).json({
    status: "ready",
    message: "Server is ready to accept requests ✅",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api", registrationRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
