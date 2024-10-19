import { Request, Response } from 'express'
const getUser = (req: Request, res: Response) => {
  res.send('these are the user informations')
}

export { getUser }
