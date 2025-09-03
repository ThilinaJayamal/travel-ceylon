import mongoose from "mongoose";


const RoomSubSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  price: { type: Number, default: 0 },
  count: { type: Number, default: 1 }, // number of identical rooms
  maxGuest: { type: Number, default: 1 },
  beds: { type: mongoose.Schema.Types.Mixed, default: {} }, // or Map/of Number
  features: [{ type: String }],
  images: [{ type: String }],
}, { _id: true }); // keep _id true if you want each subdoc to have an id

const StaySchema = new mongoose.Schema({
    name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  website: { type: String },
  facilities: [{ type: String }],
  rooms: [RoomSubSchema], // <-- embedded subdocuments
  images: [{ type: String }],
  description: { type: String },
  profilePic: { type: String },
  },
{ timestamps: true});

const stays = mongoose.model("Stays", StaySchema);

export default stays;
