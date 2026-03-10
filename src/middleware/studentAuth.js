import jwt from "jsonwebtoken"
import Student from "../models/Student.js"
import { connectDB } from "../lib/db.js"

export async function requireStudentAuth(req, res, next) {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            // Decode token using secret (already in .env)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            await connectDB()

            // Find student by ID from token payload
            req.student = await Student.findById(decoded.id).select("-password")

            if (!req.student) {
                return res.status(401).json({ error: "Unauthorized: Access denied for students" })
            }

            if (!req.student.isActive) {
                return res.status(403).json({ error: "Access denied: Account is inactive" })
            }

            next()
        } catch (err) {
            console.error("Student Auth Error:", err.message)
            return res.status(401).json({ error: "Unauthorized: Invalid or expired student token" })
        }
    }

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" })
    }
}

// Optional auth: tries to find student but doesn't block if not found
export async function optionalStudentAuth(req, res, next) {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            await connectDB()
            req.student = await Student.findById(decoded.id).select("-password")
        } catch (err) {
            // Still proceed as guest
            console.warn("Optional Auth: Token verification skipped", err.message)
        }
    }

    next()
}
