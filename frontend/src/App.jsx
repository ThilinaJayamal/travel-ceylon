import React, { useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import { asserts } from './assets/assets'
import ReviewBox from './components/ReviewBox';
import { useAppStore } from './store/app-store';
import { Router } from 'lucide-react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';

function App() {

  const reviewOpen = useAppStore((state) => state.reviewOpen);
  const path = useLocation().pathname;

  const showFooter = () => {
    if (path === '/login' || path === '/register') {
      return false;
    }
    return true;
  }

  return (
    <>
      <div className='bg-gray-50'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        {showFooter() && <Footer />}
      </div>

      {
        reviewOpen && <ReviewBox />
      }
    </>
  )
}

export default App