import mongoose from 'mongoose';

const taxiSchema = new mongoose.Schema({
  vehicleType: { type: String, required: true },
  brandModel: { type: String, required: true },
  capacity: Number,
  driverName: String,
  licensePlate: String,
  baseLocation: String,
  perKmRate: Number,
  perHourRate: Number,
  images: [String],
  avgRating: { type: Number, default: 0 },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Taxi', taxiSchema);