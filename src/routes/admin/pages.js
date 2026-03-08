import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Page from "../../models/Page.js"
import PageContent from "../../models/PageContent.js"
import { logActivity } from "../../lib/activityLogger.js"
import { getClerkUserInfo } from "../../lib/clerkHelper.js"
import { withClerk, requireAdminAuth } from "../../middleware/auth.js"

const router = Router()
router.use(withClerk)
router.use(requireAdminAuth)

// ── Pages ─────────────────────────────────────────────────────────────────────

// GET /api/admin/pages
router.get("/", async (req, res) => {
  try {
    await connectDB()
    const pages = await Page.find().sort({ createdAt: -1 })
    res.json(pages)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pages", details: err.message })
  }
})

// POST /api/admin/pages
router.post("/", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    if (!body.title || !body.slug) {
      return res.status(400).json({ error: "Title and slug are required" })
    }

    const existing = await Page.findOne({ slug: body.slug })
    if (existing) return res.status(400).json({ error: "Slug already exists" })

    const page = await Page.create({
      title: body.title,
      slug: body.slug,
      description: body.description || "",
      sections: [],
      isPublished: false,
    })

    await logActivity({
      userId, userName, userEmail,
      action: "create", section: "pages",
      itemId: page._id, itemName: page.title,
      details: `Created new page: ${page.title}`,
    })

    res.status(201).json(page)
  } catch (err) {
    res.status(500).json({ error: "Failed to create page", details: err.message })
  }
})

// GET /api/admin/pages/:slug
router.get("/:slug", async (req, res) => {
  try {
    await connectDB()
    const page = await Page.findOne({ slug: req.params.slug })
    if (!page) return res.status(404).json({ error: "Page not found" })
    res.json(page)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch page", details: err.message })
  }
})

// PUT /api/admin/pages/:slug
router.put("/:slug", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const body = req.body

    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title: body.title,
        description: body.description,
        sections: body.sections,
        isPublished: body.isPublished,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )

    if (!page) return res.status(404).json({ error: "Page not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "update", section: "pages",
      itemId: page._id, itemName: page.title,
      details: `Updated page: ${page.title}`,
    })

    res.json(page)
  } catch (err) {
    res.status(500).json({ error: "Failed to update page", details: err.message })
  }
})

// DELETE /api/admin/pages/:slug
router.delete("/:slug", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)

    const page = await Page.findOneAndDelete({ slug: req.params.slug })
    if (!page) return res.status(404).json({ error: "Page not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "pages",
      itemId: page._id, itemName: page.title,
      details: `Deleted page: ${page.title}`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete page", details: err.message })
  }
})

// ── Page Content ──────────────────────────────────────────────────────────────

// GET /api/admin/pages/:slug/content
router.get("/:slug/content", async (req, res) => {
  try {
    await connectDB()
    const { slug } = req.params

    const page = await Page.findOne({ slug }).lean()
    const rawItems = await PageContent.find({ pageSlug: slug }).sort({
      sectionApiId: 1,
      itemIndex: 1,
    })

    // Backfill sectionApiId for old records
    const contentItems = rawItems.map((item) => {
      if (!item.sectionApiId && typeof item.sectionIndex === "number" && page) {
        const sec = page.sections[item.sectionIndex]
        if (sec?.apiIdentifier) {
          item = item.toObject()
          item.sectionApiId = sec.apiIdentifier
        }
      }
      return item
    })

    res.json(contentItems)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch page content", details: err.message })
  }
})

// POST /api/admin/pages/:slug/content
router.post("/:slug/content", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const { slug } = req.params
    let { sectionApiId, itemIndex = 0, values, originalItemIndex, sectionIndex } = req.body

    const page = await Page.findOne({ slug })
    if (!page) return res.status(404).json({ error: "Page not found" })

    // Convert sectionIndex → sectionApiId if needed
    if (!sectionApiId && typeof sectionIndex !== "undefined") {
      const sec = page.sections[sectionIndex]
      if (sec?.apiIdentifier) sectionApiId = sec.apiIdentifier
    }

    let content = null
    let action = "create"

    if (originalItemIndex !== undefined && originalItemIndex !== itemIndex) {
      content = await PageContent.findOne({ pageSlug: slug, sectionApiId, itemIndex: originalItemIndex })
    }
    if (!content) {
      content = await PageContent.findOne({ pageSlug: slug, sectionApiId, itemIndex })
    }

    if (content) {
      content.values = values
      if (originalItemIndex !== undefined && originalItemIndex !== itemIndex) {
        content.itemIndex = itemIndex
      }
      action = "update"
    } else {
      content = new PageContent({ pageSlug: slug, sectionApiId, itemIndex, values })
    }

    await content.save()

    await logActivity({
      userId, userName, userEmail,
      action, section: "page-content",
      itemName: page.title,
      details: `${action}d content for page "${page.title}" section ${sectionApiId}`,
    })

    res.status(201).json(content)
  } catch (err) {
    res.status(500).json({ error: "Failed to save page content", details: err.message })
  }
})

// DELETE /api/admin/pages/:slug/content
router.delete("/:slug/content", async (req, res) => {
  try {
    await connectDB()
    const { userId, userName, userEmail } = await getClerkUserInfo(req.clerkUserId)
    const { slug } = req.params
    let { sectionApiId, itemIndex = 0, sectionIndex } = req.body

    const page = await Page.findOne({ slug })
    if (!page) return res.status(404).json({ error: "Page not found" })

    if (!sectionApiId && typeof sectionIndex !== "undefined") {
      const sec = page.sections[sectionIndex]
      if (sec?.apiIdentifier) sectionApiId = sec.apiIdentifier
    }

    const result = await PageContent.deleteOne({ pageSlug: slug, sectionApiId, itemIndex })
    if (result.deletedCount === 0) return res.status(404).json({ error: "Content not found" })

    await logActivity({
      userId, userName, userEmail,
      action: "delete", section: "page-content",
      itemName: page.title,
      details: `Deleted content for page "${page.title}" section ${sectionApiId}`,
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete page content", details: err.message })
  }
})

export default router
