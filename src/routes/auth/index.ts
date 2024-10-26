import express from 'express'
import { signupRouter } from './signup'
const router = express.Router()

router.use(signupRouter)

export default router
