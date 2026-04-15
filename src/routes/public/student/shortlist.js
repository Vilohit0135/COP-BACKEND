import { Router } from "express"
import Student from "../../../models/Student.js"
import { connectDB } from "../../../lib/db.js"
import { requireStudentAuth } from "../../../middleware/studentAuth.js"

const router = Router()

// GET /api/public/student/shortlist — list shortlisted universities
router.get("/", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = await Student.findById(req.student._id).select(
            "shortlistedUniversities"
        )
        if (!student) return res.status(404).json({ error: "Student not found" })
        res.json(student.shortlistedUniversities || [])
    } catch (err) {
        console.error("Shortlist list error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// POST /api/public/student/shortlist — add a university
router.post("/", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = await Student.findById(req.student._id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        const {
            providerId,
            name,
            logo,
            rating,
            approvals = [],
            startingFee,
            minimumDuration,
            courses = [],
            states = [],
        } = req.body

        if (!name && !providerId) {
            return res
                .status(400)
                .json({ error: "providerId or university name is required" })
        }

        const existing = student.shortlistedUniversities.find((item) => {
            if (providerId && item.providerId?.toString() === providerId.toString())
                return true
            return name && item.name === name
        })

        if (existing) {
            return res.status(409).json({ error: "University already in shortlist" })
        }

        student.shortlistedUniversities.push({
            providerId,
            name,
            logo,
            rating,
            approvals,
            startingFee,
            minimumDuration,
            courses,
            states,
        })
        await student.save()

        res.status(201).json(student.shortlistedUniversities)
    } catch (err) {
        console.error("Shortlist add error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// DELETE /api/public/student/shortlist/:providerId — remove from shortlist
router.delete("/:providerId", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = await Student.findById(req.student._id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        const { providerId } = req.params
        const originalCount = student.shortlistedUniversities.length
        student.shortlistedUniversities = student.shortlistedUniversities.filter(
            (item) => item.providerId?.toString() !== providerId.toString()
        )

        if (student.shortlistedUniversities.length === originalCount) {
            return res.status(404).json({ error: "Shortlist item not found" })
        }

        await student.save()
        res.json({
            message: "University removed from shortlist",
            shortlistedUniversities: student.shortlistedUniversities,
        })
    } catch (err) {
        console.error("Shortlist remove error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router
