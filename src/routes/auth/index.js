import { Router } from "express"
import sendInviteRouter from "./sendInvite.js"
import setPasswordRouter from "./setPassword.js"

const router = Router()

router.use("/send-invite", sendInviteRouter)
router.use("/set-password", setPasswordRouter)

export default router
