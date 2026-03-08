import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Provider from "../../models/Provider.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

const slugify = (str = "") =>
  str.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")

async function uniqueSlug(base, excludeId = null) {
  if (!base) base = Date.now().toString()
  let slug = base
  let i = 0
  while (await Provider.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    i++
    slug = `${base}-${i}`
  }
  return slug
}

// GET /api/admin/providers
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const providers = await Provider.find().sort({ createdAt: -1 })
    res.json(providers)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch providers", details: err.message })
  }
})

// POST /api/admin/providers
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    const base = slugify(body.name || body.slug || "")
    const slug = await uniqueSlug(base)
    const provider = await Provider.create({ ...body, slug })

    await logActivity({
      userId, userName, userEmail,
      action: "create", section: "providers",
      itemId: provider._id, itemName: provider.name,
      details: `Created new provider: ${provider.name}`,
    })

    res.status(201).json(provider)
  } catch (err) {
    res.status(500).json({ error: "Failed to create provider", details: err.message })
  }
})

// GET /api/admin/providers/:id
router.get("/:id", async (req, res) => {
  try {
    await connectDB()
    const provider = await Provider.findById(req.params.id)
    if (!provider) return res.status(404).json({ error: "Provider not found" })
    res.json(provider)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider", details: err.message })
  }
})

// PUT /api/admin/providers/:id
router.put("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    if (body.name || body.slug) {
      const base = slugify(body.name || body.slug || "")
      body.slug = await uniqueSlug(base, req.params.id)
    }

    const updated = await Provider.findByIdAndUpdate(req.params.id, body, { new: true })
    if (!updated) return res.status(404).json({ error: "Provider not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "providers",
      itemId: req.params.id, itemName: updated.name,
      details: `Updated provider: ${updated.name}`,
    })

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update provider", details: err.message })
  }
})

// DELETE /api/admin/providers/:id
router.delete("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const deleted = await Provider.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Provider not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "providers",
      itemId: req.params.id, itemName: deleted.name,
      details: `Deleted provider`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete provider", details: err.message })
  }
})

export default router
