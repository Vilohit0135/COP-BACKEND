import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Specialization from "../../models/Specialization.js"

const router = Router()

// GET /api/public/specializations — list all active specializations
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const specializations = await Specialization.find({ isActive: true }).populate("courseId")
    res.json(specializations)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch specializations", details: err.message })
  }
})

export default router
