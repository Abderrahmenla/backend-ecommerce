import express, { Response, Request } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '@/errors/bad-request-error'
import { validationRequest } from '@/middlewares/validate-request'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = express.Router()

router.post(
  '/auth/signup',
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
    body('phoneNumber')
      .trim()
      .matches(/^[+\d][\d]{0,19}$/)
      .withMessage(
        'Phone number must contain only numbers and can optionally start with +'
      )
      .isLength({ max: 20 })
      .withMessage('Phone number must be no more than 20 characters'),
    body('address')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Address must be no more than 50 characters'),
    body('name')
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Name must be between 1 and 50 characters'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    try {
      const { email, password, name, address, phoneNumber } = req.body

      const existUser = await prisma.user.findFirst({
        where: {
          email,
        },
      })
      if (existUser) {
        throw new BadRequestError('Email already exists')
      }
      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
          address,
          phoneNumber,
          dateJoined: new Date(),
        },
      })
      const userJwt = jwt.sign(
        { id: user.userID, email: user.email },
        process.env.JWT_KEY!
      )
      req.session = {
        jwt: userJwt,
      }

      res.status(201).json(user)
    } catch (error) {
      console.error(error)
      throw new BadRequestError('Something went wrong')
    }
  }
)

export { router as signupRouter }
