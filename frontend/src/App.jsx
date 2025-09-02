import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Stores
import { useAuthStore } from "./store/authStore";
import { useServiceAuthStore } from "./store/serviceAuthStrore";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReviewBox from "./components/ReviewBox";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import StaysAdmin from "./pages/StaysAdmin";
import TaxiAdminViewDashboard from "./pages/TaxiAdminViewDashboard";
import ServiceProviderLogin from "./pages/ServiceProviderLogin"

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const reviewOpen = false; // example, replace with your store state

  // Load user/provider
  const traveler = useAuthStore((state) => state.user);
  const loadUser = useAuthStore((state) => state.loadUser);

  const travelerError = useAuthStore((state) => state.error);
  const travelerErrorClear = useAuthStore((state) => state.clearError)

  const providerError = useServiceAuthStore((state) => state.error)
  const providerErrorClear = useServiceAuthStore((state) => state.clearError);

  const provider = useServiceAuthStore((state) => state.user);
  const loadProvider = useServiceAuthStore((state) => state.loadUser);

  const [user, setUser] = useState(null);
  const path = useLocation().pathname;

  useEffect(() => {
    loadUser();
    loadProvider();
  }, []);

  useEffect(() => {
    if (traveler) setUser(traveler);
    else if (provider) setUser(provider);
  }, [traveler, provider]);

  useEffect(() => {
    if (travelerError) {
      toast.error(travelerError);
      travelerErrorClear();
    }
    if (providerError) {
      toast.error(providerError);
      providerErrorClear();
    }
  }, [travelerError, providerError])

  const showNavbar = !["/", "/login", "/service/login"].includes(path);
  const showFooter = !["/login", "/service/login"].includes(path);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service/login" element={<ServiceProviderLogin />} />

        {/* User Protected */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]} user={user}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected */}
        <Route
          path="/stays/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]} user={user}>
              <StaysAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/taxi/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]} user={user}>
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
