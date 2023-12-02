/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import sendSuccessResponse from '../utils/sendSuccessResponse'
import catchAsyncFunction from '../utils/catchAsyncFunction'
import { BookingServices } from '../services/booking.service'

const createBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const bookingData = req.body
    const result = await BookingServices.createBookingIntoDB(bookingData)
    sendSuccessResponse(res, {
      statusCode: 201,
      message: 'Booking Created Successfully',
      data: result,
    })
  },
)
const getAllBookings = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await BookingServices.getAllBookingFromDB()
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Sucessfully retrieved all Bookings',
      data: result,
    })
  },
)

const getSingleBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await BookingServices.getSingleBookingFromDB(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Successfully retrieved Single Booking',
      data: result,
    })
  },
)

const getAllBookingOfAUser = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const {userId} = req.params
    const result = await BookingServices.getAllBookingOfAUserFromDB(userId)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'All Bookings of a user Featch Seuccssfully',
      data: result,
    })
  },
)

const updateBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const userData = req.body
    const id = req.params.id
    const result = await BookingServices.upDateBookingIntoDB(id, userData)

    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Booking Updated Successfully',
      data: result,
    })
  },
)

const deleteBooking = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    await BookingServices.deleteBookingIntoDb(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: ' Booking Deleted Successfully',
      data: null,
    })
  },
)

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  getAllBookingOfAUser,
}
