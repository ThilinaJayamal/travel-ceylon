import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Stores
import { useAuthStore } from "./store/authStore";
import { useServiceAuthStore } from "./store/serviceAuthStore";
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

  const [currentUser, setCurrentUser] = useState(null);

  // Load users on app start
  useEffect(() => {
    loadTraveler();
    loadProvider();
  }, []);

  // Set currentUser
  useEffect(() => {
    if (traveler) setCurrentUser(traveler);
    else if (provider) setCurrentUser(provider);
    else setCurrentUser(null);
  }, [traveler, provider]);

  // Redirect after login
  useEffect(() => {
    if (!currentUser) return;

    if (["/", "/login", "/service/login"].includes(path)) {
      const { role, serviceType } = currentUser;

      if (role === "user") {
        navigate("/user/profile");
      } else if (role === "provider") {
        if (!serviceType) return navigate("/registration");

        const routes = {
          Taxi: "/taxi/admin",
          Rent: "/",
          Guide: "/guides/admin",
          Stays: "/stays/admin",
        };
        navigate(routes[serviceType] || "/");
      }
    }
  }, [currentUser, navigate, path]);

  // Handle errors
  useEffect(() => {
    if (travelerError) {
      toast.error(travelerError);
      travelerErrorClear();
    }
    if (providerError) {
      toast.error(providerError);
      providerErrorClear();
    }
  }, [travelerError, providerError]);

  // Navbar/Footer visibility
  const showNavbar = !["/", "/login", "/service/login","/registration/guide"].includes(path);
  const showFooter = !["/login", "/service/login","/registration/guide"].includes(path);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service/login" element={<ServiceProviderLogin />} />
        <Route path="/registration" element={<Registration />} />

        {/* Taxi Routes */}
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/taxi-bookings" element={<TaxiBookings />} />
        <Route path="/specific-taxi" element={<SpecificTaxi />} />
        <Route path="/rent-taxi" element={<RentTaxi />} />
        <Route path="/view-renting-vehicle" element={<RentedVehicleDetails />} />

        {/* Stays Routes */}
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/filter" element={<StaysFilter />} />

        {/* Guides Routes */}
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/search" element={<GuideSearchResults />} />
        <Route path="/guide/:id" element={<Guide />} />

        {/* User Protected */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]} currentUser={currentUser}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Provider Protected */}
        <Route
          path="/registration/hotel"
          element={
            <ProtectedRoute allowedRoles={["provider"]} currentUser={currentUser}>
              <HotelRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registration/taxi"
          element={
            <ProtectedRoute allowedRoles={["provider"]} currentUser={currentUser}>
              <TaxiRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registration/guide"
          element={
            <ProtectedRoute allowedRoles={["provider"]} currentUser={currentUser}>
              <GuideRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stays/admin"
          element={
            <ProtectedRoute allowedRoles={["provider"]} currentUser={currentUser}>
              <StaysAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/taxi/admin"
          element={
            <ProtectedRoute allowedRoles={["provider"]} currentUser={currentUser}>
              <TaxiAdminViewDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showFooter && <Footer />}
      {reviewOpen && <ReviewBox />}
      <Toaster />
    </>
  );
}

export default App;
