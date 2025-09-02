import React, { useEffect } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ReviewBox from "./components/ReviewBox";
import { useAppStore } from "./store/app-store";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import StaysAdmin from "./pages/StaysAdmin";
import { useAuthStore } from "./store/auth-store";
import { Toaster } from "react-hot-toast";
import Stays from "./pages/Stays";
import StaysFilter from "./pages/StaysFilter";
import NotFound from "./pages/NotFound";
import Taxi from "./pages/Taxi";
import TaxiBookings from "./pages/TaxiBookings.jsx";
import SpecificTaxi from "./pages/SpecificTaxi.jsx";
import RentTaxi from "./pages/RentTaxi.jsx";
import RentedVehicleDetails from "./pages/RentedVehicleDetails.jsx";
import TaxiAdminViewBookings from "./pages/TaxiAdminViewBookings.jsx";
import TaxiAdminViewDashboard from "./pages/TaxiAdminViewDashboard.jsx";
import TaxiAdminViewAccount from "./pages/TaxiAdminViewAccount.jsx";
import TaxiBookingPayment from "./pages/TaxiBookingPayment.jsx";
import TaxiRentingPayment from "./pages/TaxiRentingPayment.jsx";

function App() {
  const reviewOpen = useAppStore((state) => state.reviewOpen);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const path = useLocation().pathname;

  const showFooter = () => {
    if (path === "/login") {
      return false;
    }
    return true;
  };

  const showNavbar = () => {
    if (path === "/login" || path === "/") {
      return false;
    }
    return true;
  };

  return (
    <>
      {showNavbar() && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/taxi-bookings" element={<TaxiBookings />} />
        <Route path="/specific-taxi" element={<SpecificTaxi />} />
        <Route path="/rent-taxi" element={<RentTaxi />} />
        <Route
          path="/view-renting-vehicle"
          element={<RentedVehicleDetails />}
        />
        <Route
          path="/taxi-admin-bookings"
          element={<TaxiAdminViewBookings />}
        />
        <Route
          path="taxi-admin-dashboard"
          element={<TaxiAdminViewDashboard />}
        />
        <Route path="taxi-renting-payment" element={<TaxiRentingPayment />} />
        <Route path="taxi-admin-account" element={<TaxiAdminViewAccount />} />
        <Route path="taxi-booking-payment" element={<TaxiBookingPayment />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/stays-admin" element={<StaysAdmin />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/filter" element={<StaysFilter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showFooter() && <Footer />}

      {reviewOpen && <ReviewBox />}

      <Toaster />
    </>
  );
}

export default App;
