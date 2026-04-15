import { Router } from "express"
import crypto from "crypto"
import Student from "../../../models/Student.js"
import { connectDB } from "../../../lib/db.js"
import { requireStudentAuth } from "../../../middleware/studentAuth.js"
import { sendEmail } from "../../../lib/mail.js"

const router = Router()

// POST /api/public/student/password/forgot
// Body: { email } or { phone }
router.post("/forgot", async (req, res) => {
    try {
        await connectDB()
        const { email, phone } = req.body
        if (!email && !phone) {
            return res.status(400).json({ error: "Email or phone is required" })
        }

        const student = await Student.findOne({
            $or: [{ email: email || "" }, { phone: phone || "" }],
        })

        // Always respond 200 to prevent account enumeration
        if (!student) {
            return res.json({ message: "If an account exists, a reset link has been sent" })
        }

        const rawToken = crypto.randomBytes(32).toString("hex")
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")

        student.resetPasswordToken = hashedToken
        student.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30) // 30 min
        await student.save()

        const resetUrl =
            (process.env.FRONTEND_URL || "http://localhost:3000") +
            `/reset-password?token=${rawToken}`

        if (student.email && process.env.SMTP_HOST) {
            try {
                await sendEmail({
                    to: student.email,
                    subject: "Reset your CollegeProgram password",
                    text: `Reset your password within 30 minutes: ${resetUrl}`,
                    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 30 minutes.</p>`,
                })
            } catch (mailErr) {
                console.warn("Password reset email failed:", mailErr.message)
            }
        }

        const payload = { message: "If an account exists, a reset link has been sent" }
        if (process.env.NODE_ENV !== "production") {
            payload.debugToken = rawToken
        }
        res.json(payload)
    } catch (err) {
        console.error("Forgot password error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// POST /api/public/student/password/reset
// Body: { token, newPassword, confirmPassword }
router.post("/reset", async (req, res) => {
    try {
        await connectDB()
        const { token, newPassword, confirmPassword } = req.body
        if (!token || !newPassword) {
            return res.status(400).json({ error: "Token and new password are required" })
        }
        if (confirmPassword !== undefined && newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" })
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" })
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        const student = await Student.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() },
        })

        if (!student) {
            return res.status(400).json({ error: "Invalid or expired reset token" })
        }

        student.password = newPassword
        student.resetPasswordToken = undefined
        student.resetPasswordExpires = undefined
        await student.save()

        res.json({ message: "Password has been reset successfully" })
    } catch (err) {
        console.error("Reset password error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// PUT /api/public/student/password/change   (authenticated)
// Body: { currentPassword, newPassword, confirmPassword }
router.put("/change", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const { currentPassword, newPassword, confirmPassword } = req.body
        if (!currentPassword || !newPassword) {
            return res
                .status(400)
                .json({ error: "Current password and new password are required" })
        }
        if (confirmPassword !== undefined && newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" })
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" })
        }

        const student = await Student.findById(req.student._id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        const match = await student.matchPassword(currentPassword)
        if (!match) return res.status(401).json({ error: "Current password is incorrect" })

        student.password = newPassword
        await student.save()

        res.json({ message: "Password updated successfully" })
    } catch (err) {
        console.error("Change password error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router
