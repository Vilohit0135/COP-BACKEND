import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import ProviderCourse from "../../models/ProviderCourse.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

const populate = (query) =>
  query.populate("degreeTypeId").populate("courseId").populate("specializationId")

// GET /api/admin/provider-courses
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const entries = await populate(ProviderCourse.find())
    res.json(entries)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider courses", details: err.message })
  }
})

// POST /api/admin/provider-courses
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const entry = await ProviderCourse.create(req.body)
    await populate(ProviderCourse.findById(entry._id)).then((doc) => {
      Object.assign(entry, doc.toObject())
    })

    await logActivity({
      userId, userName, userEmail,
      action: "create", section: "provider-courses",
      itemId: entry._id, itemName: entry.title || "Provider Course",
      details: `Created new provider course`,
    })

    res.status(201).json(entry)
  } catch (err) {
    res.status(500).json({ error: "Failed to create provider course", details: err.message })
  }
})

// GET /api/admin/provider-courses/:id
router.get("/:id", async (req, res) => {
  try {
    await connectDB()
    const entry = await populate(ProviderCourse.findById(req.params.id))
    if (!entry) return res.status(404).json({ error: "Provider course not found" })
    res.json(entry)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider course", details: err.message })
  }
})

// PUT /api/admin/provider-courses/:id
router.put("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const updated = await populate(
      ProviderCourse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    )
    if (!updated) return res.status(404).json({ error: "Provider course not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "provider-courses",
      itemId: req.params.id, itemName: updated.title || "Provider Course",
      details: `Updated provider course`,
    })

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update provider course", details: err.message })
  }
})

// DELETE /api/admin/provider-courses/:id
router.delete("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const deleted = await ProviderCourse.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Provider course not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "provider-courses",
      itemId: req.params.id, itemName: deleted.title || "Provider Course",
      details: `Deleted provider course`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete provider course", details: err.message })
  }
})

export default router
