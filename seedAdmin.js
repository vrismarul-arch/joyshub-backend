import mongoose from "mongoose"
import dotenv from "dotenv"
import Admin from "./models/Admin.js"

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

await Admin.create({
  email: "admin@vrism.in",
  password: "admin123",
})

console.log("Admin created")
process.exit()
