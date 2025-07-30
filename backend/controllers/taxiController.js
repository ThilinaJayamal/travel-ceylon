import Taxi from '../models/Taxi.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all taxis
// @route   GET /api/taxis
// @access  Public
export const getTaxis = asyncHandler(async (req, res) => {
  const taxis = await Taxi.find({ isActive: true }).populate('ownerId', 'name email');
  res.status(200).json({
    success: true,
    count: taxis.length,
    data: taxis
  });
});

// @desc    Get single taxi
// @route   GET /api/taxis/:id
// @access  Public
export const getTaxi = asyncHandler(async (req, res) => {
  const taxi = await Taxi.findById(req.params.id).populate('ownerId', 'name email');

  if (!taxi || !taxi.isActive) {
    res.status(404);
    throw new Error('Taxi not found');
  }

  res.status(200).json({
    success: true,
    data: taxi
  });
});

// @desc    Create new taxi
// @route   POST /api/taxis
// @access  Private
export const createTaxi = asyncHandler(async (req, res) => {
  // Check if user already has a taxi profile
  const existingTaxi = await Taxi.findOne({ ownerId: req.user.id });
  if (existingTaxi) {
    res.status(400);
    throw new Error('You already have a taxi profile');
  }

  const userRole = await User.findById(req.user.id).role;
  if (userRole !== 'user') {
    res.status(400);
    throw new Error("You're not allowed to create more than 1 service account");
  }

  req.body.ownerId = req.user.id;
  const taxi = await Taxi.create(req.body);

  // Update user with taxi profile reference
  await User.findByIdAndUpdate(req.user.id, {
    taxiProfile: taxi._id,
    role: 'taxi_owner' // Update role to taxi_owner
  });

  res.status(201).json({
    success: true,
    data: taxi
  });
});

// @desc    Update taxi
// @route   PUT /api/taxis/:id
// @access  Private/Taxi Owner
export const updateTaxi = asyncHandler(async (req, res) => {
  let taxi = await Taxi.findById(req.params.id);

  if (!taxi) {
    res.status(404);
    throw new Error('Taxi not found');
  }

  // Make sure user is taxi owner
  if (taxi.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this taxi');
  }

  taxi = await Taxi.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: taxi
  });
});

// @desc    Delete taxi
// @route   DELETE /api/taxis/:id
// @access  Private/Taxi Owner
export const deleteTaxi = asyncHandler(async (req, res) => {
  const taxi = await Taxi.findById(req.params.id);

  if (!taxi) {
    res.status(404);
    throw new Error('Taxi not found');
  }

  // Make sure user is taxi owner
  if (taxi.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this taxi');
  }

  await taxi.remove();

  // Remove taxi profile reference from user
  await User.findByIdAndUpdate(req.user.id, {
    $unset: { taxiProfile: "" },
    role: 'user' // Reset role to user
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add package to taxi
// @route   POST /api/taxis/:id/packages
// @access  Private/Taxi Owner
export const addPackage = asyncHandler(async (req, res) => {
  const taxi = await Taxi.findById(req.params.id);

  if (!taxi) {
    res.status(404);
    throw new Error('Taxi not found');
  }

  // Make sure user is taxi owner
  if (taxi.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this taxi');
  }

  taxi.packages.push(req.body);
  await taxi.save();

  res.status(200).json({
    success: true,
    data: taxi
  });
});

// @desc    Remove package from taxi
// @route   DELETE /api/taxis/:id/packages/:packageId
// @access  Private/Taxi Owner
export const removePackage = asyncHandler(async (req, res) => {
  const taxi = await Taxi.findById(req.params.id);

  if (!taxi) {
    res.status(404);
    throw new Error('Taxi not found');
  }

  // Make sure user is taxi owner
  if (taxi.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this taxi');
  }

  taxi.packages = taxi.packages.filter(pkg => pkg._id.toString() !== req.params.packageId);
  await taxi.save();

  res.status(200).json({
    success: true,
    data: taxi
  });
});