import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import DegreeType from "../../models/DegreeType.js"

const router = Router()

// GET /api/public/degree-types — list all active degree types
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const types = await DegreeType.find({ isActive: true }).sort({ order: 1 })
    res.json(types)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch degree types", details: err.message })
  }
})

export default router
