import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAppStore } from "./store/app-store";
import { useAuthStore } from "./store/authStore";
import { useServiceAuthStore } from "./store/serviceAuthStrore";

import ReviewBox from "./components/ReviewBox";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

// Stays
import StaysAdmin from "./pages/StaysAdmin";
import Stays from "./pages/Stays";
import StaysFilter from "./pages/StaysFilter";
import SpecificHotel from "./pages/SpecificHotel";
import HotelPayment from "./pages/HotelPayment";

// Taxi
import Taxi from "./pages/Taxi";
import TaxiBookings from "./pages/TaxiBookings.jsx";
import SpecificTaxi from "./pages/SpecificTaxi.jsx";
import RentTaxi from "./pages/RentTaxi.jsx";
import RentedVehicleDetails from "./pages/RentedVehicleDetails.jsx";
import TaxiAdminViewBookings from "./pages/TaxiAdminViewBookings.jsx";
import TaxiAdminViewDashboard from "./pages/TaxiAdminViewDashboard.jsx";
import TaxiAdminViewAccount from "./pages/TaxiAdminViewAccount.jsx";

// Guides
import Guides from "./pages/Guides";
import Guide from "./pages/Guide";
import GuideSearchResults from "./pages/GuideSearchResults";

// Registration
import Registration from "./pages/Registration/Registration";
import HotelRegistration from "./pages/Registration/HotelRegistration";
import TaxiRegistration from "./pages/Registration/TaxiRegistration";
import GuideRegistration from "./pages/Registration/GuideRegistration";
import ServiceProviderLogin from "./pages/ServiceproviderLogin";

// Others
import NotFound from "./pages/NotFound";

function App() {
  const reviewOpen = useAppStore((state) => state.reviewOpen);
  const loadUser = useAuthStore((state) => state.loadUser);
  const loadProvider = useServiceAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
    loadProvider();
  }, []);

  const path = useLocation().pathname;

  // Registration pages
  const isRegistrationPage = [
    "/registration",
    "/registration/hotel",
    "/registration/taxi",
    "/registration/guide",
  ].includes(path);

  // Show Navbar conditionally
  const showNavbar = () => {
    if (
      path === "/login" ||
      path === "/" ||
      path === "/guides/search" ||
      path.startsWith("/guide/") ||
      isRegistrationPage
    ) {
      return false;
    }
    return true;
  };

  // Show Footer conditionally
  const showFooter = () => {
    if (path === "/login" || isRegistrationPage) {
      return false;
    }
    return true;
  };

  return (
    <>
      {showNavbar() && <Navbar />}

      <Routes>
        {/* Home & Login */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Taxi routes */}
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/taxi-bookings" element={<TaxiBookings />} />
        <Route path="/specific-taxi" element={<SpecificTaxi />} />
        <Route path="/rent-taxi" element={<RentTaxi />} />
        <Route path="/view-renting-vehicle" element={<RentedVehicleDetails />} />
        <Route path="/taxi-admin-bookings" element={<TaxiAdminViewBookings />} />
        <Route path="/taxi-admin-dashboard" element={<TaxiAdminViewDashboard />} />
        <Route path="/taxi-admin-account" element={<TaxiAdminViewAccount />} />

        {/* User & stays */}
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/stays-admin" element={<StaysAdmin />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/specific-hotel" element={<SpecificHotel />} />
        <Route path="/stays/payment" element={<HotelPayment />} />
        <Route path="/stays/filter" element={<StaysFilter />} />

        {/* Registration routes */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration/hotel" element={<HotelRegistration />} />
        <Route path="/registration/taxi" element={<TaxiRegistration />} />
        <Route path="/registration/guide" element={<GuideRegistration />} />
        <Route path="/service-provider/login" element={<ServiceProviderLogin />} />

        {/* Guide routes */}
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/search" element={<GuideSearchResults />} />
        <Route path="/guide/:id" element={<Guide />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showFooter() && <Footer />}
      {reviewOpen && <ReviewBox />}
      <Toaster />
    </>
  );
}

export default App;
