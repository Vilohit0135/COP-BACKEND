import { Router } from "express"
import jwt from "jsonwebtoken"
import Student from "../../models/Student.js"
import { connectDB } from "../../lib/db.js"
import { requireStudentAuth } from "../../middleware/studentAuth.js"

const router = Router()

// Helper to generate JWT token for student
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

// POST /api/public/student/signup
router.post("/signup", async (req, res) => {
    try {
        await connectDB()
        const { name, email, password, phone, courseOfInterest } = req.body

        // Basic required fields validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ error: "Name, email, phone, and password are required" })
        }

        // Check if student already exists
        const studentExists = await Student.findOne({ email })
        if (studentExists) {
            return res.status(400).json({ error: "Account already exists with this email address" })
        }

        // Create new student document
        const student = await Student.create({
            name,
            email,
            phone,
            password,
            courseOfInterest,
        })

        if (student) {
            res.status(201).json({
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                token: generateToken(student._id),
            })
        } else {
            res.status(400).json({ error: "Failed to create student account" })
        }
    } catch (err) {
        console.error("Signup error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// POST /api/public/student/login
router.post("/login", async (req, res) => {
    try {
        await connectDB()
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }

        // Find student
        const student = await Student.findOne({ email })

        // Verify password
        if (student && (await student.matchPassword(password))) {
            // Check if active
            if (!student.isActive) {
                return res.status(403).json({ error: "Account is inactive" })
            }

            res.json({
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                token: generateToken(student._id),
            })
        } else {
            res.status(401).json({ error: "Incorrect email or password" })
        }
    } catch (err) {
        console.error("Login error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// GET /api/public/student/profile - Protected route for students
router.get("/profile", requireStudentAuth, async (req, res) => {
    res.json(req.student)
})

export default router
