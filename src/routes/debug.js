import { Router } from "express"
import { connectDB } from "../lib/db.js"
import User from "../models/User.js"
import { withClerk } from "../middleware/auth.js"

const router = Router()

// GET /api/debug/user-info — get current logged-in user's info
router.get("/user-info", withClerk, async (req, res) => {
  try {
    const { userId } = req.auth

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user authenticated" })
    }

    await connectDB()

    // Find user in database by Clerk ID
    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      // If user doesn't exist in database yet, return minimal info from Clerk token
      return res.json({
        id: userId,
        name: "Unknown",
        email: req.auth.email || "",
        role: "user",
        access: [],
      })
    }

    res.json({
      id: user._id,
      clerkId: user.clerkId,
      name: user.name || "Unknown",
      email: user.email,
      role: user.role,
      access: user.access || [],
    })
  } catch (err) {
    console.error("Error fetching user info:", err)
    res.status(500).json({ error: "Failed to fetch user info" })
  }
})

export default router
