import express from 'express';
import {
  getReviews,
  getServiceReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
import { validateReview, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(protect, validateReview, handleValidationErrors, createReview);


router.route('/:serviceType/:serviceId')
  .get(getServiceReviews);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);


export default router;