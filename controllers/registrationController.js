import Registration from "../models/Registration.js";

/* AUTO GENERATE REGISTER NUMBER (JOYS001, JOYS002...) */
const generateRegisterNo = async () => {
  const last = await Registration.findOne()
    .sort({ createdAt: -1 })
    .select("registerNo");

  if (!last || !last.registerNo) return "JOYS001";

  const num = parseInt(last.registerNo.replace("JOYS", ""), 10) + 1;
  return `JOYS${String(num).padStart(3, "0")}`;
};

/* CREATE NEW REGISTRATION */
export const createRegistration = async (req, res) => {
  try {
    const data = req.body;

    // Server-side validation for required files
    if (!data.photoUrl || !data.signatureUrl || !data.aadhaarUrl) {
      return res.status(400).json({ message: "Required files (Photo, Signature, or Aadhaar) are missing" });
    }

    if (!data.agreedToTerms) {
      return res.status(400).json({ message: "You must accept the terms and conditions" });
    }

    // Generate the custom ID
    const registerNo = await generateRegisterNo();

    // Create entry with all fields from req.body
    const newRegistration = new Registration({
      ...data,
      registerNo,
    });

    const saved = await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: saved, // This will now contain ALL fields
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* GET ALL REGISTRATIONS */
export const getRegistrations = async (req, res) => {
  try {
    const list = await Registration.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
};

/* GET SINGLE REGISTRATION BY ID */
export const getRegistrationById = async (req, res) => {
  try {
    const item = await Registration.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch registration" });
  }
};

/* UPDATE REGISTRATION */
export const updateRegistration = async (req, res) => {
  try {
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* DELETE REGISTRATION */
export const deleteRegistration = async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};