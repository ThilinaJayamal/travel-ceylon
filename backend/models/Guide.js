import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  languages: [{
    type: String,
    required: [true, 'At least one language is required']
  }],
  specializations: [{
    type: String,
    required: [true, 'At least one specialization is required']
  }],
  location: {
    province: {
      type: String,
      required: [true, 'Province is required']
    },
    district: {
      type: String,
      required: [true, 'District is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    }
  },
  licenseImages: [String],
  policeClearanceImages: [String],
  experience: {
    type: Number,
    min: 0
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: 0
  },
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One user can only have one guide profile
  },
  isActive: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Guide', guideSchema);