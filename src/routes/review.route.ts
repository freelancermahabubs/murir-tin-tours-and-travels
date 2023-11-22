import  express  from "express"
import { ReviewController } from "../controllers/review.controller"


const router = express.Router()

router.post('/create-review', ReviewController.createReview )
router.get('/', ReviewController.getAllReviews )
router.get('/:id', ReviewController.getSingleReview )
router.patch('/:id', ReviewController.updateReview ) 
router.delete('/:id', ReviewController.deleteReview ) 
export const reviewRoutes = router