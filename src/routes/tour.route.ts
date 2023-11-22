import  express  from "express"
import { TourController } from "../controllers/tour.controller"

const router = express.Router()

router.post('/create-tour', TourController.createTour )
router.get('/', TourController.getAllTours )
router.get('/:id', TourController.getSingleTour )
router.get('/:id/next-sechedule', TourController.getNextSchedule )
router.patch('/:id', TourController.updateTour ) 
router.delete('/:id', TourController.deleteTour ) 
export const tourRoutes = router