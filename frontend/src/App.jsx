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

function App() {

  const reviewOpen = useAppStore((state) => state.reviewOpen);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const path = useLocation().pathname;

  const showFooter = () => {
    if (path === '/login') {
      return false;
    }
    return true;
  }

  const showNavbar = () => {
    if (path === '/login' || path === '/') {
      return false;
    }
    return true;
  }

  return (
    <>
      {showNavbar() && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/stays-admin' element={<StaysAdmin />} />
      </Routes>

      {showFooter() && <Footer />}

      {
        reviewOpen && <ReviewBox />
      }

      <Toaster/>
    </>
  )
}

export default App