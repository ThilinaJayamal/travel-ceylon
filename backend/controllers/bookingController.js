import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import Guide from '../models/Guide.js';
import Taxi from '../models/Taxi.js';
import RentalVehicle from '../models/RentalVehicle.js';

const createBooking = async (req, res) => {
  const { serviceId, date, numberOfGuests, specialRequests, totalPrice, details } = req.body;
  const userId = req.user._id;

  try {
    let providerId;

    // Determine service type and fetch provider
    const hotel = await Hotel.findById(serviceId);
    const guide = await Guide.findById(serviceId);
    const taxi = await Taxi.findById(serviceId);
    const rental = await RentalVehicle.findById(serviceId);

    if (hotel) {
      providerId = hotel.providerId;
    } else if (guide) {
      providerId = guide.providerId;
    } else if (taxi) {
      providerId = taxi.providerId;
    } else if (rental) {
      providerId = rental.providerId;
    } else {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = await Booking.create({
      serviceId,
      userId,
      providerId,
      date,
      numberOfGuests,
      specialRequests,
      totalPrice,
      details,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('serviceId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createBooking, getUserBookings };