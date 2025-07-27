import Review from '../models/Review.js';
import Hotel from '../models/Hotel.js';
import Taxi from '../models/Taxi.js';
import Guide from '../models/Guide.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate('userId', 'name');
  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

// @desc    Get reviews for a specific service
// @route   GET /api/reviews/:serviceType/:serviceId
// @access  Public
export const getServiceReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    serviceType: req.params.serviceType,
    serviceId: req.params.serviceId
  }).populate('userId', 'name');

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private/User
export const createReview = asyncHandler(async (req, res) => {
  req.body.userId = req.user.id;

  // Check if user has already reviewed this service
  const existingReview = await Review.findOne({
    serviceType: req.body.serviceType,
    serviceId: req.body.serviceId,
    userId: req.user.id
  });

  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this service');
  }

  const review = await Review.create(req.body);

  // Update average rating for the service
  await updateServiceRating(req.body.serviceType, req.body.serviceId);

  res.status(201).json({
    success: true,
    data: review
  });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private/User
export const updateReview = asyncHandler(async (req, res) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Check if user owns this review
  if (review.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this review');
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // Update average rating for the service
  await updateServiceRating(review.serviceType, review.serviceId);

  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/User/Admin
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Check if user owns this review or is admin
  if (review.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this review');
  }

  await review.remove();

  // Update average rating for the service
  await updateServiceRating(review.serviceType, review.serviceId);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// Helper function to update service ratings
const updateServiceRating = async (serviceType, serviceId) => {
  const reviews = await Review.find({ serviceType, serviceId });
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  if (serviceType === 'hotel') {
    await Hotel.findByIdAndUpdate(serviceId, {
      averageRating,
      totalReviews: reviews.length
    });
  } else if (serviceType === 'taxi') {
    await Taxi.findByIdAndUpdate(serviceId, {
      averageRating,
      totalReviews: reviews.length
    });
  } else if (serviceType === 'guide') {
    await Guide.findByIdAndUpdate(serviceId, {
      averageRating,
      totalReviews: reviews.length
    });
  }
};