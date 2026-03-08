import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Leads from "../../models/Leads.js"

const router = Router()

// POST /api/public/leads — website form submission (no auth)
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const body = req.body

    if (!body.name || !body.email || !body.phone) {
      return res.status(400).json({ error: "Name, email, and phone are required" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    const lead = await Leads.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      courseOfInterest: body.courseOfInterest || "",
      message: body.message || "",
      source: body.source || "website_form",
    })

    res.status(201).json(lead)
  } catch (err) {
    console.error("Error creating lead:", err)
    res.status(500).json({ error: "Failed to create lead", details: err.message })
  }
})

export default router
