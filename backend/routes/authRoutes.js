import express from 'express';
import {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  logout
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateUserRegistration, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUserRegistration, handleValidationErrors, register);
router.post('/login', login);
router.post('/logout', logout)
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

export default router;