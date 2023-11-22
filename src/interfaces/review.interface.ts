import { Schema , Model} from "mongoose";

interface IReview {
    review: string,
    rating: number, 
    createdAt: Date,
    tour: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId
}

interface IReviewModel extends Model<IReview>{
    calcAverageRatings(): Promise<void>
}
export {IReview, IReviewModel}