// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Made optional for OAuth users
  googleId: { type: String, unique: true, sparse: true }, // For Google OAuth
  profilePic: { type: String }, // URL to the profile picture (optional)
  role: { type: String, enum: ['traveler', 'provider'], default: 'traveler' },
  providerStatus: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  lastLogin: Date,
  loginCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;