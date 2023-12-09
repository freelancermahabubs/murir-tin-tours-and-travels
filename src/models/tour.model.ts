import { Schema, model } from 'mongoose'
import { ITour, ITourMethods, TTourModel } from '../interfaces/tour.interface'
import slugify from 'slugify'
const tourSchema = new Schema<ITour, TTourModel, ITourMethods>(
  {
    name: {
      type: String,
      required: [true, 'Please tel us your name'],
      unique: true,
    },
    durationHours: {
      type: Number,
      required: [true, 'Please tell us you durationHours'],
    },
    reatingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please tell us your Price'],
    },
    availableSeats: {
      type: Number,
      required: [true, ' Please Tell us Your AvailableSeats'],
    },
    imageCover: {
      type: String,
      required: [true, 'Please tell us your ImageCover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    startLocation: {
      type: String,
      required: [true, 'Please tell us your StartLocaiton'],
    },
    locations: [String],
    slug: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
)

tourSchema.virtual('duratinDays').get(function () {
  return this.durationHours / 24
})

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
})

// data create  pre hook
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

tourSchema.methods.getNextNearestStartDateAndEndDate = function (): {
  nearestStartDate: Date | null
  estimatedEndDate: Date | null
} {
  const today = new Date()
  const futureDates = this.startDates.filter((startDate: Date) => {
    return startDate > today
  })
  futureDates.sort((a: Date, b: Date) => a.getTime() - b.getTime())
  const nearestStartDate = futureDates[0]
  const estimatedEndDate = new Date(
    nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000,
  )
  return {
    nearestStartDate,
    estimatedEndDate,
  }
}

const Tour = model<ITour, TTourModel>('Tour', tourSchema)
export default Tour
