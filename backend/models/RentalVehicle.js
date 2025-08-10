import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: Number,
  type: String,
  dailyRate: Number,
  hourlyRate: Number,
  location: String,
  features: [String],
  images: [String],
  avgRating: { type: Number, default: 0 },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('RentalVehicle', rentalSchema);