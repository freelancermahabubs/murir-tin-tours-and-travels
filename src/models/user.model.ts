import { Document, Query, Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user.interface'
import { ACCOUNT_STATUS, USER_ROLE } from '../constants/user.constant'

const userSchema = new Schema<IUser>(
  {
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
    password: {
      type: String,
      required: [true, 'Please Provide a Password'],
      select: 0,
    },
    passwrodChangeAt: {
      type: Date,
      default: null,
    },
    photo: {
      type: String,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
      message: 'Role is either: user or admin. Your role is {VALUE}',
    },
    userStatus: {
      type: String,
      enum: Object.values(ACCOUNT_STATUS),
      default: ACCOUNT_STATUS.active,
      message:
        'User status is either: active or inactive. your stauts are {VALUE}',
    },
  },
  { timestamps: true },
)

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
