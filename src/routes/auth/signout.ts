import express from 'express'

const router = express.Router()

router.post('/auth/signout', (req, res) => {
  req.session = null
  res.send('signed out')
})

export { router as signoutRouter }
