import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Specialization from "../../models/Specialization.js"
import ProviderCourse from "../../models/ProviderCourse.js"

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

// GET /api/public/specializations/:identifier/providers — list all providers offering this specialization
router.get("/:identifier/providers", async (req, res) => {
  try {
    await connectDB()
    const identifier = req.params.identifier
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/)
    
    const query = isObjectId ? { _id: identifier } : { slug: identifier }
    const specialization = await Specialization.findOne(query)
    
    if (!specialization) return res.status(404).json({ error: "Specialization not found" })

    const providerCourses = await ProviderCourse.find({ specializationId: specialization._id, isActive: true })
      .populate("providerId")
    
    // Extract unique providers
    const providersMap = {}
    providerCourses.forEach(pc => {
      if (pc.providerId && pc.providerId.isActive === "active") {
        providersMap[pc.providerId._id.toString()] = pc.providerId
      }
    })

    res.json(Object.values(providersMap))
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch providers for specialization", details: err.message })
  }
})

export default router

