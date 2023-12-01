
import { Schema, model } from 'mongoose'
import { IReview } from '../interfaces/review.interface'
import Tour from './tour.model'

const reviewSchema = new Schema<IReview>(
  {
    review: {
      type: String,
      required: [true, 'Please Tell us your Review'],
    },
    rating: {
      type: Number,
      required: [true, 'Please Tell us your Rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Please Tell us your Tour'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please Tell us your User'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
)

reviewSchema.index({ tour: 1, user: 1 }, { unique: true })

reviewSchema.statics.calcAverageRatings = async function (
  tourId: Schema.Types.ObjectId,
) {
  //tourId newObjectId("2vj3ffvgcd")
  //this refers the Review  Model
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        numberOfRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ])

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingAverage: stats[0].numberOfRatings,
      ratingQuantity: stats[0].avgRating,
    })
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingAverage: 0,
      ratingQuantity: 0,
    })
  }
}
const Review = model<IReview>('Review', reviewSchema)
export default Review
