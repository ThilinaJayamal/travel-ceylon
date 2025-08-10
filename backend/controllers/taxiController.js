import Taxi from '../models/Taxi.js';
import Hotel from '../models/Hotel.js';
import Guide from '../models/Guide.js';
import RentalVehicle from '../models/RentalVehicle.js';

const createTaxi = async (req, res) => {
  const { vehicleType, brandModel, capacity, driverName, licensePlate, baseLocation, perKmRate, perHourRate } = req.body;

  try {
    // Check if user already has ANY service
    const existingTaxi = await Taxi.findOne({ providerId: req.user._id });
    const existingHotel = await Hotel.findOne({ providerId: req.user._id });
    const existingGuide = await Guide.findOne({ providerId: req.user._id });
    const existingRental = await RentalVehicle.findOne({ providerId: req.user._id });
    
    if (existingTaxi || existingHotel || existingGuide || existingRental) {
      return res.status(400).json({ message: 'You already have a service. Each user can only create one service.' });
    }

    const taxi = await Taxi.create({
      vehicleType,
      brandModel,
      capacity,
      driverName,
      licensePlate,
      baseLocation,
      perKmRate,
      perHourRate,
      providerId: req.user._id,
    });
    res.status(201).json(taxi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTaxis = async (req, res) => {
  try {
    const taxis = await Taxi.find({ status: 'active' });
    res.json(taxis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTaxiById = async (req, res) => {
  try {
    const taxi = await Taxi.findById(req.params.id);
    if (taxi) {
      res.json(taxi);
    } else {
      res.status(404).json({ message: 'Taxi not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTaxi = async (req, res) => {
  const { vehicleType, brandModel, capacity, driverName, licensePlate, baseLocation, perKmRate, perHourRate, status } = req.body;
  
  try {
    const taxi = await Taxi.findOne({ providerId: req.user._id });
    
    if (taxi) {
      taxi.vehicleType = vehicleType || taxi.vehicleType;
      taxi.brandModel = brandModel || taxi.brandModel;
      taxi.capacity = capacity || taxi.capacity;
      taxi.driverName = driverName || taxi.driverName;
      taxi.licensePlate = licensePlate || taxi.licensePlate;
      taxi.baseLocation = baseLocation || taxi.baseLocation;
      taxi.perKmRate = perKmRate || taxi.perKmRate;
      taxi.perHourRate = perHourRate || taxi.perHourRate;
      taxi.status = status || taxi.status;
      
      const updatedTaxi = await taxi.save();
      res.json(updatedTaxi);
    } else {
      res.status(404).json({ message: 'Taxi not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTaxi = async (req, res) => {
  try {
    const taxi = await Taxi.findOne({ providerId: req.user._id });
    
    if (taxi) {
      await taxi.remove();
      res.json({ message: 'Taxi removed' });
    } else {
      res.status(404).json({ message: 'Taxi not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createTaxi, getTaxis, getTaxiById, updateTaxi, deleteTaxi };