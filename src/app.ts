/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'

import cors from 'cors'

import globalErrorHandler from './middlewares/globalErrorHandler'
import notFound from './middlewares/notFound'
// import globalRoute from './routes'

import globalRoute from './routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

app.use('/api/v1', globalRoute)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Murir Tin Tours and Travels',
  })
})

// catch all route trying to catch a not found route

// controller approach
// way -1
// app.all('*', (req: Request, res: Response) => {

//   res.status(404).json({
//     status: 'fail',
//     message: `Route Not Found ${req.originalUrl}`,
//   })
// })

// way - 2
// app.all('*', notFound)

// middleware approach

// app.use("*", notFound)
app.use(notFound)

// global error handler
app.use(globalErrorHandler)
export default app

// mvc  moduler
