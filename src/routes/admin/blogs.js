import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Blog from "../../models/Blog.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

const slugify = (str = "") =>
  str.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")

async function uniqueSlug(base, excludeId = null) {
  if (!base) base = Date.now().toString()
  let slug = base
  let i = 0
  const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug }
  while (await Blog.findOne(query)) {
    i++
    slug = `${base}-${i}`
    query.slug = slug
  }
  return slug
}

// GET /api/admin/blogs
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs", details: err.message })
  }
})

// POST /api/admin/blogs
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    if (!body.title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const base = slugify(body.slug || body.title)
    const slug = await uniqueSlug(base)

    const blog = await Blog.create({ ...body, slug })

    await logActivity({
      userId, userName, userEmail,
      action: "create", section: "blogs",
      itemId: blog._id, itemName: blog.title,
      details: `Created new blog: ${blog.title}`,
    })

    res.status(201).json(blog)
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog", details: err.message })
  }
})

// GET /api/admin/blogs/:slug
router.get("/:slug", async (req, res) => {
  try {
    await connectDB()
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (!blog) return res.status(404).json({ error: "Blog not found" })
    res.json(blog)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog", details: err.message })
  }
})

// PUT /api/admin/blogs/:slug
router.put("/:slug", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    if (body.title || body.slug) {
      const base = slugify(body.slug || body.title)
      const existing = await Blog.findOne({ slug: req.params.slug })
      body.slug = await uniqueSlug(base, existing?._id)
    }

    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      body,
      { new: true, runValidators: true }
    )

    if (!blog) return res.status(404).json({ error: "Blog not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "blogs",
      itemId: blog._id, itemName: blog.title,
      details: `Updated blog: ${blog.title}`,
    })

    res.json(blog)
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog", details: err.message })
  }
})

// DELETE /api/admin/blogs/:slug
router.delete("/:slug", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const blog = await Blog.findOneAndDelete({ slug: req.params.slug })
    if (!blog) return res.status(404).json({ error: "Blog not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "blogs",
      itemId: blog._id, itemName: blog.title,
      details: `Deleted blog: ${blog.title}`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog", details: err.message })
  }
})

export default router
