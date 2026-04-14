import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Course from "../../models/Course.js"
import ProviderCourse from "../../models/ProviderCourse.js"

const router = Router()

// GET /api/public/courses — list all active courses
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const courses = await Course.find({ isActive: true }).populate("degreeTypeId")
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", details: err.message })
  }
})

// GET /api/public/courses/:identifier — single course with its provider programs
router.get("/:identifier", async (req, res) => {
  try {
    await connectDB()
    const identifier = req.params.identifier
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/)
    
    const query = isObjectId 
      ? { _id: identifier, isActive: true }
      : { slug: identifier, isActive: true }

    const course = await Course.findOne(query).populate("degreeTypeId")
    
    if (!course) return res.status(404).json({ error: "Course not found" })

    const providerCourses = await ProviderCourse.find({ courseId: course._id, isActive: true })
      .populate("providerId")
      .populate("specializationId")
      .populate("degreeTypeId")
      .sort({ fees: 1 }) // Show cheapest first or trending

    res.json({
      course,
      programs: providerCourses
    })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course detail", details: err.message })
  }
})

export default router
