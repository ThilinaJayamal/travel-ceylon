import React, { useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import ReviewBox from './components/ReviewBox';
import { useAppStore } from './store/app-store';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';

function App() {

  const reviewOpen = useAppStore((state) => state.reviewOpen);
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
        <Route path='/user' element={<UserProfile />} />
      </Routes>

      {showFooter() && <Footer />}

      {
        reviewOpen && <ReviewBox />
      }
    </>
  )
}

export default App