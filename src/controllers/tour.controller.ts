import { Request, Response } from 'express'
import { TourServices } from '../services/tour.service'

const createTour = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await TourServices.createTourIntoDB(userData)
    res.status(201).json({
      status: 'success',
      message: 'Tour created successfully',
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
const getAllTours = async (req: Request, res: Response) => {
  try {
    const result = await TourServices.getAllTourFromDB()
    res.status(200).json({
      status: 'success',
      message: 'Tour Fetched successfully',
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

const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await TourServices.getSingleTourFromDB(id)
    res.status(200).json({
      status: 'success',
      message: 'Single Tour Fetched successfully',
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

const getNextSchedule= async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await TourServices.getNextScheduleIntoDB(id)
    res.status(200).json({
      status: 'success',
      message: ' Next Schedule Fetched successfully',
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
const updateTour = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const id = req.params.id
    const result = await TourServices.upDateTourIntoDB(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'Tour Updated successfully',
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

const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await TourServices.deleteTourIntoDb(id)
    res.status(200).json({
      status: 'success',
      message: 'Tour Deleted successfully',
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong',
    })
  }
}

export const TourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule
}