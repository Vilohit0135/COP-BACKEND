import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Activity from "../../models/Activity.js"
import { getActivityLogs, getActivityCount } from "../../lib/activityLogger.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()

// Apply Clerk middleware to all routes in this router
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/activities — get logs with filters + pagination
router.get("/", async (req, res) => {
  try {
    const filters = {
      userId: req.query.userId || null,
      section: req.query.section || null,
      limit: parseInt(req.query.limit) || 50,
      skip: parseInt(req.query.skip) || 0,
    }

    // Remove nulls
    Object.keys(filters).forEach(
      (k) => (filters[k] === null || filters[k] === undefined) && delete filters[k]
    )

    const [logs, total] = await Promise.all([
      getActivityLogs(filters),
      getActivityCount(filters),
    ])

    res.json({ logs, total, limit: filters.limit, skip: filters.skip })
  } catch (err) {
    console.error("Error fetching activities:", err)
    res.status(500).json({ error: "Failed to fetch activities", details: err.message })
  }
})

// DELETE /api/admin/activities/clear — delete all activity logs
router.delete("/clear", async (req, res) => {
  try {
    await connectDB()
    const result = await Activity.deleteMany({})
    res.json({ success: true, deletedCount: result.deletedCount })
  } catch (err) {
    console.error("Error clearing activities:", err)
    res.status(500).json({ error: "Failed to clear activities", details: err.message })
  }
})

export default router
