import express from 'express';
import { protect } from '../middleware/auth.js';
import { createHotel, getHotels } from '../controllers/hotelController.js';
import { createGuide, getGuides } from '../controllers/guideController.js';
import { createTaxi, getTaxis } from '../controllers/taxiController.js';
import { createRental, getRentals } from '../controllers/rentalController.js';

const router = express.Router();

// Hotels
router.route('/hotels')
  .post(protect, createHotel)
  .get(getHotels);

// Guides
router.route('/guides')
  .post(protect, createGuide)
  .get(getGuides);

// Taxis
router.route('/taxis')
  .post(protect, createTaxi)
  .get(getTaxis);

// Rentals
router.route('/rentals')
  .post(protect, createRental)
  .get(getRentals);

export default router;