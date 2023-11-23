import { Request, Response } from 'express'
import httpStatus from 'http-status'
export const routeErrorHandle = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    error: [
      {
        path: req.originalUrl,
        description: 'API Not Found'
      }
    ]
  })
}
