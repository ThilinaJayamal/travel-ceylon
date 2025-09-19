import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  maxGuest: { type: Number, required: true },
  beds: [
    {
      twin: { type: Number },
      full: { type: Number },
      queen: { type: Number },
      king: { type: Number }
    }
  ],
  facilites: {
    AC: { type: Boolean, default: false },
    WIFI: { type: Boolean, default: false }
  },
  images: { type: [String] }
});

const room = mongoose.model("Room", RoomSchema);

export default room