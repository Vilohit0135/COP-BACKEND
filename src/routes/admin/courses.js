import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Course from "../../models/Course.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/courses
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const courses = await Course.find().populate("degreeTypeId")
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", details: err.message })
  }
})

// POST /api/admin/courses
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    const course = await Course.create(body)

    await logActivity({
      userId, userName, userEmail,
      action: "create", section: "courses",
      itemId: course._id, itemName: course.name,
      details: `Created new course: ${course.name}`,
    })

    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ error: "Failed to create course", details: err.message })
  }
})

// GET /api/admin/courses/:id
router.get("/:id", async (req, res) => {
  try {
    await connectDB()
    const course = await Course.findById(req.params.id).populate("degreeTypeId")
    if (!course) return res.status(404).json({ error: "Course not found" })
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course", details: err.message })
  }
})

// PUT /api/admin/courses/:id
router.put("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("degreeTypeId")

    if (!updated) return res.status(404).json({ error: "Course not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "courses",
      itemId: req.params.id, itemName: updated.name,
      details: `Updated course: ${JSON.stringify(req.body)}`,
    })

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update course", details: err.message })
  }
})

// DELETE /api/admin/courses/:id
router.delete("/:id", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const deleted = await Course.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Course not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "courses",
      itemId: req.params.id, itemName: deleted.name,
      details: `Deleted course`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course", details: err.message })
  }
})

export default router
