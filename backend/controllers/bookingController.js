import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import Taxi from '../models/Taxi.js';
import Guide from '../models/Guide.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = asyncHandler(async (req, res) => {
  let query;

  if (req.user.role === 'admin') {
    query = Booking.find();
  } else if (req.user.role === 'user') {
    query = Booking.find({ userId: req.user.id });
  } else {
    // For service owners, get bookings for their services
    let serviceIds = [];
    if (req.user.role === 'hotel_owner') {
      const hotels = await Hotel.find({ ownerId: req.user.id });
      serviceIds = hotels.map(hotel => hotel._id);
    } else if (req.user.role === 'taxi_owner') {
      const taxis = await Taxi.find({ ownerId: req.user.id });
      serviceIds = taxis.map(taxi => taxi._id);
    } else if (req.user.role === 'guide_owner') {
      const guides = await Guide.find({ ownerId: req.user.id });
      serviceIds = guides.map(guide => guide._id);
    }
    query = Booking.find({ serviceId: { $in: serviceIds } });
  }

  const bookings = await query.populate('userId', 'name email').populate('serviceId');
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('userId', 'name email')
    .populate('serviceId');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if user is authorized to view this booking
  if (req.user.role !== 'admin' && booking.userId.toString() !== req.user.id) {
    let isServiceOwner = false;
    if (req.user.role === 'hotel_owner') {
      const hotel = await Hotel.findById(booking.serviceId);
      isServiceOwner = hotel && hotel.ownerId.toString() === req.user.id;
    } else if (req.user.role === 'taxi_owner') {
      const taxi = await Taxi.findById(booking.serviceId);
      isServiceOwner = taxi && taxi.ownerId.toString() === req.user.id;
    } else if (req.user.role === 'guide_owner') {
      const guide = await Guide.findById(booking.serviceId);
      isServiceOwner = guide && guide.ownerId.toString() === req.user.id;
    }

    if (!isServiceOwner) {
      res.status(401);
      throw new Error('Not authorized to view this booking');
    }
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private/User
export const createBooking = asyncHandler(async (req, res) => {
  req.body.userId = req.user.id;
  
  // Validate service exists and is active
  let service;
  if (req.body.serviceType === 'hotel') {
    service = await Hotel.findById(req.body.serviceId);
  } else if (req.body.serviceType === 'taxi') {
    service = await Taxi.findById(req.body.serviceId);
  } else if (req.body.serviceType === 'guide') {
    service = await Guide.findById(req.body.serviceId);
  }

  if (!service || !service.isActive) {
    res.status(404);
    throw new Error('Service not found or inactive');
  }

  const booking = await Booking.create(req.body);
  res.status(201).json({
    success: true,
    data: booking
  });
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Service Owner/Admin
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if user is authorized to update this booking
  if (req.user.role !== 'admin') {
    let isServiceOwner = false;
    if (req.user.role === 'hotel_owner') {
      const hotel = await Hotel.findById(booking.serviceId);
      isServiceOwner = hotel && hotel.ownerId.toString() === req.user.id;
    } else if (req.user.role === 'taxi_owner') {
      const taxi = await Taxi.findById(booking.serviceId);
      isServiceOwner = taxi && taxi.ownerId.toString() === req.user.id;
    } else if (req.user.role === 'guide_owner') {
      const guide = await Guide.findById(booking.serviceId);
      isServiceOwner = guide && guide.ownerId.toString() === req.user.id;
    }

    if (!isServiceOwner) {
      res.status(401);
      throw new Error('Not authorized to update this booking');
    }
  }

  booking.status = req.body.status;
  await booking.save();

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Request booking cancellation
// @route   PUT /api/bookings/:id/cancel
// @access  Private/User
export const requestCancellation = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if user owns this booking
  if (booking.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to cancel this booking');
  }

  booking.cancellationReason = req.body.reason;
  booking.cancellationStatus = 'requested';
  await booking.save();

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Approve/Reject booking cancellation
// @route   PUT /api/bookings/:id/cancellation-status
// @access  Private/Service Owner/Admin
export const updateCancellationStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if user is authorized to update this booking
  if (req.user.role !== 'admin') {
    let isServiceOwner = false;
    if (req.user.role === 'hotel_owner') {
      const hotel = await Hotel.findById(booking.serviceId);
      isServiceOwner = hotel && hotel.ownerId.toString() === req.user.id;
    } else if (req.user.role === 'taxi_owner') {
      const taxi = await Taxi.findById(booking.serviceId);
      isServiceOwner = taxi && taxi.ownerId.toString() === req.user.id;
    } else if (req.user.role === 'guide_owner') {
      const guide = await Guide.findById(booking.serviceId);
      isServiceOwner = guide && guide.ownerId.toString() === req.user.id;
    }

    if (!isServiceOwner) {
      res.status(401);
      throw new Error('Not authorized to update this booking');
    }
  }

  booking.cancellationStatus = req.body.status; // 'approved' or 'rejected'
  if (req.body.status === 'approved') {
    booking.status = 'cancelled';
  }
  await booking.save();

  res.status(200).json({
    success: true,
    data: booking
  });
});