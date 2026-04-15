import { Router } from "express"
import { uploadImage } from "../../middleware/upload.js"
import { uploadBuffer, deleteAsset } from "../../lib/cloudinary.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// POST /api/admin/uploads/image
// multipart/form-data, field: "file", optional "folder"
router.post("/image", uploadImage.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" })
        const folder = (req.body.folder || "cop/admin").toString()
        const result = await uploadBuffer(req.file.buffer, { folder })
        res.status(201).json(result)
    } catch (err) {
        console.error("Admin upload error:", err.message)
        res.status(500).json({ error: err.message || "Upload failed" })
    }
})

// DELETE /api/admin/uploads/:publicId*
// (use encoded publicId in body to avoid slash issues: { publicId })
router.delete("/", async (req, res) => {
    try {
        const { publicId } = req.body || {}
        if (!publicId) return res.status(400).json({ error: "publicId is required" })
        const result = await deleteAsset(publicId)
        res.json(result)
    } catch (err) {
        console.error("Admin upload delete error:", err.message)
        res.status(500).json({ error: err.message || "Delete failed" })
    }
})

export default router
