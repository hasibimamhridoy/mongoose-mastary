import httpStatus from 'http-status'
import ApiError from '../../../error/ApiError'
import { IOrder, IUser } from './user.interface'
import User from './user.model'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findById(id, { password: 0, orders: 0 })
  return result
}

const getUsers = async () => {
  const select = { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  const result = await User.find({}, select)
  return result
}

const createUser = async (payload: IUser): Promise<Partial<IUser>> => {
  
  const isExist = await User.findOne({userName : payload.email})
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Already Exists in this email address') 
  }
  
  
  const result = await User.create(payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { orders ,password, ...restData } = result.toObject()
  return restData
}

const updateUser = async (id: string, data: IUser): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findByIdAndUpdate(id, data, { new: true })
  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }
  const result = await User.findByIdAndDelete(id)
  return result
}

const createOrder = async (id: string, data: IOrder): Promise<IUser | null> => {
  const query = { _id: id }
  const updateSet = {
    $push: { orders: data }
  }

  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findByIdAndUpdate(query, updateSet, { new: true })
  return result
}

const getSingleOrder = async (id: string): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findById(id, { orders: 1, _id: 0 })
  return result
}

const getTotalPrice = async (id: string): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const pipeline = [
    {
      $match: {
        _id: new ObjectId(id)
      }
    },
    {
      $unwind: '$orders'
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: '$orders.price'
        }
      }
    },
    {
      $project: {_id:0}
    },
  ]
  const result = await User.aggregate(pipeline)

  console.log(result)
  return result
}

export const UserServices = {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  deleteUser,
  createOrder,
  getSingleOrder,
  getTotalPrice
}
