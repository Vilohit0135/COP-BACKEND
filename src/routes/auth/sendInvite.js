import { Router } from "express"
import { sendEmail } from "../../lib/mail.js"
import crypto from "crypto"
import Invite from "../../models/Invite.js"
import { connectDB } from "../../lib/db.js"

const router = Router()

// POST /api/auth/send-invite
router.post("/", async (req, res) => {
  try {
    await connectDB()

    const { email, access = [], role = "viewer" } = req.body

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    // Generate raw token (sent in email) + hash (stored in DB)
    const rawToken = crypto.randomBytes(32).toString("hex")
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex")
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000) // 72 hours

    // Upsert invite
    const invite = await Invite.findOneAndUpdate(
      { email },
      {
        access,
        role,
        passwordSetupTokenHash: tokenHash,
        passwordSetupExpiresAt: expiresAt,
        status: "pending",
      },
      { upsert: true, new: true }
    )

    const baseUrl = process.env.APP_URL || "http://localhost:3000"
    const setPasswordLink = `${baseUrl}/set-password?email=${encodeURIComponent(email)}&token=${rawToken}`

    await sendEmail({
      to: email,
      subject: "You are invited to COP CMS Admin",
      html: `
        <h2>You've been invited to COP CMS</h2>
        <p>You were invited to join the admin dashboard.</p>
        <p><a href="${setPasswordLink}">Set your password here</a> (valid for 72 hours)</p>
        <p>If the link doesn't work, copy this token on the Set Password page:</p>
        <code style="font-size:12px;word-break:break-all;background:#f0f0f0;padding:8px;display:block;">
          ${rawToken}
        </code>
      `,
    })

    res.status(201).json({
      success: true,
      message: "Invitation sent successfully",
      invite: {
        email: invite.email,
        role: invite.role,
        access: invite.access,
        status: invite.status,
      },
    })
  } catch (err) {
    console.error("❌ Send invite error:", err.message)
    res.status(500).json({ error: "Failed to send invitation" })
  }
})

export default router
