import Guide from '../models/Guide.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all guides
// @route   GET /api/guides
// @access  Public
export const getGuides = asyncHandler(async (req, res) => {
  const guides = await Guide.find({ isActive: true }).populate('ownerId', 'name email');
  res.status(200).json({
    success: true,
    count: guides.length,
    data: guides
  });
});

// @desc    Get single guide
// @route   GET /api/guides/:id
// @access  Public
export const getGuide = asyncHandler(async (req, res) => {
  const guide = await Guide.findById(req.params.id).populate('ownerId', 'name email');

  if (!guide || !guide.isActive) {
    res.status(404);
    throw new Error('Guide not found');
  }

  res.status(200).json({
    success: true,
    data: guide
  });
});

// @desc    Create new guide
// @route   POST /api/guides
// @access  Private
export const createGuide = asyncHandler(async (req, res) => {
  // Check if user already has a guide profile
  const existingGuide = await Guide.findOne({ ownerId: req.user.id });
  if (existingGuide) {
    res.status(400);
    throw new Error('You already have a guide profile');
  }
  
  const userRole = await User.findById(req.user.id).role;
  if (userRole !== 'user') {
    res.status(400);
    throw new Error("You're not allowed to create more than 1 service account");
  }

  req.body.ownerId = req.user.id;
  const guide = await Guide.create(req.body);

  // Update user with guide profile reference
  await User.findByIdAndUpdate(req.user.id, {
    guideProfile: guide._id,
    role: 'guide_owner' // Update role to guide_owner
  });

  res.status(201).json({
    success: true,
    data: guide
  });
});

// @desc    Update guide
// @route   PUT /api/guides/:id
// @access  Private/Guide Owner
export const updateGuide = asyncHandler(async (req, res) => {
  let guide = await Guide.findById(req.params.id);

  if (!guide) {
    res.status(404);
    throw new Error('Guide not found');
  }

  // Make sure user is guide owner
  if (guide.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this guide');
  }

  guide = await Guide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: guide
  });
});

// @desc    Delete guide
// @route   DELETE /api/guides/:id
// @access  Private/Guide Owner
export const deleteGuide = asyncHandler(async (req, res) => {
  const guide = await Guide.findById(req.params.id);

  if (!guide) {
    res.status(404);
    throw new Error('Guide not found');
  }

  // Make sure user is guide owner
  if (guide.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this guide');
  }

  await guide.remove();

  // Remove guide profile reference from user
  await User.findByIdAndUpdate(req.user.id, {
    $unset: { guideProfile: "" },
    role: 'user' // Reset role to user
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});