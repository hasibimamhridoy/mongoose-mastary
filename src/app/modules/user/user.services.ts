import httpStatus from 'http-status'
import ApiError from '../../../error/ApiError'
import { IOrder, ITotalPrice, IUser } from './user.interface'
import User from './user.model'

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findOne({ userId: id }, { password: 0, orders: 0, _id: 0 })
  return result
}

const getUsers = async () => {
  const select = { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 }
  const result = await User.find({}, select)
  return result
}

const createUser = async (payload: IUser): Promise<Partial<IUser>> => {
  const isExist = await User.findOne({ email: payload.email })
  if (isExist?.userId === payload?.userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Already Exists in this Id')
  } else if (isExist?.username === payload?.username) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Already Exists in this username')
  }

  const result = await User.create(payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, orders, password, ...restData } = result.toObject()
  return restData
}

const updateUser = async (id: string, data: IUser): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findOneAndUpdate({ userId: id }, data, { new: true }).select({
    orders: 0,
    _id: 0
  })
  return result
}

const deleteUser = async (id: string): Promise<object> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }
  const result = await User.deleteOne({ userId: id })
  return result
}

const createOrder = async (id: string, data: IOrder): Promise<IUser | null> => {
  const query = { userId: id }
  const updateSet = {
    $push: { orders: data }
  }

  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findOneAndUpdate(query, updateSet, { new: true })
  return result
}

const getSingleOrder = async (id: string): Promise<IUser | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const result = await User.findOne({ userId: id }, { orders: 1, _id: 0 })
  return result
}

const getTotalPrice = async (id: string): Promise<ITotalPrice[] | null> => {
  const isExist = await User.myCustomUserFind(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const pipeline = [
    { $match: { userId: Number(id) } },

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
      $project: { _id: 0 }
    }
  ]
  const result = await User.aggregate(pipeline)
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
