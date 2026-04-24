import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import ProviderCourse from "../../models/ProviderCourse.js"

const router = Router()

const populate = (query) =>
  query.populate("providerId").populate("degreeTypeId").populate("courseId").populate("specializationId")

// GET /api/public/provider-courses
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const query = { isActive: true }
    
    // Allow filtering by specializationId
    if (req.query.specializationId) {
      query.specializationId = req.query.specializationId
    }
    
    const entries = await populate(ProviderCourse.find(query))
    res.json(entries)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider courses", details: err.message })
  }
})

export default router
