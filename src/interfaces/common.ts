import { iErrorMessages } from './error'

export type IGenericErrorResponse = {
  success: boolean
  message: string
  error : {
    code : number
    description: iErrorMessages
  }
}
