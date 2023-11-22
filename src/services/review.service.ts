import { IReview } from '../interfaces/review.interface'
import Review from '../models/review.model'

const createReviewIntoDB = async (reviewData: IReview): Promise<IReview> => {
  const result = await Review.create(reviewData)

  return result
}

const getAllReviewFromDB = async (): Promise<IReview[]> => {
  const result = await Review.find().populate({
    path: 'user',
    select: 'name photo',
  })
  return result
}

const getSingleReviewFromDB = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id)
  return result
}

const upDateReviewIntoDB = async (
  id: string,
  reviewData: IReview,
): Promise<IReview | null> => {
  const result = await Review.findByIdAndUpdate(id, reviewData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteReviewIntoDb = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndDelete(id)
  return result
}
export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewFromDB,
  getSingleReviewFromDB,
  upDateReviewIntoDB,
  deleteReviewIntoDb,
}
