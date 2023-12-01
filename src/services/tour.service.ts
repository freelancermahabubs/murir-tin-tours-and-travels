/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITour } from '../interfaces/tour.interface'
import Tour from '../models/tour.model'

const createTourIntoDB = async (tourData: ITour): Promise<ITour> => {
  const result = await Tour.create(tourData)

  return result
}

const getAllTourFromDB = async (): Promise<ITour[]> => {
  const result = await Tour.find()
  return result
}

const getSingleTourFromDB = async (id: string): Promise<ITour | null> => {
  const result = await Tour.findById(id).populate('reviews')
  return result
}

const upDateTourIntoDB = async (
  id: string,
  tourData: ITour,
): Promise<ITour | null> => {
  const result = await Tour.findByIdAndUpdate(id, tourData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTourIntoDb = async (id: string): Promise<ITour | null> => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}
const getNextScheduleIntoDB = async (id: string): Promise<any> => {
  const tour = await Tour.findById(id)
  const nextSchedule = tour?.getNextNearestStartDateAndEndDate()
  return {
    tour,
    nextSchedule,
  }
}
export const TourServices = {
  createTourIntoDB,
  getAllTourFromDB,
  getSingleTourFromDB,
  upDateTourIntoDB,
  deleteTourIntoDb,
  getNextScheduleIntoDB,
}
