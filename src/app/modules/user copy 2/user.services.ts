
import { IUser } from './user.interface'
import User from './user.model'

const getSingleUser = async (id: string): Promise<IUser | null> => {
  
  const result = await User.findById(id,{password:0})
  return result
}

const getUsers = async () => {


  const select = {username:1,fullName:1,age:1,email:1,address:1}
  const result = await User.find({},select)
  return result
}

const createUser = async (payload: IUser): Promise<Partial<IUser>> => {
  const result = await User.create(payload);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restData } = result.toObject()
  return restData
}

const updateUser = async (id: string, data: IUser): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, data, { new: true })
  return result
}
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserServices = {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  deleteUser
}
