/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import ApiError from '../../error/ApiError'
import handleCastError from '../../error/handleCastError'
import handleValidationError from '../../error/handleValidationError'
import { iErrorMessages } from '../../interfaces/error'
import { ZodError } from 'zod'
import { handleZodError } from '../../error/handleZodError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {


  let status = 500
  let message = 'Something went wrong.'
  let errorMessages: iErrorMessages


  if (error instanceof mongoose.Error.CastError) {
    const simplified = handleCastError(error)
    status = simplified.status
    message = simplified.message
    errorMessages = simplified.errorMessages
  } 
  
  
  else if (error instanceof mongoose.Error.ValidationError) {
    const simplified = handleValidationError(error)
    status = simplified.error.code
    message = simplified.message
    error = simplified.message
  } 
  
  
  else if (error instanceof ZodError) {
    const simplified = handleZodError(error)

    console.log(simplified);
    status = simplified.error.code
    message = simplified.message
    errorMessages = simplified.error.description
  } 
  
  
  else if (error instanceof ApiError) {
    status = error.status
    message = error.message
    errorMessages = {
      code : error.status,
      message: error?.message
    }
    
  } 
  
  
  else if (error instanceof Error) {
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : []
  }


  res.status(status).json({
    success: false,
    message,
    error : {
      code : status,
      description : errorMessages
    }
  })
}

export default errorHandler
