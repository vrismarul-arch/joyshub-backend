import express from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registrationController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ================= PUBLIC FORM ================= */
// USED BY REGISTRATION FORM
router.post("/register", createRegistration);

/* ================= ADMIN ROUTES ================= */
// ADMIN DASHBOARD
router.get("/registrations", protect, getRegistrations);

// VIEW SINGLE
router.get("/registrations/:id", protect, getRegistrationById);

// UPDATE
router.put("/registrations/:id", protect, updateRegistration);

// DELETE
router.delete("/registrations/:id", protect, deleteRegistration);

export default router;
