import { Router } from "express"
import Student from "../../../models/Student.js"
import { connectDB } from "../../../lib/db.js"
import { generateStudentToken, sanitizeStudent } from "../../../lib/studentToken.js"

const router = Router()

// POST /api/public/student/login
router.post("/", async (req, res) => {
    try {
        await connectDB()
        const { email, phone, identifier, password } = req.body

        const loginKey = email || phone || identifier
        if (!loginKey || !password) {
            return res
                .status(400)
                .json({ error: "Email or phone and password are required" })
        }

        const student = await Student.findOne({
            $or: [{ email: loginKey }, { phone: loginKey }],
        })

        if (!student || !(await student.matchPassword(password))) {
            return res.status(401).json({ error: "Incorrect credentials" })
        }

        if (!student.isActive) {
            return res.status(403).json({ error: "Account is inactive" })
        }

        res.json({
            ...sanitizeStudent(student),
            token: generateStudentToken(student._id),
        })
    } catch (err) {
        console.error("Login error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router
