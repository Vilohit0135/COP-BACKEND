import { Router } from "express"
import leadsRouter from "./leads.js"
import providersRouter from "./providers.js"
import blogsRouter from "./blogs.js"
import pageContentRouter from "./pageContent.js"

const router = Router()

// Public lead form submission
router.use("/leads", leadsRouter)

// Public provider listings
router.use("/providers", providersRouter)

// Public blog listings
router.use("/blogs", blogsRouter)

// Public page content
router.use("/page-content", pageContentRouter)

export default router
