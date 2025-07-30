import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    enum: ['hotel', 'taxi', 'guide'],
    required: [true, 'Service type is required']
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Service ID is required'],
    refPath: 'serviceType'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date
  },
  guests: {
    type: Number,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'],
    default: 'pending'
  },
  cancellationReason: String,
  cancellationStatus: {
    type: String,
    enum: ['requested', 'approved', 'rejected'],
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: String
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);