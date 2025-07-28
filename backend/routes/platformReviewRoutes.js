// routes/platformReview.routes.js
import express from 'express';
import {
  createPlatformReview,
  getAllPlatformReviews,
  getPlatformReviewByUser,
  updatePlatformReview,
  deletePlatformReview
} from '../controllers/platformReviewController.js';

import { protect } from '../middleware/auth.js'; // Assuming you have this

const router = express.Router();

// Public: Get all platform reviews
router.get('/', getAllPlatformReviews);

// Create, update, get my review, delete
router.post('/', protect, createPlatformReview);
router.get('/me', protect, getPlatformReviewByUser);
router.put('/me', protect, updatePlatformReview);
router.delete('/me', protect, deletePlatformReview);

export default router;
