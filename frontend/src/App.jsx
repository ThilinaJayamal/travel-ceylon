// src/App.js
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import ReviewBox from './components/ReviewBox';
import useAuthStore from './store/authStore'; // Import the Zustand store
import UserProfile from './pages/UserProfile';
import Taxi from './pages/Taxi';
import StaysAdmin from './pages/StaysAdmin';
import StaysFilter from './pages/StaysFilter';
import Stays from './pages/Stays';

function App() {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviewFor, setReviewFor] = useState("platform");

  const path = useLocation().pathname;

  // Get the fetchUser action from the store
  const fetchUser = useAuthStore((state) => state.fetchUser);

  // Fetch user data when the app mounts to check for existing login state
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Add fetchUser to dependency array


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
      {showReviewBox && <ReviewBox setShowReviewBox={setShowReviewBox} reviewFor={reviewFor} />}
      {showNavbar() && <Navbar />}
      <Routes>
        <Route path='/' element={<Home setShowReviewBox={setShowReviewBox} setReviewFor={setReviewFor} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-profile' element={<UserProfile />} />
        
        <Route path='/taxi' element={<Taxi />} />

        <Route path='/stays-admin' element={<StaysAdmin />} />
        <Route path='/stays' element={<Stays />} />
        <Route path='/stays-filters' element={<StaysFilter />} />
      </Routes>

      {showFooter() && <Footer />}

      <Toaster />
    </>
  );
}

export default App;
