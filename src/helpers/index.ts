import { NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

export const handleException = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(`Prisma Error: ${error.message}`)
    return res
      .status(500)
      .json({
        message: `Prisma Error: ${error.message}`,
        status: 500,
        error: error,
      })
  }
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error('An unknown error occurred')
    return res
      .status(500)
      .json({ message: 'An unknown error occurred', status: 500, error: error })
  }
  return res
    .status(500)
    .json({ message: error.message, status: 500, error: error })
}
