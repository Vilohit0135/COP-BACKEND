import { Router } from "express"
import { connectDB } from "../../lib/db.js"
import Page from "../../models/Page.js"
import PageContent from "../../models/PageContent.js"

const router = Router()

// GET /api/public/page-content/:slug — all content for a published page
router.get("/:slug", async (req, res) => {
  try {
    await connectDB()

    const page = await Page.findOne({ slug: req.params.slug, isPublished: true }).lean()
    if (!page) return res.status(404).json({ error: "Page not found" })

    const rawItems = await PageContent.find({ pageSlug: req.params.slug })
      .sort({ sectionApiId: 1, itemIndex: 1 })

    // Backfill sectionApiId for legacy records
    const contentItems = rawItems.map((item) => {
      if (!item.sectionApiId && typeof item.sectionIndex === "number") {
        const sec = page.sections[item.sectionIndex]
        if (sec?.apiIdentifier) {
          item = item.toObject()
          item.sectionApiId = sec.apiIdentifier
        }
      }
      return item
    })

    res.json({ page, content: contentItems })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch page content", details: err.message })
  }
})

export default router
