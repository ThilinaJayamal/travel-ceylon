import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: Date,
  numberOfGuests: Number,
  specialRequests: String,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  details: {
    // Hotel
    checkInDate: Date,
    checkOutDate: Date,
    roomType: String,
    numberOfRooms: Number,

    // Guide
    tourDuration: String,
    preferredLanguage: String,
    pickupLocation: String,

    // Taxi
    pickupLocation: String,
    dropoffLocation: String,
    estimatedKm: Number,
    estimatedHours: Number,

    // Rental Vehicle
    rentalStartDate: Date,
    rentalEndDate: Date,
    pickupTime: String,
    dropoffTime: String,
  },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);