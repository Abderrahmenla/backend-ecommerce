import express from 'express'
import { getUser } from './service'
const router = express.Router()

router.get('/user', getUser)
export default router
