import Review from '../models/Review.js';
import User from '../models/User.js';

const createReview = async (req, res) => {
  const { rating, comment, entityType, serviceId } = req.body;

  try {
    // Check if user already reviewed this specific service/platform
    let existingReview;
    
    if (entityType === 'platform') {
      // For platform reviews, check if user already reviewed the platform
      existingReview = await Review.findOne({
        reviewerId: req.user._id,
        entityType: 'platform',
        serviceId: null
      });
    } else {
      // For service reviews, check if user already reviewed this specific service
      existingReview = await Review.findOne({
        reviewerId: req.user._id,
        entityType: entityType,
        serviceId: serviceId
      });
    }

    if (existingReview) {
      return res.status(400).json({ 
        message: `You have already reviewed this ${entityType}. You can update your existing review instead.` 
      });
    }

    const reviewData = {
      rating,
      comment,
      reviewerId: req.user._id,
      reviewerName: req.user.name,
      entityType: entityType
    };

    // For service reviews, include serviceId
    if (entityType !== 'platform') {
      reviewData.serviceId = serviceId;
    }

    const review = await Review.create(reviewData);

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      serviceId: req.params.serviceId,
      entityType: { $ne: 'platform' }
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlatformReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      entityType: 'platform'
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const review = await Review.findOne({
      _id: req.params.id,
      reviewerId: req.user._id
    });
    
    if (review) {
      review.rating = rating || review.rating;
      review.comment = comment || review.comment;
      review.updatedAt = Date.now();
      
      const updatedReview = await review.save();
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found or you are not authorized to update this review' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      reviewerId: req.user._id
    });
    
    if (review) {
      await review.remove();
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found or you are not authorized to delete this review' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewerId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createReview, getServiceReviews, getPlatformReviews, updateReview, deleteReview, getUserReviews };