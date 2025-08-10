import Guide from '../models/Guide.js';
import Taxi from '../models/Taxi.js';
import Hotel from '../models/Hotel.js';
import RentalVehicle from '../models/RentalVehicle.js';

const createGuide = async (req, res) => {
  const { name, bio, languages, experienceYears, hourlyRate, dailyRate, locationsServed } = req.body;

  try {
    // Check if user already has ANY service
    const existingTaxi = await Taxi.findOne({ providerId: req.user._id });
    const existingHotel = await Hotel.findOne({ providerId: req.user._id });
    const existingGuide = await Guide.findOne({ providerId: req.user._id });
    const existingRental = await RentalVehicle.findOne({ providerId: req.user._id });
    
    if (existingTaxi || existingHotel || existingGuide || existingRental) {
      return res.status(400).json({ message: 'You already have a service. Each user can only create one service.' });
    }

    const guide = await Guide.create({
      name,
      bio,
      languages,
      experienceYears,
      hourlyRate,
      dailyRate,
      locationsServed,
      providerId: req.user._id,
    });
    res.status(201).json(guide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ status: 'active' });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (guide) {
      res.json(guide);
    } else {
      res.status(404).json({ message: 'Guide not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateGuide = async (req, res) => {
  const { name, bio, languages, experienceYears, hourlyRate, dailyRate, locationsServed, status } = req.body;
  
  try {
    const guide = await Guide.findOne({ providerId: req.user._id });
    
    if (guide) {
      guide.name = name || guide.name;
      guide.bio = bio || guide.bio;
      guide.languages = languages || guide.languages;
      guide.experienceYears = experienceYears || guide.experienceYears;
      guide.hourlyRate = hourlyRate || guide.hourlyRate;
      guide.dailyRate = dailyRate || guide.dailyRate;
      guide.locationsServed = locationsServed || guide.locationsServed;
      guide.status = status || guide.status;
      
      const updatedGuide = await guide.save();
      res.json(updatedGuide);
    } else {
      res.status(404).json({ message: 'Guide not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findOne({ providerId: req.user._id });
    
    if (guide) {
      await guide.remove();
      res.json({ message: 'Guide removed' });
    } else {
      res.status(404).json({ message: 'Guide not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createGuide, getGuides, getGuideById, updateGuide, deleteGuide };