import express from 'express'
import userRouter from './client'

const router = express.Router()

router.use(userRouter)

export default router
