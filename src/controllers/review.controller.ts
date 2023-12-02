/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ReviewServices } from '../services/review.service'
import sendSuccessResponse from '../utils/sendSuccessResponse'
import catchAsyncFunction from '../utils/catchAsyncFunction'

const createReview = catchAsyncFunction(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await ReviewServices.createReviewIntoDB(userData)
  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'Review created successfully',
    data: result,
  })
})

const getAllReviews = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await ReviewServices.getAllReviewFromDB()
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Review Fetched successfully',
      data: result,
    })
  },
)

const getSingleReview = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await ReviewServices.getSingleReviewFromDB(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Single Review Fetched successfully',
      data: result,
    })
  },
)

const updateReview = catchAsyncFunction(async (req: Request, res: Response) => {
  const userData = req.body
  const id = req.params.id
  const result = await ReviewServices.upDateReviewIntoDB(id, userData)
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Review Updated successfully',
    data: result,
  })
})

const deleteReview = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id
  await ReviewServices.deleteReviewIntoDb(id)
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Review Deleted successfully',
    data: null,
  })
})

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
