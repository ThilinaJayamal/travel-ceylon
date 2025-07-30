import mongoose from 'mongoose';

const taxiSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: [true, 'Driver name is required']
  },
  driverContact: {
    type: String,
    required: [true, 'Driver contact is required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number']
  },
  vehicleType: {
    type: String,
    required: [true, 'Vehicle type is required']
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true
  },
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true
  },
  chassisNumber: {
    type: String,
    required: [true, 'Chassis number is required'],
    unique: true
  },
  provinceOfRegistration: {
    type: String,
    required: [true, 'Province of registration is required']
  },
  documentImages: [String],
  packages: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0
    },
    duration: String,
    includedServices: [String]
  }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One user can only have one taxi profile
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

export default mongoose.model('Taxi', taxiSchema);