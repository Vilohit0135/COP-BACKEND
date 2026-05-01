import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import ProviderCourse from "../../models/ProviderCourse.js"

const router = Router()

const populate = (query) =>
  query.populate("providerId").populate("degreeTypeId").populate("courseId").populate("specializationId")

// GET /api/public/provider-courses/home-summary — provider courses grouped by degree type
router.get("/home-summary", async (req, res) => {
  try {
    await connectDB()
    const entries = await populate(ProviderCourse.find({ isActive: true }))
    
    const grouped = {}
    entries.forEach((pc) => {
      const dt = pc.degreeTypeId
      if (!dt) return

      const key = dt.slug
      if (!grouped[key]) {
        grouped[key] = {
          degreeType: { name: dt.name, slug: dt.slug, order: dt.order ?? 0 },
          courses: [],
        }
      }

      // Map ProviderCourse to CourseItem structure expected by frontend
      grouped[key].courses.push({
        _id: pc._id,
        courseId: pc.courseId?._id, // Keep original course ID for detail link
        name: pc.title || (pc.courseId ? pc.courseId.name : "Unknown"),
        slug: pc.slug,
        thumbnail: pc.thumbnail || null,
        shortDescription: pc.shortDescription || "",
        duration: pc.duration || "",
        minFees: pc.minFees || pc.fees || 0,
        providerCount: 0,
        providerName: pc.providerId?.name || "", // Add provider name
        isTrending: pc.trending || false,
      })
    })

    const result = Object.values(grouped).sort(
      (a, b) => (a.degreeType.order ?? 0) - (b.degreeType.order ?? 0)
    )
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider courses summary", details: err.message })
  }
})

// GET /api/public/provider-courses/count
router.get("/count", async (req, res) => {
  try {
    await connectDB()
    const count = await ProviderCourse.countDocuments({ isActive: true })
    res.json({ count })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider courses count", details: err.message })
  }
})

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
