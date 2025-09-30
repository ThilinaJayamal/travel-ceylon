import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Stores
import { useAuthStore } from "./store/authStore";
import { useServiceAuthStore } from "./store/serviceAuthStrore";
import { useAppStore } from "./store/app-store";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReviewBox from "./components/ReviewBox";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import StaysAdmin from "./pages/StaysAdmin";
import TaxiAdminViewDashboard from "./pages/TaxiAdminViewDashboard";
import ServiceProviderLogin from "./pages/ServiceproviderLogin";
import Taxi from "./pages/Taxi";
import TaxiBookings from "./pages/TaxiBookings";
import SpecificTaxi from "./pages/SpecificTaxi";
import RentTaxi from "./pages/RentTaxi";
import RentedVehicleDetails from "./pages/RentedVehicleDetails";
import Stays from "./pages/Stays";
import StaysFilter from "./pages/StaysFilter";
import Guides from "./pages/Guides";
import GuideSearchResults from "./pages/GuideSearchResults";
import Guide from "./pages/Guide";
import Registration from "./pages/Registration/Registration";
import HotelRegistration from "./pages/Registration/HotelRegistration";
import TaxiRegistration from "./pages/Registration/TaxiRegistration";
import GuideRegistration from "./pages/Registration/GuideRegistration";
import GuidePayment from "./pages/GuidePayment";
import TaxiAdminViewBookings from "./pages/TaxiAdminViewBookings";
import TaxiAdminViewAccount from "./pages/TaxiAdminViewAccount";
import GuideAdmin from "./pages/GuideAdmin";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // App Store
  const reviewOpen = useAppStore((state) => state.reviewOpen);

  // Traveler Auth
  const traveler = useAuthStore((state) => state.user);
  const loadTraveler = useAuthStore((state) => state.loadUser);
  const travelerError = useAuthStore((state) => state.error);
  const travelerErrorClear = useAuthStore((state) => state.clearError);

  // Provider Auth
  const provider = useServiceAuthStore((state) => state.user);
  const loadProvider = useServiceAuthStore((state) => state.loadUser);
  const providerError = useServiceAuthStore((state) => state.error);
  const providerErrorClear = useServiceAuthStore((state) => state.clearError);
  const isAuthChecking = useAuthStore((state) => state.isAuthChecking)
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadTraveler();
    loadProvider();
  }, [])

  console.log(isAuthChecking)

  if (isAuthChecking) {
    return (
      <div>
        Loading...
      </div>
    )
  }


  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={!traveler ? <Home /> : <Navigate to={"/user/profile"} />} />
        <Route path="/login" element={traveler ? <UserProfile /> : <Login />} />
        <Route path="/user/profile" element={traveler ? <UserProfile /> : <Navigate to={"/"} />} />

        <Route path="/provider/login" element={(provider && provider?.serviceType) ? <Navigate to={`/provider/${provider?.serviceType.toLowerCase()}/admin`} /> : <ServiceProviderLogin/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      {reviewOpen && <ReviewBox />}
      <Toaster />
    </>
  );
}

export default App;
