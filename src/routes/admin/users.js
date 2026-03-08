import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import User from "../../models/User.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// GET /api/admin/users — list all active users
router.get("/", async (req, res) => {
  try {
    await connectDB()

    const users = await User.find({ isActive: true })
      .select("clerkId _id email role access isActive createdAt")
      .lean()

    const mappedUsers = users.map((u) => ({
      userId: u.clerkId || String(u._id),
      userName: u.email?.split("@")[0] || u.email,
      userEmail: u.email,
      role: u.role,
      access: u.access || [],
    }))

    res.json({ users: mappedUsers })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/admin/users/:id — update user access/role/status by clerkId
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { access, isActive, role } = req.body

    if (!id) return res.status(400).json({ error: "User ID is required" })

    await connectDB()

    const updateData = {}
    if (access !== undefined) updateData.access = access
    if (isActive !== undefined) updateData.isActive = isActive
    if (role !== undefined) updateData.role = role

    const user = await User.findOneAndUpdate({ clerkId: id }, updateData, { new: true })
    if (!user) return res.status(404).json({ error: "User not found" })

    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        userId: user.clerkId,
        email: user.email,
        role: user.role,
        access: user.access,
        isActive: user.isActive,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/admin/users/:id — delete user by clerkId
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: "User ID is required" })

    await connectDB()

    const user = await User.findOneAndDelete({ clerkId: id })
    if (!user) return res.status(404).json({ error: "User not found" })

    res.json({ success: true, message: `User ${user.email} has been deleted` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
