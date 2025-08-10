import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  createReview, 
  getServiceReviews,
  getPlatformReviews,
  updateReview,
  deleteReview,
  getUserReviews
} from '../controllers/reviewController.js';

const router = express.Router();

router.route('/')
  .post(protect, createReview)
  .get(protect, getUserReviews);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.get('/service/:serviceId', getServiceReviews);
router.get('/platform', getPlatformReviews);

export default router;