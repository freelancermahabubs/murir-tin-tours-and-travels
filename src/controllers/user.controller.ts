import { Request, Response } from 'express'

import { UserServices } from '../services/user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await UserServices.createUserIntoDB(userData)
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong',
    })
  }
}
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()
    res.status(200).json({
      status: 'success',
      message: 'User Fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong',
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await UserServices.getSingleUserFromDB(id)
    res.status(200).json({
      status: 'success',
      message: 'Single User Fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong',
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const id = req.params.id
    const result = await UserServices.upDateUserIntoDB(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'User Updated successfully',
      data: result,
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong',
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await UserServices.deleteUserIntoDb(id)
    res.status(200).json({
      status: 'success',
      message: 'User Deleted successfully',
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong',
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
