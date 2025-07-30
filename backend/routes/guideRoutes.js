import express from 'express';
import {
  getGuides,
  getGuide,
  createGuide,
  updateGuide,
  deleteGuide
} from '../controllers/guideController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  validateGuideRegistration,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getGuides)
  .post(
    protect,
    upload.array('licenseImages', 5),
    validateGuideRegistration,
    handleValidationErrors,
    createGuide
  );

router.route('/:id')
  .get(getGuide)
  .put(
    protect,
    upload.array('licenseImages', 5),
    updateGuide
  )
  .delete(protect, deleteGuide);

export default router;