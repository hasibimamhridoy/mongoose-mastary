import express, { Application } from 'express'
import cors from 'cors'
import errorHandler from './app/middleware/errorHandler'
import { routeErrorHandle } from './app/middleware/404RouteErrorHandle'
import cookieParser from 'cookie-parser'
import { UserRoutes } from './app/modules/user/user.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use('/api/users', UserRoutes.userRouter)


//global
app.use(errorHandler)

// 404 Route Handler
app.use(routeErrorHandle)

export default app
