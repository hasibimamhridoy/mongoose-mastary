import { Model } from "mongoose"

export type IOrder = {
  productName: string
  price: number
  quantity: number
}

export type IUser = {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders?: IOrder[]
}

export type IUserModel = {
  hashGenerator(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
} & Model<IUser>