import express from "express"
import { adminLogin } from "../controllers/adminController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// PUBLIC
router.post("/login", adminLogin)

// PROTECTED SAMPLE ROUTE
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Admin authorized",
    adminId: req.adminId,
  })
})

export default router
