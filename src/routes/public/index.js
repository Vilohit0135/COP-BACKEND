import { Router } from "express"
import leadsRouter from "./leads.js"
import providersRouter from "./providers.js"
import reviewsRouter from "./reviews.js"
import pageContentRouter from "./pageContent.js"
import studentAuthRouter from "./studentAuth.js"

const router = Router()

// Public lead form submission
router.use("/leads", leadsRouter)

// Public review submission
router.use("/reviews", reviewsRouter)

// Public provider listings
router.use("/providers", providersRouter)


// Public page content
router.use("/page-content", pageContentRouter)

// Student Auth Profile & Signup
router.use("/student", studentAuthRouter)

export default router
