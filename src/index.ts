import dotenv from 'dotenv'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { handleException } from './helpers'
import router from './routes'
import { NotFoundError } from './errors/not-found-error'
import cookieSession from 'cookie-session'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
)
app.use(router)
app.use(handleException)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError()
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
