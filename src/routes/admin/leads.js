import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Leads from "../../models/Leads.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/leads
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const query = {}
    if (req.query.status) query.callStatus = req.query.status

    const leads = await Leads.find(query).sort({ createdAt: -1 })
    res.json(leads)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads", details: err.message })
  }
})

// POST /api/admin/leads (admin can also create)
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const body = req.body

    if (!body.name || !body.email || !body.phone) {
      return res.status(400).json({ error: "Name, email, and phone are required" })
    }

    const lead = await Leads.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      courseOfInterest: body.courseOfInterest || "",
      message: body.message || "",
      source: body.source || "website_form",
    })

    res.status(201).json(lead)
  } catch (err) {
    res.status(500).json({ error: "Failed to create lead", details: err.message })
  }
})

// GET /api/admin/leads/:id
router.get("/:id", async (req, res) => {
  try {
    await connectDB()
    const lead = await Leads.findById(req.params.id)
    if (!lead) return res.status(404).json({ error: "Lead not found" })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lead", details: err.message })
  }
})

// PUT /api/admin/leads/:id
router.put("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const updated = await Leads.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    )
    if (!updated) return res.status(404).json({ error: "Lead not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "leads",
      itemId: req.params.id, itemName: updated.name,
      details: `Updated lead: ${JSON.stringify(req.body)}`,
    })

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update lead", details: err.message })
  }
})

// DELETE /api/admin/leads/:id
router.delete("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const deleted = await Leads.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Lead not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "leads",
      itemId: req.params.id, itemName: deleted.name,
      details: `Deleted lead`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete lead", details: err.message })
  }
})

export default router
