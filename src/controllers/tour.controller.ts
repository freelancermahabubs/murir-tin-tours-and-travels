/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { TourServices } from '../services/tour.service'
import sendSuccessResponse from '../utils/sendSuccessResponse'
import catchAsyncFunction from '../utils/catchAsyncFunction'

const createTour = catchAsyncFunction(async (req: Request, res: Response) => {
  const tourData = req.body
  const result = await TourServices.createTourIntoDB(tourData)
  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'Tour Created Successfully',
    data: result,
  })
})
const getAllTours = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await TourServices.getAllTourFromDB()
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Sucessfully retrieved all Tours',
    data: result,
  })
})

const getSingleTour = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await TourServices.getSingleTourFromDB(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Successfully retrieved Single Tour',
      data: result,
    })
  },
)
const getNextSchedule = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await TourServices.getNextScheduleIntoDB(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Next Schedule retrieved successfully',
      data: result,
    })
  },
)
const updateTour = catchAsyncFunction(async (req: Request, res: Response) => {
  const userData = req.body
  const id = req.params.id
  const result = await TourServices.upDateTourIntoDB(id, userData)

  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Tour Updated Successfully',
    data: result,
  })
})

const deleteTour = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id
  await TourServices.deleteTourIntoDb(id)
  sendSuccessResponse(res, {
    statusCode: 200,
    message: ' Tour Deleted Successfully',
    data: null,
  })
})

export const TourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
