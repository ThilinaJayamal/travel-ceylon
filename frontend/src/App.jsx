import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAppStore } from "./store/app-store";
import { useAuthStore } from "./store/authStore";

import ReviewBox from "./components/ReviewBox";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import StaysAdmin from './pages/StaysAdmin';
import Stays from "./pages/Stays";
import StaysFilter from "./pages/StaysFilter";
import Taxi from './pages/Taxi';
import Guides from './pages/Guides';
import Guide from './pages/Guide';
import Guide from './pages/Guide';
import GuideSearchResults from './pages/GuideSearchResults';
import NotFound from './pages/NotFound';

import Registration from './pages/Registration/Registration';
import HotelRegistration from './pages/Registration/HotelRegistration';
import TaxiRegistration from './pages/Registration/TaxiRegistration';
import GuideRegistration from './pages/Registration/GuideRegistration';

function App() {
  const reviewOpen = useAppStore((state) => state.reviewOpen);
  
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [])

  const path = useLocation().pathname;

  // Check if current page is any registration page
  const isRegistrationPage = [
    "/registration",
    "/registration/hotel",
    "/registration/taxi",
    "/registration/guide"
  ].includes(path);

  // Show Navbar conditionally
  const showNavbar = () => {
    if (path === "/login" || path === "/" || path === "/guides/search" || isRegistrationPage || path.startsWith("/guide/")) {
      return false;
    }
    return true;
  };

    if (path === "/login" || path === "/" || path === "/guides/search") {
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

        {/* Registration routes */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration/hotel" element={<HotelRegistration />} />
        <Route path="/registration/taxi" element={<TaxiRegistration />} />
        <Route path="/registration/guide" element={<GuideRegistration />} />

        {/* Guide routes */}
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/search" element={<GuideSearchResults />} />
        <Route path="/guide/:id" element={<Guide />} />
        <Route path="/guide/:id" element={<Guide />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {showFooter() && <Footer />}

      {reviewOpen && <ReviewBox />}

      <Toaster />
    </>
  );

export default App;
