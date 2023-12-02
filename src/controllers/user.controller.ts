import { Request, Response } from 'express'

import { UserServices } from '../services/user.service'
import sendSuccessResponse from '../utils/sendSuccessResponse'
import catchAsyncFunction from '../utils/catchAsyncFunction'

const createUser = catchAsyncFunction(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await UserServices.createUserIntoDB(userData)
  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'User Created Successfully',
    data: result,
  })
})
const getAllUsers = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB()
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Successfully retrieved all users',
    data: result,
  })
})

const getSingleUser = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await UserServices.getSingleUserFromDB(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Successfully retrieved Single user',
      data: result,
    })
  },
)
const updateUser = catchAsyncFunction(async (req: Request, res: Response) => {
  const userData = req.body
  const id = req.params.id
  const result = await UserServices.upDateUserIntoDB(id, userData)
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Successfully Updated user',
    data: result,
  })
})

const deleteUser = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id
  const restult = await UserServices.deleteUserIntoDb(id)
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'User Deleted Successfully',
    data: restult,
  })
})

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
