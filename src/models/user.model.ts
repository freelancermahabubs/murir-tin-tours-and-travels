import { Document, Query, Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  age: {
    type: Number,
    required: [true, 'Please tell us your age'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please tell us your email address'],
    loadClass: true,
  },
  photo: {
    type: String,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    message: 'Role is either: user or admin. Your role is {VALUE}',
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    message:
      'User status is either: active or inactive. your stauts are {VALUE}',
  },
})

// pre hook for query middleware
userSchema.pre(/^find/, function (this: Query<IUser, Document>, next) {
  this.find({ userStatus: { $eq: 'active' } })
  next()
})
// userSchema.pre('find', function(next){
// this.findOne({userStatus: {$eq: "active"}})
// next()
// })

const User = model<IUser>('User', userSchema)
export default User
