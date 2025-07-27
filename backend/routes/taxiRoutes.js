import express from 'express';
import {
  getTaxis,
  getTaxi,
  createTaxi,
  updateTaxi,
  deleteTaxi,
  addPackage,
  removePackage
} from '../controllers/taxiController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  validateTaxiRegistration,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getTaxis)
  .post(
    protect,
    upload.array('documentImages', 5),
    validateTaxiRegistration,
    handleValidationErrors,
    createTaxi
  );

router.route('/:id')
  .get(getTaxi)
  .put(
    protect,
    upload.array('documentImages', 5),
    updateTaxi
  )
  .delete(protect, deleteTaxi);

router.route('/:id/packages')
  .post(protect, addPackage);

router.route('/:id/packages/:packageId')
  .delete(protect, removePackage);

export default router;