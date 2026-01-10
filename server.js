import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES ✅
app.use("/api", registrationRoutes);
app.use("/api/admin", adminRoutes)
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
