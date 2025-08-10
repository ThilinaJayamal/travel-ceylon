import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: {
    address: String,
    city: String,
  },
  roomTypes: [{
    type: {type:String},
    capacity: Number,
    pricePerNight: Number
  }],
  amenities: [String],
  images: [String],
  avgRating: { type: Number, default: 0 },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);