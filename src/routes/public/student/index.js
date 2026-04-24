import { Router } from "express"
import signupRouter from "./signup.js"
import loginRouter from "./login.js"
import passwordRouter from "./password.js"
import accountRouter from "./account.js"
import profileRouter from "./profile.js"
import photoRouter from "./photo.js"
import uploadsRouter from "./uploads.js"
import shortlistRouter from "./shortlist.js"
import googleAuthRouter from "./googleAuth.js"

const router = Router()

router.use("/signup", signupRouter)
router.use("/login", loginRouter)
router.use("/password", passwordRouter)
router.use("/account", accountRouter)
router.use("/profile", profileRouter)
router.use("/photo", photoRouter)
router.use("/uploads", uploadsRouter)
router.use("/shortlist", shortlistRouter)
router.use("/google-auth", googleAuthRouter)

export default router
