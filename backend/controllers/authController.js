// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import Taxi from '../models/Taxi.js';
import Hotel from '../models/Hotel.js';
import RentalVehicle from '../models/RentalVehicle.js';
import Guide from '../models/Guide.js';

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required for email registration' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    if (user) {
      const token = generateToken(user._id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        providerStatus: user.providerStatus,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      user.lastLogin = new Date();
      user.loginCount = user.loginCount + 1;
      await user.save();

      const token = generateToken(user._id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      if (user.role !== 'traveler') {
        const taxiProfile = await Taxi.findOne({ providerId: user._id });
        const hotelProfile = await Hotel.findOne({ providerId: user._id });
        const rentProfile = await RentalVehicle.findOne({ providerId: user._id });
        const guideProfile = await Guide.findOne({ providerId: user._id });

        let serviceProfile = null;
        let serviceType = null;

        if (taxiProfile) {
          serviceProfile = taxiProfile;
          serviceType = 'taxi';
        } else if (hotelProfile) {
          serviceProfile = hotelProfile;
          serviceType = 'hotel';
        } else if (rentProfile) {
          serviceProfile = rentProfile;
          serviceType = 'rental';
        } else if (guideProfile) {
          serviceProfile = guideProfile;
          serviceType = 'guide';
        }

        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
          providerStatus: user.providerStatus,
          lastLogin: user.lastLogin,
          loginCount: user.loginCount,
          serviceProfile: serviceProfile,
          serviceType: serviceType
        });
      } else {
        console.log(user)
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          role: user.role,
          lastLogin: user.lastLogin,
          loginCount: user.loginCount
        });
      }
    } else if (user && !user.password) {
      return res.status(400).json({ message: 'This account was created using Google Sign-In. Please use Google to log in.' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== 'traveler') {
      const taxiProfile = await Taxi.findOne({ providerId: user._id });
      const hotelProfile = await Hotel.findOne({ providerId: user._id });
      const rentProfile = await RentalVehicle.findOne({ providerId: user._id });
      const guideProfile = await Guide.findOne({ providerId: user._id });

      let serviceProfile = null;
      let serviceType = null;

      if (taxiProfile) {
        serviceProfile = taxiProfile;
        serviceType = 'taxi';
      } else if (hotelProfile) {
        serviceProfile = hotelProfile;
        serviceType = 'hotel';
      } else if (rentProfile) {
        serviceProfile = rentProfile;
        serviceType = 'rental';
      } else if (guideProfile) {
        serviceProfile = guideProfile;
        serviceType = 'guide';
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        providerStatus: user.providerStatus,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount,
        createdAt: user.createdAt,
        serviceProfile: serviceProfile,
        serviceType: serviceType
      });
    } else {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount,
        createdAt: user.createdAt
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New controller function for the Google OAuth callback route
const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Google authentication failed' });
    }

    const user = req.user;

    // Update login details
    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    // Redirect user to frontend dashboard/home
    const redirectUrl = `${process.env.FRONTEND_URL}/`;
    res.redirect(redirectUrl);

  } catch (error) {
    console.error("Google Callback Error:", error);
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    // Redirect to frontend error page or let frontend handle error status
    const redirectUrl = `${process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:3000')}/login?error=google_signin_failed`;
    res.redirect(redirectUrl);
  }
};

export { registerUser, loginUser, logoutUser, getMe, googleCallback };