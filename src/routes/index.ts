import express from 'express'
import userRouter from './client'
import authRouter from './auth'
const router = express.Router()

router.use(userRouter)
router.use(authRouter)

export default router
