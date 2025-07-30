import Hotel from '../models/Hotel.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
export const getHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ isActive: true }).populate('ownerId', 'name email');
  res.status(200).json({
    success: true,
    count: hotels.length,
    data: hotels
  });
});

// @desc    Get single hotel
// @route   GET /api/hotels/:id
// @access  Public
export const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id).populate('ownerId', 'name email');

  if (!hotel || !hotel.isActive) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  res.status(200).json({
    success: true,
    data: hotel
  });
});

// @desc    Create new hotel
// @route   POST /api/hotels
// @access  Private
export const createHotel = asyncHandler(async (req, res) => {
  // Check if user already has a hotel profile
  const existingHotel = await Hotel.findOne({ ownerId: req.user.id });
  if (existingHotel) {
    res.status(400);
    throw new Error('You already have a hotel profile');
  }

  const userRole = await User.findById(req.user.id).role;
  if (userRole !== 'user') {
    res.status(400);
    throw new Error("You're not allowed to create more than 1 service account");
  }

  req.body.ownerId = req.user.id;
  const hotel = await Hotel.create(req.body);

  // Update user with hotel profile reference
  await User.findByIdAndUpdate(req.user.id, {
    hotelProfile: hotel._id,
    role: 'hotel_owner' // Update role to hotel_owner
  });

  res.status(201).json({
    success: true,
    data: hotel
  });
});

// @desc    Update hotel
// @route   PUT /api/hotels/:id
// @access  Private/Hotel Owner
export const updateHotel = asyncHandler(async (req, res) => {
  let hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  // Make sure user is hotel owner
  if (hotel.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this hotel');
  }

  hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: hotel
  });
});

// @desc    Delete hotel
// @route   DELETE /api/hotels/:id
// @access  Private/Hotel Owner
export const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  // Make sure user is hotel owner
  if (hotel.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this hotel');
  }

  await hotel.remove();

  // Remove hotel profile reference from user
  await User.findByIdAndUpdate(req.user.id, {
    $unset: { hotelProfile: "" },
    role: 'user' // Reset role to user
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add room to hotel
// @route   POST /api/hotels/:id/rooms
// @access  Private/Hotel Owner
export const addRoom = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  // Make sure user is hotel owner
  if (hotel.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this hotel');
  }

  hotel.rooms.push(req.body);
  await hotel.save();

  res.status(200).json({
    success: true,
    data: hotel
  });
});

// @desc    Remove room from hotel
// @route   DELETE /api/hotels/:id/rooms/:roomId
// @access  Private/Hotel Owner
export const removeRoom = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  // Make sure user is hotel owner
  if (hotel.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this hotel');
  }

  hotel.rooms = hotel.rooms.filter(room => room._id.toString() !== req.params.roomId);
  await hotel.save();

  res.status(200).json({
    success: true,
    data: hotel
  });
});