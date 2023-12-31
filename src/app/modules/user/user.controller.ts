import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IOrder, IUser } from './user.interface'
import { UserServices } from './user.services'

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id: string = req?.params?.id

  const result = await UserServices.getSingleUser(id)
  const responseData = {
    success: true,
    message: 'User fetched successfully!',
    data: result
  }
  sendResponse<IUser>(res, responseData)
})
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUsers()
  const responseData = {
    success: true,
    message: 'Users fetched successfully!',
    data: result
  }
  sendResponse<IUser[]>(res, responseData)
})

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IUser = req.body
  const result = await UserServices.createUser(payload)
  const responseData = {
    success: true,
    message: 'User created successfully',
    data: result
  }
  sendResponse(res, responseData)
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id: string = req?.params?.id
  const data: IUser = req?.body

  const result = await UserServices.updateUser(id, data)
  const responseData = {
    success: true,
    message: 'User updated successfully!',
    data: result
  }
  sendResponse<IUser>(res, responseData)
})
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id: string = req?.params?.id

  const result = await UserServices.deleteUser(id)
  const responseData = {
    success: true,
    message: 'User deleted successfully!',
    data: null
  }

  if (result) {
    sendResponse<IUser>(res, responseData)
  }
})

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload: IOrder = req.body
  const result = await UserServices.createOrder(id, payload)
  const responseData = {
    success: true,
    message: 'Order created successfully!',
    data: null
  }
  if (result) {
    sendResponse(res, responseData)
  }
})

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id: string = req?.params?.id

  const result = await UserServices.getSingleOrder(id)
  const responseData = {
    success: true,
    message: 'Order fetched successfully!',
    data: result
  }
  sendResponse<IUser>(res, responseData)
})

const getTotalPrice = catchAsync(async (req: Request, res: Response) => {
  const id: string = req?.params?.id

  const result = await UserServices.getTotalPrice(id)
  const responseData = {
    success: true,
    message: 'Total price calculated successfully!',
    data: result
  }
  sendResponse<IUser>(res, responseData)
})

export const UserController = {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  deleteUser,
  createOrder,
  getSingleOrder,
  getTotalPrice
}
