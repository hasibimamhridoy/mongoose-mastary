import express from 'express'
import validateRequestMiddleWare from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'

const userRouter = express.Router()

userRouter.get('/:id', UserController.getSingleUser)
userRouter.get('/', UserController.getUsers)
userRouter.get('/:id/orders', UserController.getSingleOrder)
userRouter.get('/:id/orders/total-price', UserController.getTotalPrice)

userRouter.post(
  '/',
  validateRequestMiddleWare(UserValidation.createUserZodSchema),
  UserController.createUser
)


userRouter.put(
  '/:id',
  validateRequestMiddleWare(UserValidation.updateUserZodSchema),
  UserController.updateUser
)

userRouter.delete('/:id', UserController.deleteUser)

userRouter.put(
  '/:id/orders',
  validateRequestMiddleWare(UserValidation.createOrderZodSchemaForCreateOnly),
  UserController.createOrder
)

export const UserRoutes = {
  userRouter
}
