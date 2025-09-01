
import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import ReviewBox from './components/ReviewBox';
import { useAppStore } from './store/app-store';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import StaysAdmin from './pages/StaysAdmin';
import { useAuthStore } from './store/auth-store';
import { Toaster } from 'react-hot-toast';
import Stays from "./pages/Stays";
import StaysFilter from "./pages/StaysFilter";
import NotFound from './pages/NotFound';
import Taxi from './pages/Taxi';

import HotelRegistration from './pages/Registration/HotelRegistration';
import TaxiRegistration from './pages/Registration/TaxiRegistration';
import GuideRegistration from './pages/Registration/GuideRegistration';
import Registration from './pages/Registration/Registration';


function App() {
  const reviewOpen = useAppStore((state) => state.reviewOpen);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const path = useLocation().pathname;

 const isRegistrationPage = path === "/registration" || 
                          path === "/registration/hotel" || 
                          path === "/registration/taxi" || 
                          path === "/registration/guide";

const showFooter = () => {
  if (path === "/login" || isRegistrationPage) {
    return false;
  }
  return true;
};

const showNavbar = () => {
  if (path === "/login" || path === "/" || isRegistrationPage) {
    return false;
  }
  return true;
};

  return (
    <>
      {showNavbar() && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/taxi' element={<Taxi />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/stays-admin' element={<StaysAdmin />} />
        <Route path="/stays" element={<Stays />} />

        <Route path="/stays/filter" element={<StaysFilter />} />

        <Route path="/registration" element={<Registration />} />
        <Route path="/registration/hotel" element={<HotelRegistration />} />
        <Route path="/registration/taxi" element={<TaxiRegistration />} />
        <Route path="/registration/guide" element={<GuideRegistration />} />

        

        <Route path='*' element={<NotFound />} />
      </Routes>

      {showFooter() && <Footer />}

      {
        reviewOpen && <ReviewBox />
      }

      <Toaster />
    </>
  );
}

export default App;
