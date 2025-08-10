import express from 'express';
import { protect } from '../middleware/auth.js';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getUserBookings);

export default router;