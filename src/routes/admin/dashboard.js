import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Course from "../../models/Course.js"
import Provider from "../../models/Provider.js"
import Leads from "../../models/Leads.js"
import Review from "../../models/Review.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

import DegreeType from "../../models/DegreeType.js"
import Specialization from "../../models/Specialization.js"
import ProviderCourse from "../../models/ProviderCourse.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/dashboard/stats
router.get("/stats", async (req, res) => {
  try {
    await connectDB()
    const [courses, providers, leads, reviews, degreeTypes, specializations, providerCourses] = await Promise.all([
      Course.countDocuments(),
      Provider.countDocuments(),
      Leads.countDocuments(),
      Review.countDocuments(),
      DegreeType.countDocuments(),
      Specialization.countDocuments(),
      ProviderCourse.countDocuments(),
    ])
    res.json({ courses, providers, leads, reviews, degreeTypes, specializations, providerCourses })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/admin/dashboard/leads-by-source
router.get("/leads-by-source", async (req, res) => {
  try {
    await connectDB()
    const data = await Leads.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/admin/dashboard/reviews-by-rating
router.get("/reviews-by-rating", async (req, res) => {
  try {
    await connectDB()
    const data = await Review.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
