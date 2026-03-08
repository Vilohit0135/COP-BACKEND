import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Review from "../../models/Review.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/reviews
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const query = {}
    if (req.query.providerId) query.providerId = req.query.providerId
    if (req.query.isActive !== undefined) query.isActive = req.query.isActive === "true"

    const reviews = await Review.find(query)
      .populate("providerId", "name slug")
      .sort({ createdAt: -1 })

    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews", details: err.message })
  }
})

// POST /api/admin/reviews
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const body = req.body

    if (!body.name || !body.email || !body.providerId || !body.rating || !body.title || !body.comment) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const review = await Review.create({ ...body, isActive: false })
    res.status(201).json(review)
  } catch (err) {
    res.status(500).json({ error: "Failed to create review", details: err.message })
  }
})

// GET /api/admin/reviews/:id
router.get("/:id", async (req, res) => {
  try {
    await connectDB()
    const review = await Review.findById(req.params.id).populate("providerId", "name slug")
    if (!review) return res.status(404).json({ error: "Review not found" })
    res.json(review)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch review", details: err.message })
  }
})

// PUT /api/admin/reviews/:id
router.put("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("providerId", "name slug")
    if (!updated) return res.status(404).json({ error: "Review not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "reviews",
      itemId: req.params.id, itemName: updated.title,
      details: `Updated review`,
    })

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update review", details: err.message })
  }
})

// DELETE /api/admin/reviews/:id
router.delete("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const deleted = await Review.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Review not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "reviews",
      itemId: req.params.id, itemName: deleted.title,
      details: `Deleted review`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review", details: err.message })
  }
})

export default router
