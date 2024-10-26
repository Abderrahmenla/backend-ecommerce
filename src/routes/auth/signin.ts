import express, { Response, Request } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '@/errors/bad-request-error'
import { validationRequest } from '@/middlewares/validate-request'
import { PrismaClient } from '@prisma/client'
import { Password } from '@/utils'

const prisma = new PrismaClient()

const router = express.Router()

router.post(
  '/auth/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters')
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[@$!%*?&]/)
      .withMessage(
        'Password must contain at least one special character (@, $, !, %, *, ?, &)'
      ),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const existUser = await prisma.user.findFirst({ where: { email } })
      if (!existUser) {
        throw new BadRequestError('Invalid credentials')
      }
      const passwordsMatch = await Password.compare(existUser.email, password)
      if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials')
      }
      const token = jwt.sign(
        { id: existUser.userID, email: existUser.email },
        process.env.JWT_KEY!
      )
      req.session = {
        jwt: token,
      }
      res.status(201).send(existUser)
    } catch (error) {
      console.error(error)
      throw new BadRequestError('Something went wrong')
    }
  }
)
