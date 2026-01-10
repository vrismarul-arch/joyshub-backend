import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    registerNo: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    gender: String,
    aadhar: { type: String, required: true },
    aadhaarUrl: { type: String, required: true },
    maritalStatus: String,
    dob: String,
    bloodGroup: String, // Added
    nationality: String, // Added
    
    // Contact Info - Use "mobile" to match your frontend state
    mobile: String, 
    email: String,
    address: String,

    // Family Info
    parentName: String, // Added
    parentContact: String, // Added
    guardianName: String, // Added
    guardianContact: String, // Added

    // Stay Info
    checkinDate: String,
    lockIn: String, // Added
    apartmentName: String,
    apartmentAddress: String,

    // Employment Info
    companyName: String, // Added
    companyAddress: String, // Added
    vehicleType: String, // Added
    vehicleNumber: String, // Added
    
    reference: [String],
    photoUrl: { type: String, required: true },
    signatureUrl: { type: String, required: true },
    agreedToTerms: { type: Boolean, required: true },
    status: { type: String, default: "new" }
  },
  { timestamps: true }
);

export default mongoose.model("Registration", registrationSchema);