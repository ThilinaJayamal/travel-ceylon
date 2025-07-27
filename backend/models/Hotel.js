import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: [true, 'Room type is required']
  },
  numberOfRooms: {
    type: Number,
    required: [true, 'Number of rooms is required'],
    min: 1
  },
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: 1
  },
  guestCapacity: {
    type: Number,
    required: [true, 'Guest capacity is required'],
    min: 1
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Price per night is required'],
    min: 0
  },
  amenities: [String]
});

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  contactNumbers: [{
    type: String,
    required: [true, 'Contact number is required']
  }],
  email: {
    type: String,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  website: {
    type: String,
    match: [
      /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/,
      'Please provide a valid website URL'
    ]
  },
  facilities: [String],
  rooms: [roomSchema],
  images: [String],
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One user can only have one hotel profile
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

export default mongoose.model('Hotel', hotelSchema);