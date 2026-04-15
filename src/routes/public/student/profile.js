import { Router } from "express"
import Student from "../../../models/Student.js"
import { connectDB } from "../../../lib/db.js"
import { requireStudentAuth } from "../../../middleware/studentAuth.js"
import { sanitizeStudent } from "../../../lib/studentToken.js"

const router = Router()

// GET /api/public/student/profile
router.get("/", requireStudentAuth, async (req, res) => {
    res.json(req.student)
})

// PUT /api/public/student/profile
router.put("/", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = await Student.findById(req.student._id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        const editable = [
            "name",
            "firstName",
            "lastName",
            "phone",
            "email",
            "courseOfInterest",
            "dateOfBirth",
            "city",
            "state",
            "country",
            "currentEducation",
            "occupation",
            "currentCompanyOrUniversity",
            "profilePhoto",
        ]

        for (const key of editable) {
            if (req.body[key] !== undefined) student[key] = req.body[key]
        }

        // Keep combined "name" in sync when firstName/lastName change
        if (req.body.firstName !== undefined || req.body.lastName !== undefined) {
            const combined = [student.firstName, student.lastName]
                .filter(Boolean)
                .join(" ")
                .trim()
            if (combined) student.name = combined
        }

        const updated = await student.save()
        res.json(sanitizeStudent(updated))
    } catch (err) {
        console.error("Profile update error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router
