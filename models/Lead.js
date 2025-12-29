import mongoose from "mongoose"

const LeadSchema = new mongoose.Schema(
  {
    lead: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
    },

    guided: {
      businessType: String,
      revenue: String,
      goal: [String],
    },

    pricing: [
      {
        id: String,
        title: String,
        price: String,
      },
    ],

    status: {
  type: String,
  enum: ["new", "contacted", "converted", "closed"],
  default: "new",
}

  },
  { timestamps: true }
)

export default mongoose.model("Lead", LeadSchema)
