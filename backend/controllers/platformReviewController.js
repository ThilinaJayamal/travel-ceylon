import PlatformReview from '../models/PlatformReview.js';

export const createPlatformReview = async (req, res) => {
  const userId = req.user._id;
  const { rating, comment } = req.body;

  try {
    const existing = await PlatformReview.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: 'You already reviewed the platform.' });

    const review = await PlatformReview.create({ user: userId, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPlatformReviews = async (req, res) => {
  try {
    const reviews = await PlatformReview.find().populate('user', 'name email image');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlatformReviewByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const review = await PlatformReview.findOne({ user: userId });
    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePlatformReview = async (req, res) => {
  const userId = req.user._id;
  const { rating, comment } = req.body;

  try {
    const review = await PlatformReview.findOneAndUpdate(
      { user: userId },
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlatformReview = async (req, res) => {
  const userId = req.user._id;

  try {
    const review = await PlatformReview.findOneAndDelete({ user: userId });

    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
