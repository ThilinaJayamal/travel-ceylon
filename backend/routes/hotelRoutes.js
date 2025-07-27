import express from 'express';
import {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  addRoom,
  removeRoom
} from '../controllers/hotelController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  validateHotelRegistration,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getHotels)
  .post(
    protect,
    upload.array('images', 10),
    validateHotelRegistration,
    handleValidationErrors,
    createHotel
  );

router.route('/:id')
  .get(getHotel)
  .put(
    protect,
    upload.array('images', 10),
    updateHotel
  )
  .delete(protect, deleteHotel);

router.route('/:id/rooms')
  .post(protect, addRoom);

router.route('/:id/rooms/:roomId')
  .delete(protect, removeRoom);

export default router;