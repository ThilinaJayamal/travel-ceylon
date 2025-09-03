import mongoose from "mongoose";

const GuideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nic: { type: String, required: true },
  contact: { type: [String], required: true },
  linkend:{type:String},
  profilePic: { type: String },
  images: { type: [String] },
  specializeArea: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  languages: { type: [String], required: true },
  guideLicenceImg: { type: String },
  nicImg: { type: String },
  policeClearanceImg: { type: String },
  price: { type: Number, required: true },
});

const guide = mongoose.model("Guide", GuideSchema);

export default guide;