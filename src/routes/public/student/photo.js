import { Router } from "express"
import Student from "../../../models/Student.js"
import { connectDB } from "../../../lib/db.js"
import { requireStudentAuth } from "../../../middleware/studentAuth.js"
import { sanitizeStudent } from "../../../lib/studentToken.js"
import { deleteAsset } from "../../../lib/cloudinary.js"

const router = Router()

const isValidPhotoUrl = (v) => {
    if (typeof v !== "string" || !v.trim()) return false
    return /^https?:\/\//i.test(v) || v.startsWith("/") || v.startsWith("data:image/")
}

// GET /api/public/student/photo — get current profile photo URL
router.get("/", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = await Student.findById(req.student._id).select("profilePhoto")
        if (!student) return res.status(404).json({ error: "Student not found" })
        res.json({ profilePhoto: student.profilePhoto || null })
    } catch (err) {
        console.error("Photo get error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// POST /api/public/student/photo — add/set profile photo (when none exists or overwrite)
// Body: { profilePhoto: "<url | data:image/... >" }
router.post("/", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const { profilePhoto, profilePhotoPublicId } = req.body || {}
        if (!isValidPhotoUrl(profilePhoto)) {
            return res
                .status(400)
                .json({ error: "profilePhoto must be a valid URL or data URI" })
        }

        const student = await Student.findById(req.student._id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        // If replacing, delete the previous Cloudinary asset (best-effort)
        if (student.profilePhotoPublicId && student.profilePhotoPublicId !== profilePhotoPublicId) {
            try { await deleteAsset(student.profilePhotoPublicId) } catch (e) { console.warn("Old photo delete failed:", e.message) }
        }
        student.profilePhoto = profilePhoto.trim()
        student.profilePhotoPublicId = profilePhotoPublicId || undefined
        await student.save()
        res.status(201).json({
            message: "Profile photo set",
            profilePhoto: student.profilePhoto,
            student: sanitizeStudent(student),
        })
    } catch (err) {
        console.error("Photo set error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// PUT /api/public/student/photo — update profile photo
// Body: { profilePhoto }
router.put("/", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const { profilePhoto, profilePhotoPublicId } = req.body || {}
        if (!isValidPhotoUrl(profilePhoto)) {
            return res
                .status(400)
                .json({ error: "profilePhoto must be a valid URL or data URI" })
        }

        const student = await Student.findById(req.student._id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        // If replacing, delete the previous Cloudinary asset (best-effort)
        if (student.profilePhotoPublicId && student.profilePhotoPublicId !== profilePhotoPublicId) {
            try { await deleteAsset(student.profilePhotoPublicId) } catch (e) { console.warn("Old photo delete failed:", e.message) }
        }
        student.profilePhoto = profilePhoto.trim()
        student.profilePhotoPublicId = profilePhotoPublicId || undefined
        await student.save()
        res.json({
            message: "Profile photo updated",
            profilePhoto: student.profilePhoto,
            student: sanitizeStudent(student),
        })
    } catch (err) {
        console.error("Photo update error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// DELETE /api/public/student/photo — remove profile photo
router.delete("/", requireStudentAuth, async (req, res) => {
    try {
        await connectDB()
        const student = await Student.findById(req.student._id)
        if (!student) return res.status(404).json({ error: "Student not found" })

        if (student.profilePhotoPublicId) {
            try { await deleteAsset(student.profilePhotoPublicId) } catch (e) { console.warn("Photo delete failed:", e.message) }
        }
        student.profilePhoto = undefined
        student.profilePhotoPublicId = undefined
        await student.save()
        res.json({ message: "Profile photo removed" })
    } catch (err) {
        console.error("Photo delete error:", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router
