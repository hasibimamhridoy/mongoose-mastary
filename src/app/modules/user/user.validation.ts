import { AnyZodObject, z } from 'zod'

const createAddressZodSchema: AnyZodObject = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' })
})

const createFullNameZodSchema: AnyZodObject = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' })
})

const createOrderZodSchema: AnyZodObject = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' })
})

const createUserZodSchema: AnyZodObject = z.object({
  body: z.object({
    userId: z.number({ required_error: 'User ID is required' }),
    username: z.string({ required_error: 'Username is required' }),
    password: z.string({ required_error: 'Password is required' }),
    fullName: createFullNameZodSchema,
    age: z.number({ required_error: 'Age is required' }),
    email: z.string({ required_error: 'Email is required' }),
    isActive: z.boolean({ required_error: 'isActive is required' }),
    hobbies: z.array(z.string({ required_error: 'Hobbies are required' })),
    address: createAddressZodSchema,
    orders: z.array(createOrderZodSchema).optional()
  })
})

const updateUserZodSchema: AnyZodObject = z.object({
  userId: z.number({ required_error: 'User ID is required' }).optional(),
  username: z.string({ required_error: 'Username is required' }).optional(),
  password: z.string({ required_error: 'Password is required' }).optional(),
  fullName: createFullNameZodSchema.optional(),
  age: z.number({ required_error: 'Age is required' }).optional(),
  email: z.string({ required_error: 'Email is required' }).optional(),
  isActive: z.boolean({ required_error: 'isActive is required' }).optional(),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })).optional(),
  address: createAddressZodSchema.optional(),
  orders: z.array(createOrderZodSchema).optional()
})

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema
}
