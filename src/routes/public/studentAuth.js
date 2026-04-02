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
        const {
            name,
            email,
            password,
            phone,
            courseOfInterest,
            dateOfBirth,
            city,
            state,
            country,
            currentEducation,
            occupation,
            currentCompanyOrUniversity,
        } = req.body

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
            dateOfBirth,
            city,
            state,
            country,
            currentEducation,
            occupation,
            currentCompanyOrUniversity,
        })

        if (student) {
            res.status(201).json({
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                courseOfInterest: student.courseOfInterest,
                dateOfBirth: student.dateOfBirth,
                city: student.city,
                state: student.state,
                country: student.country,
                currentEducation: student.currentEducation,
                occupation: student.occupation,
                currentCompanyOrUniversity: student.currentCompanyOrUniversity,
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
                courseOfInterest: student.courseOfInterest,
                dateOfBirth: student.dateOfBirth,
                city: student.city,
                state: student.state,
                country: student.country,
                currentEducation: student.currentEducation,
                occupation: student.occupation,
                currentCompanyOrUniversity: student.currentCompanyOrUniversity,
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

// PUT /api/public/student/profile - update student profile fields
router.put("/profile", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = req.student
        if (!student) {
            return res.status(404).json({ error: "Student not found" })
        }

        const {
            name,
            phone,
            courseOfInterest,
            dateOfBirth,
            city,
            state,
            country,
            currentEducation,
            occupation,
            currentCompanyOrUniversity,
            shortlistedUniversities,
        } = req.body

        if (name !== undefined) student.name = name
        if (phone !== undefined) student.phone = phone
        if (courseOfInterest !== undefined) student.courseOfInterest = courseOfInterest
        if (dateOfBirth !== undefined) student.dateOfBirth = dateOfBirth
        if (city !== undefined) student.city = city
        if (state !== undefined) student.state = state
        if (country !== undefined) student.country = country
        if (currentEducation !== undefined) student.currentEducation = currentEducation
        if (occupation !== undefined) student.occupation = occupation
        if (currentCompanyOrUniversity !== undefined) student.currentCompanyOrUniversity = currentCompanyOrUniversity
        if (shortlistedUniversities !== undefined) student.shortlistedUniversities = shortlistedUniversities

        const updatedStudent = await student.save()
        const safeStudent = updatedStudent.toObject()
        delete safeStudent.password

        res.json(safeStudent)
    } catch (err) {
        console.error("Profile update error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// POST /api/public/student/profile/shortlist - add one university to shortlist
router.post("/profile/shortlist", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = req.student
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

        if (!name) {
            return res.status(400).json({ error: "University name is required" })
        }

        // Prevent duplicates by providerId or name
        const existing = student.shortlistedUniversities.find((item) => {
            if (providerId && item.providerId?.toString() === providerId.toString()) return true
            return item.name === name
        })

        if (existing) {
            return res.status(409).json({ error: "University already exists in shortlist" })
        }

        student.shortlistedUniversities.push({ providerId, name, logo, rating, approvals, startingFee, minimumDuration, courses, states })
        await student.save()

        res.status(201).json(student.shortlistedUniversities)
    } catch (err) {
        console.error("Shortlist add error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// DELETE /api/public/student/profile/shortlist/:providerId - remove from shortlist
router.delete("/profile/shortlist/:providerId", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = req.student
        if (!student) return res.status(404).json({ error: "Student not found" })

        const { providerId } = req.params
        const originalCount = student.shortlistedUniversities.length
        student.shortlistedUniversities = student.shortlistedUniversities.filter((item) => item.providerId?.toString() !== providerId.toString())

        if (student.shortlistedUniversities.length === originalCount) {
            return res.status(404).json({ error: "Shortlist item not found" })
        }

        await student.save()
        res.json({ message: "University removed from shortlist", shortlistedUniversities: student.shortlistedUniversities })
    } catch (err) {
        console.error("Shortlist remove error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// PUT /api/public/student/profile/password - change current password
router.put("/profile/password", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = req.student
        if (!student) {
            return res.status(404).json({ error: "Student not found" })
        }

        const { currentPassword, newPassword } = req.body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current password and new password are required" })
        }

        const passwordMatch = await student.matchPassword(currentPassword)
        if (!passwordMatch) {
            return res.status(401).json({ error: "Current password is incorrect" })
        }

        student.password = newPassword
        await student.save()

        res.json({ message: "Password updated successfully" })
    } catch (err) {
        console.error("Password update error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// DELETE /api/public/student/profile - delete student account (hard delete)
router.delete("/profile", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = req.student
        if (!student) {
            return res.status(404).json({ error: "Student not found" })
        }

        await Student.findByIdAndDelete(student._id)

        res.json({ message: "Student account has been deleted" })
    } catch (err) {
        console.error("Account delete error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router
