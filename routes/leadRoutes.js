import express from "express"
import {
  createLead,
  getAllLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/", createLead)
router.get("/", protect, getAllLeads)
router.put("/:id", protect, updateLead)
router.delete("/:id", protect, deleteLead)

export default router
