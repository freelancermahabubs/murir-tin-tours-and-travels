/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { TErrorResponse } from '../../types/TErrorResponse'
import handlerDuplicateError from './handleDuplicateError'
import handleValidationError from './handlerValidationError'
import handlerCastError from './handlerCastError'
import handlerGenericError from './handlerGenericError'
import GenericError from '../../classes/errorClasses/GenericError'
import { ZodError } from 'zod'
import handlerZodError from './handleZodError'

const errorPreproccesor = (error: any): TErrorResponse => {
  if (error instanceof ZodError) {
    return handlerZodError(error)
  } else if (error instanceof mongoose.Error.ValidationError) {
    return handleValidationError(error)
  } else if (error.code && error.code === 11000) {
    return handlerDuplicateError(error)
  } else if (error instanceof mongoose.Error.CastError) {
    return handlerCastError(error)
  } else if (error instanceof GenericError) {
    return handlerGenericError(error)
  } else {
    return {
      statusCode: 500,
      status: 'error',
      message: 'Unknown Error',
      issues: [
        {
          path: '',
          message: error.message,
        },
      ],
    }
    // errorResponse = handlerGenericError(err)
  }
}

export default errorPreproccesor