import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Blog from "../../models/Blog.js"

const router = Router()

// GET /api/public/blogs — list all published blogs
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const blogs = await Blog.find({ isPublished: true })
      .select("title slug excerpt coverImage author tags category publishedAt createdAt")
      .sort({ publishedAt: -1, createdAt: -1 })

    res.json(blogs)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs", details: err.message })
  }
})

// GET /api/public/blogs/:slug — single published blog
router.get("/:slug", async (req, res) => {
  try {
    await connectDB()
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
    if (!blog) return res.status(404).json({ error: "Blog not found" })
    res.json(blog)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog", details: err.message })
  }
})

export default router
