import express from 'express'
import validateRequestMiddleWare from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'

const userRouter = express.Router()

userRouter.get('/:id', UserController.getSingleUser)
userRouter.get('/', UserController.getUsers)

userRouter.post(
  '/',
  validateRequestMiddleWare(UserValidation.createUserZodSchema),
  UserController.createUser
)

userRouter.patch(
  '/:id',
  validateRequestMiddleWare(UserValidation.updateUserZodSchema),
  UserController.updateUser
)

userRouter.delete('/:id', UserController.deleteUser)

export const UserRoutes = {
  userRouter
}
