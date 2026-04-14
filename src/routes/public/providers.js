import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Provider from "../../models/Provider.js"
import Review from "../../models/Review.js"
import ProviderCourse from "../../models/ProviderCourse.js"

const router = Router()

// GET /api/public/providers — list all published providers
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const query = { isActive: "active" }
    if (req.query.featured === "true") query.isFeatured = true

    const providers = await Provider.find(query)
      .select("name slug logo coverImage galleryImages shortExcerpt facts approvals admissionOpen isFeatured averageRating")
      .sort({ isFeatured: -1, createdAt: -1 })

    res.json(providers)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch providers", details: err.message })
  }
})

// GET /api/public/providers/:slug — single provider page
router.get("/:slug", async (req, res) => {
  try {
    await connectDB()
    const identifier = req.params.slug
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/)
    
    const query = isObjectId 
      ? { _id: identifier, isActive: "active" }
      : { slug: identifier, isActive: "active" }

    const provider = await Provider.findOne(query)

    if (!provider) return res.status(404).json({ error: "Provider not found" })

    res.json(provider)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider", details: err.message })
  }
})

// GET /api/public/providers/:slug/reviews — active reviews for a provider
router.get("/:slug/reviews", async (req, res) => {
  try {
    await connectDB()
    const identifier = req.params.slug
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/)
    
    const query = isObjectId ? { _id: identifier } : { slug: identifier }
    const provider = await Provider.findOne(query)
    
    if (!provider) return res.status(404).json({ error: "Provider not found" })

    const reviews = await Review.find({ providerId: provider._id, isActive: true })
      .sort({ createdAt: -1 })

    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews", details: err.message })
  }
})

// GET /api/public/providers/:slug/courses — courses for a provider
router.get("/:slug/courses", async (req, res) => {
  try {
    await connectDB()
    const identifier = req.params.slug
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/)
    
    const query = isObjectId ? { _id: identifier } : { slug: identifier }
    const provider = await Provider.findOne(query)
    
    if (!provider) return res.status(404).json({ error: "Provider not found" })

    const courses = await ProviderCourse.find({ providerId: provider._id, isActive: true })
      .populate("degreeTypeId")
      .populate("courseId")
      .populate("specializationId")

    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", details: err.message })
  }
})

export default router
