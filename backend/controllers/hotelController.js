import Hotel from '../models/Hotel.js';
import Taxi from '../models/Taxi.js';
import Guide from '../models/Guide.js';
import RentalVehicle from '../models/RentalVehicle.js';

const createHotel = async (req, res) => {
  const { name, description, location, roomTypes, amenities } = req.body;

  try {
    // Check if user already has ANY service
    const existingTaxi = await Taxi.findOne({ providerId: req.user._id });
    const existingHotel = await Hotel.findOne({ providerId: req.user._id });
    const existingGuide = await Guide.findOne({ providerId: req.user._id });
    const existingRental = await RentalVehicle.findOne({ providerId: req.user._id });
    
    if (existingTaxi || existingHotel || existingGuide || existingRental) {
      return res.status(400).json({ message: 'You already have a service. Each user can only create one service.' });
    }

    const hotel = await Hotel.create({
      name,
      description,
      location,
      roomTypes,
      amenities,
      providerId: req.user._id,
    });
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ status: 'active' });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateHotel = async (req, res) => {
  const { name, description, location, roomTypes, amenities, status } = req.body;
  
  try {
    const hotel = await Hotel.findOne({ providerId: req.user._id });
    
    if (hotel) {
      hotel.name = name || hotel.name;
      hotel.description = description || hotel.description;
      hotel.location = location || hotel.location;
      hotel.roomTypes = roomTypes || hotel.roomTypes;
      hotel.amenities = amenities || hotel.amenities;
      hotel.status = status || hotel.status;
      
      const updatedHotel = await hotel.save();
      res.json(updatedHotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ providerId: req.user._id });
    
    if (hotel) {
      await hotel.remove();
      res.json({ message: 'Hotel removed' });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createHotel, getHotels, getHotelById, updateHotel, deleteHotel };