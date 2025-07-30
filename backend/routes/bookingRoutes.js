import express from 'express';
import {
  getBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
  requestCancellation,
  updateCancellationStatus
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
import { validateBooking, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getBookings)
  .post(validateBooking, handleValidationErrors, createBooking);

router.route('/:id')
  .get(getBooking);

router.route('/:id/status')
  .put(updateBookingStatus);

router.route('/:id/cancel')
  .put(requestCancellation);

router.route('/:id/cancellation-status')
  .put(updateCancellationStatus);

export default router;