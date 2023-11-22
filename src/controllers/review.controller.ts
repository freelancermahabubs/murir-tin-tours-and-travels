import { Request, Response } from 'express'
import { ReviewServices } from '../services/review.service'


const createReview = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await ReviewServices.createReviewIntoDB(userData)
    res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
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
const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewServices.getAllReviewFromDB()
    res.status(200).json({
      status: 'success',
      message: 'Review Fetched successfully',
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

const getSingleReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await ReviewServices.getSingleReviewFromDB(id)
    res.status(200).json({
      status: 'success',
      message: 'Single Review Fetched successfully',
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
const updateReview = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const id = req.params.id
    const result = await ReviewServices.upDateReviewIntoDB(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'Review Updated successfully',
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

const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await ReviewServices.deleteReviewIntoDb(id)
    res.status(200).json({
      status: 'success',
      message: 'Review Deleted successfully',
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong',
    })
  }
}

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
