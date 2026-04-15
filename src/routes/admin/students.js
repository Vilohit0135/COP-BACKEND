import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Student from "../../models/Student.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/students
router.get("/", async (req, res) => {
    try {
        await connectDB()
        const students = await Student.find()
            .select("-password -resetPasswordToken -resetPasswordExpires")
            .sort({ createdAt: -1 })
        res.json(students)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students", details: err.message })
    }
})

// GET /api/admin/students/:id
router.get("/:id", async (req, res) => {
    try {
        await connectDB()
        const student = await Student.findById(req.params.id).select(
            "-password -resetPasswordToken -resetPasswordExpires"
        )
        if (!student) return res.status(404).json({ error: "Student not found" })
        res.json(student)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch student", details: err.message })
    }
})

// PATCH /api/admin/students/:id — toggle active / update basic admin-editable fields
router.patch("/:id", async (req, res) => {
    try {
        await connectDB()
        const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

        const student = await Student.findById(req.params.id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        if (req.body.isActive !== undefined) student.isActive = req.body.isActive

        await student.save()

        await logActivity({
            userId,
            userName,
            userEmail,
            action: "update",
            section: "students",
            itemId: student._id,
            itemName: student.name || student.email || student.phone || "Student",
            details: `Updated student (isActive=${student.isActive})`,
        })

        const safe = student.toObject()
        delete safe.password
        delete safe.resetPasswordToken
        delete safe.resetPasswordExpires
        res.json(safe)
    } catch (err) {
        res.status(500).json({ error: "Failed to update student", details: err.message })
    }
})

// DELETE /api/admin/students/:id
router.delete("/:id", async (req, res) => {
    try {
        await connectDB()
        const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

        const deleted = await Student.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ error: "Student not found" })

        await logActivity({
            userId,
            userName,
            userEmail,
            action: "delete",
            section: "students",
            itemId: req.params.id,
            itemName: deleted.name || deleted.email || deleted.phone || "Student",
            details: `Deleted student account`,
        })

        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: "Failed to delete student", details: err.message })
    }
})

export default router
