import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    enum: ['hotel', 'taxi', 'guide'],
    required: [true, 'Service type is required']
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'serviceType',
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    maxlength: [500, 'Comment cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews
reviewSchema.index({ serviceType: 1, serviceId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);