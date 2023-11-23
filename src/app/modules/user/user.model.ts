import { Schema, model } from 'mongoose'
import { IOrder, IUser, IUserModel } from './user.interface'
import bcrypt from 'bcrypt'

const OrderSchema: Schema<IOrder> = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
})

const UserSchema: Schema<IUser, IUserModel> = new Schema<IUser, IUserModel>(
  {
    userId: { type: Number, required: true  },
    username: { type: String, required: true},
    password: { type: String, required: true, select: 0 },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true }
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true }
    },
    orders: [OrderSchema]
  },
  {
    versionKey: false
  }
)

UserSchema.statics.hashGenerator = async password => {
  return await bcrypt.hash(password, Number(12))
}


UserSchema.static('myCustomUserFind',async function myCustomUserFind(id:string) {
  return await User.findOne({userId:id});
});

UserSchema.pre('save', async function (next) {
  this.password = await User.hashGenerator(this.password)
  next()
})

const User = model<IUser, IUserModel>('User', UserSchema)

export default User
