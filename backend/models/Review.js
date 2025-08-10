import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewerName: String,
  entityType: { type: String, enum: ['hotel', 'guide', 'taxi', 'rental', 'platform'], required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, refPath: 'entityType' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);