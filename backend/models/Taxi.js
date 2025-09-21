import mongoose from "mongoose";

const TaxiSchema = new mongoose.Schema(
  {
    // Driver details
    driverName: { type: String, required: true },
    nic: { type: String, required: true },
    drivingId: { type: String, required: true },
    profilePic: { type: String, required: true },
    nicImg: { type: String },
    drivingIdImg: { type: String },
    contact: [{ type: String }],

    // Vehicle details
    chasyNo: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    model: { type: String, required: true }, // ✅ Vehicle Model
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Hybrid", "Electric"], // ✅ New field
      required: true,
    },
    province: { type: String },
    vehicleType: {
      type: String,
      enum: ["Car", "Van", "Bus", "Tuk", "Bike"],
      required: true,
    },
    image: { type: String },
    images: [{ type: String }],

    // Pricing & location
    perKm: { type: Number, required: true },
    feePerKm: { type: Number },
    location: { type: String, required: true },
    rating: { type: Number, default: 0 },

    // Extra details
    bio: { type: String },
    intro: { type: String },
    features: [
      {
        name: { type: String, required: true },
        caption: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Taxi", TaxiSchema);
