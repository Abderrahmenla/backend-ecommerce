import express from 'express'
import { currentUser } from '@/middlewares/current-user'

const router = express.Router()

router.get('/auth/current-user', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null })
})
