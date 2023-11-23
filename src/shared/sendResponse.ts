/* eslint-disable no-undefined */
import { Response } from 'express'

type IResponse<T> = {
  success: boolean
  message?: string | null
  data: T | null
}

const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  const resData: IResponse<T> = {
    success: data?.success,
    message: data?.message || null,
    data: data?.data || null
  }

  res.json(resData)
}

export default sendResponse
