/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'
import config from '../config'
import errorPreproccesor from '../helpers/errorHelpers/errroPreprocessor'
import { TErrorResponse } from '../types/TErrorResponse'

/* eslint-disable @typescript-eslint/no-explicit-any */
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // let statusCode = err.statusCode || 500
  // let message =
  // let status = err.status || 'error'

  let errorResponse: TErrorResponse = {
    //Fallback error response
    statusCode: error.statusCode || 500,
    status: error.status || 'error',
    message: error.message || 'Something went wrong',
    issues: error.issues || [],
  }

  errorResponse = errorPreproccesor(error)
  // Sob error er Baap hocche JS Error Class

  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    issues: errorResponse.issues,
    //only in NODE_ENV=development
    stack: config.node_env === 'development' ? error.stack : undefined,
    error: error,
  })
}

export default globalErrorHandler

//Error Pattern
// statusCode
//status
//message
//issues