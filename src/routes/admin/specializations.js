import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Specialization from "../../models/Specialization.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/specializations
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const filter = {}
    if (req.query.courseId) filter.courseId = req.query.courseId

    const specs = await Specialization.find(filter).populate("courseId").sort({ order: 1 })
    res.json(specs)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch specializations", details: err.message })
  }
})

// POST /api/admin/specializations
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    const slug = body.name.toLowerCase().replace(/\s+/g, "-")
    const spec = await Specialization.create({ ...body, slug })
    await spec.populate("courseId")

    await logActivity({
      userId, userName, userEmail,
      action: "create", section: "specializations",
      itemId: spec._id, itemName: spec.name,
      details: `Created new specialization: ${spec.name}`,
    })

    res.status(201).json(spec)
  } catch (err) {
    res.status(500).json({ error: "Failed to create specialization", details: err.message })
  }
})

// GET /api/admin/specializations/:id
router.get("/:id", async (req, res) => {
  try {
    await connectDB()
    const spec = await Specialization.findById(req.params.id).populate("courseId")
    if (!spec) return res.status(404).json({ error: "Specialization not found" })
    res.json(spec)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch specialization", details: err.message })
  }
})

// PUT /api/admin/specializations/:id
router.put("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const updated = await Specialization.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("courseId")
    if (!updated) return res.status(404).json({ error: "Specialization not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "specializations",
      itemId: req.params.id, itemName: updated.name,
      details: `Updated specialization`,
    })

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update specialization", details: err.message })
  }
})

// DELETE /api/admin/specializations/:id
router.delete("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const deleted = await Specialization.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Specialization not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "specializations",
      itemId: req.params.id, itemName: deleted.name,
      details: `Deleted specialization`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete specialization", details: err.message })
  }
})

export default router
