import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import DegreeType from "../../models/DegreeType.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/degree-types
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const degrees = await DegreeType.find().sort({ order: 1 })
    res.json(degrees)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch degree types", details: err.message })
  }
})

// POST /api/admin/degree-types
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    const slug = body.name.toLowerCase().replace(/\s+/g, "-")
    const degree = await DegreeType.create({ ...body, slug })

    await logActivity({
      userId, userName, userEmail,
      action: "create", section: "degree-types",
      itemId: degree._id, itemName: degree.name,
      details: `Created new degree type: ${degree.name}`,
    })

    res.status(201).json(degree)
  } catch (err) {
    res.status(500).json({ error: "Failed to create degree type", details: err.message })
  }
})

// GET /api/admin/degree-types/:id
router.get("/:id", async (req, res) => {
  try {
    await connectDB()
    const degree = await DegreeType.findById(req.params.id)
    if (!degree) return res.status(404).json({ error: "Degree type not found" })
    res.json(degree)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch degree type", details: err.message })
  }
})

// PUT /api/admin/degree-types/:id
router.put("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const updated = await DegreeType.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Degree type not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "degree-types",
      itemId: req.params.id, itemName: updated.name,
      details: `Updated degree type: ${JSON.stringify(req.body)}`,
    })

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update degree type", details: err.message })
  }
})

// DELETE /api/admin/degree-types/:id
router.delete("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const deleted = await DegreeType.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Degree type not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "degree-types",
      itemId: req.params.id, itemName: deleted.name,
      details: `Deleted degree type`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete degree type", details: err.message })
  }
})

export default router
