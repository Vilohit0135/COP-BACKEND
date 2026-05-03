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

// GET /api/public/courses/:identifier — single course with its provider programs.
// `identifier` may be a Course ObjectId/slug OR a ProviderCourse ObjectId/slug;
// in the latter case we resolve to the parent Course and flag the matched program.
router.get("/:identifier", async (req, res) => {
  try {
    await connectDB()
    const identifier = req.params.identifier
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier)

    const courseQuery = isObjectId
      ? { _id: identifier, isActive: true }
      : { slug: identifier, isActive: true }

    let course = await Course.findOne(courseQuery).populate("degreeTypeId")
    let selectedProgramId = null

    if (!course) {
      const providerCourseQuery = isObjectId
        ? { _id: identifier, isActive: true }
        : { slug: identifier, isActive: true }
      const matchedProgram = await ProviderCourse.findOne(providerCourseQuery)
      if (matchedProgram?.courseId) {
        course = await Course.findOne({ _id: matchedProgram.courseId, isActive: true })
          .populate("degreeTypeId")
        if (course) selectedProgramId = matchedProgram._id
      }
    }

    if (!course) return res.status(404).json({ error: "Course not found" })

    const providerCourses = await ProviderCourse.find({ courseId: course._id, isActive: true })
      .populate("providerId")
      .populate("specializationId")
      .populate("degreeTypeId")
      .sort({ fees: 1 }) // Show cheapest first or trending

    res.json({
      course,
      programs: providerCourses,
      selectedProgramId,
    })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course detail", details: err.message })
  }
})

export default router
