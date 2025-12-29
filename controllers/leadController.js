import Lead from "../models/Lead.js"

// CREATE
export const createLead = async (req, res) => {
  try {
    const { lead, guided, pricing } = req.body

    const newLead = await Lead.create({
      lead,
      guided,
      pricing,
      status: "new",
    })

    res.status(201).json(newLead)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ ALL
export const getAllLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 })
  res.json(leads)
}

// UPDATE (STATUS / DETAILS)
export const updateLead = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE
export const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
