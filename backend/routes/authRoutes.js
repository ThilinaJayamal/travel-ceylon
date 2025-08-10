// routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser, getMe, googleCallback } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:3000')}/login`,
    session: false
  }),
  googleCallback
);

export default router;