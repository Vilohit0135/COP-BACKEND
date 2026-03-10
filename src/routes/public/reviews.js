import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Review from "../../models/Review.js"
import { sendEmail } from "../../lib/mail.js"

const router = Router()

/**
 * @route   POST /api/public/reviews
 * @desc    Submit a new review (pending approval)
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        await connectDB()
        const { providerId, name, email, rating, title, comment } = req.body

        // Basic validation
        if (!providerId || !name || !email || !rating || !title || !comment) {
            return res.status(400).json({ error: "All fields are required" })
        }

        // Rating validation
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" })
        }

        const review = await Review.create({
            providerId,
            name,
            email,
            rating,
            title,
            comment,
            isActive: false, // Reviews are hidden until approved by admin
            source: "website_form",
        })

        // Notify Admin via Email
        try {
            const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_FROM || "admin@example.com"
            await sendEmail({
                to: adminEmail,
                subject: `New Review for Moderation: ${title}`,
                html: `
          <h3>New Review Received</h3>
          <p>A new student review has been submitted for moderation.</p>
          <hr />
          <p><strong>Reviewer:</strong> ${name} (${email})</p>
          <p><strong>Rating:</strong> ${rating}/5 ★</p>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Comment:</strong></p>
          <p>${comment}</p>
          <hr />
          <p>This review is currently <strong>Inactive</strong>. Please log in to the Admin Dashboard to approve or delete it.</p>
        `
            })
        } catch (mailErr) {
            console.error("Failed to send review notification email:", mailErr.message)
        }

        res.status(201).json({
            success: true,
            message: "Review submitted successfully. It will be visible after moderation.",
            review,
        })
    } catch (err) {
        console.error("Error submitting review:", err)
        res.status(500).json({ error: "Failed to submit review", details: err.message })
    }
})

export default router
