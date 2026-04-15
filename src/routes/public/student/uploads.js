import { Router } from "express"
import { uploadImage } from "../../../middleware/upload.js"
import { uploadBuffer, deleteAsset } from "../../../lib/cloudinary.js"
import { requireStudentAuth } from "../../../middleware/studentAuth.js"

const router = Router()

// POST /api/public/student/uploads/image
router.post("/image", requireStudentAuth, uploadImage.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" })
        const folder = `cop/students/${req.student._id}`
        const result = await uploadBuffer(req.file.buffer, { folder })
        res.status(201).json(result)
    } catch (err) {
        console.error("Student upload error:", err.message)
        res.status(500).json({ error: err.message || "Upload failed" })
    }
})

// DELETE /api/public/student/uploads
// Body: { publicId }
router.delete("/", requireStudentAuth, async (req, res) => {
    try {
        const { publicId } = req.body || {}
        if (!publicId) return res.status(400).json({ error: "publicId is required" })
        // Safety: only allow deleting from this student's folder
        if (!publicId.startsWith(`cop/students/${req.student._id}/`)) {
            return res.status(403).json({ error: "Cannot delete this asset" })
        }
        const result = await deleteAsset(publicId)
        res.json(result)
    } catch (err) {
        console.error("Student upload delete error:", err.message)
        res.status(500).json({ error: err.message || "Delete failed" })
    }
})

export default router
