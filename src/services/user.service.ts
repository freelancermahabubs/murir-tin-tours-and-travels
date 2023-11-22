import { IUser } from '../interfaces/user.interface'
import User from '../models/user.model'

const createUserIntoDB = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData)

  return result
}

const getAllUserFromDB = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}

const getSingleUserFromDB = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const upDateUserIntoDB = async (
  id: string,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteUserIntoDb = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}
export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  upDateUserIntoDB,
  deleteUserIntoDb,
}
