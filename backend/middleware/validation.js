import { body, validationResult } from 'express-validator';

export const validateUserRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number')
];

export const validateHotelRegistration = [
  body('hotelName').notEmpty().withMessage('Hotel name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('contactNumbers').isArray({ min: 1 }).withMessage('At least one contact number is required'),
  body('facilities').isArray().withMessage('Facilities should be an array'),
  body('rooms').isArray({ min: 1 }).withMessage('At least one room type is required')
];

export const validateTaxiRegistration = [
  body('driverName').notEmpty().withMessage('Driver name is required'),
  body('vehicleType').notEmpty().withMessage('Vehicle type is required'),
  body('licenseNumber').notEmpty().withMessage('License number is required'),
  body('registrationNumber').notEmpty().withMessage('Registration number is required')
];

export const validateGuideRegistration = [
  body('languages').isArray({ min: 1 }).withMessage('At least one language is required'),
  body('specializations').isArray({ min: 1 }).withMessage('At least one specialization is required'),
  body('location.province').notEmpty().withMessage('Province is required'),
  body('location.district').notEmpty().withMessage('District is required'),
  body('location.city').notEmpty().withMessage('City is required')
];

export const validateBooking = [
  body('serviceType').isIn(['hotel', 'taxi', 'guide']).withMessage('Invalid service type'),
  body('serviceId').notEmpty().withMessage('Service ID is required'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
  body('guests').isInt({ min: 1 }).withMessage('Guests must be at least 1')
];

export const validateReview = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required')
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};