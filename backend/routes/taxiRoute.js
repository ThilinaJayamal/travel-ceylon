import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getAllTaxi,
  createTaxiBooking,
  getAvailableTaxis,
  getTaxiProfile,
  registerTaxi,
  updateTaxi,
  changeBookingState,
  calculateDistance,
} from "../controllers/TaxiController.js";

const router = express.Router();

router
  .route("/")
  .post(auth, registerTaxi)
  .put(auth, updateTaxi)
  .get(getAllTaxi);

router.route("/profile").get(auth, getTaxiProfile);

router.route("/available").get(getAvailableTaxis);
router.route("/booking").post(auth, createTaxiBooking);
router.route("/booking/:bookingId").put(auth, changeBookingState);
router.route("/distance").post(calculateDistance);

export default router;
