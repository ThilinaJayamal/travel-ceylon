import RentalVehicle from '../models/RentalVehicle.js';
import Taxi from '../models/Taxi.js';
import Hotel from '../models/Hotel.js';
import Guide from '../models/Guide.js';

const createRental = async (req, res) => {
  const { make, model, year, type, dailyRate, hourlyRate, location, features } = req.body;

  try {
    // Check if user already has ANY service
    const existingTaxi = await Taxi.findOne({ providerId: req.user._id });
    const existingHotel = await Hotel.findOne({ providerId: req.user._id });
    const existingGuide = await Guide.findOne({ providerId: req.user._id });
    const existingRental = await RentalVehicle.findOne({ providerId: req.user._id });
    
    if (existingTaxi || existingHotel || existingGuide || existingRental) {
      return res.status(400).json({ message: 'You already have a service. Each user can only create one service.' });
    }

    const rental = await RentalVehicle.create({
      make,
      model,
      year,
      type,
      dailyRate,
      hourlyRate,
      location,
      features,
      providerId: req.user._id,
    });
    res.status(201).json(rental);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRentals = async (req, res) => {
  try {
    const rentals = await RentalVehicle.find({ status: 'active' });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRentalById = async (req, res) => {
  try {
    const rental = await RentalVehicle.findById(req.params.id);
    if (rental) {
      res.json(rental);
    } else {
      res.status(404).json({ message: 'Rental vehicle not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRental = async (req, res) => {
  const { make, model, year, type, dailyRate, hourlyRate, location, features, status } = req.body;
  
  try {
    const rental = await RentalVehicle.findOne({ providerId: req.user._id });
    
    if (rental) {
      rental.make = make || rental.make;
      rental.model = model || rental.model;
      rental.year = year || rental.year;
      rental.type = type || rental.type;
      rental.dailyRate = dailyRate || rental.dailyRate;
      rental.hourlyRate = hourlyRate || rental.hourlyRate;
      rental.location = location || rental.location;
      rental.features = features || rental.features;
      rental.status = status || rental.status;
      
      const updatedRental = await rental.save();
      res.json(updatedRental);
    } else {
      res.status(404).json({ message: 'Rental vehicle not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRental = async (req, res) => {
  try {
    const rental = await RentalVehicle.findOne({ providerId: req.user._id });
    
    if (rental) {
      await rental.remove();
      res.json({ message: 'Rental vehicle removed' });
    } else {
      res.status(404).json({ message: 'Rental vehicle not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createRental, getRentals, getRentalById, updateRental, deleteRental };