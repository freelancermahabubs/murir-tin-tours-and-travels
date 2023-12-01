/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'SomeThing went Wrong'
  const status = error.status || 'error'
  res.status(statusCode).json({
    status,
    message,
  })
}
export default globalErrorHandler
