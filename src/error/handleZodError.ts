import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'
import { iErrorMessages } from '../interfaces/error'

export const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errorMessages: iErrorMessages[] = error?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message
    }
  })

  return {
    success: false,
    message: 'Validation Error from zod',
    error : {
      code : 400,
      description : errorMessages
    }
  }
}
