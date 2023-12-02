/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { IBooking } from '../interfaces/booking.interface'

import Booking from '../models/booking.mode'
import Tour from '../models/tour.model'

const createBookingIntoDB = async (
  bookingData: IBooking,
): Promise<IBooking> => {
  const session = await mongoose.startSession()
  // session is the isolated environment

  session.startTransaction()
  try {
    const booking = await Booking.create([bookingData], { session })
    if (!booking) {
      throw new Error('Booking Create Failed')
    }
    const tour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      {
        $inc: { availableSeats: -booking[0].bookedSlots },
      },
      { session},
    )
    if (!tour) {
      throw new Error('Tour Create Failed')
    }
    await session.commitTransaction()
    await session.endSession()
    return booking[0]
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

const getAllBookingFromDB = async (): Promise<IBooking[]> => {
  const result = await Booking.find()
  return result
}

const getSingleBookingFromDB = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id)
  return result
}
const getAllBookingOfAUserFromDB = async (
  id: string,
): Promise<IBooking[] | null> => {
  const result = await Booking.find({ user: id })
  return result
}

const upDateBookingIntoDB = async (
  id: string,
  bookingData: IBooking,
): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(id, bookingData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBookingIntoDb = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id)
  return result
}
export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  upDateBookingIntoDB,
  getAllBookingOfAUserFromDB,
  deleteBookingIntoDb,
}
