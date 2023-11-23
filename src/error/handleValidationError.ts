import mongoose from 'mongoose'
import { iErrorMessages } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (error: mongoose.Error.ValidationError): IGenericErrorResponse => {
  const errorMessages: iErrorMessages[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message
      }
    }
  )

  return {
    success : false,
    message: 'Validation Error',
    error : {
      code : 400,
      description : errorMessages
    }
  }
}

export default handleValidationError
