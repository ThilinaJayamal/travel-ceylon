import React, { useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import { asserts } from './assets/assets'
import ReviewBox from './components/ReviewBox';
import { useAppStore } from './store/app-store';

function App() {

  const reviewOpen = useAppStore((state) => state.reviewOpen);

  return (
    <>
      <div className='bg-gray-50'>
        <Home />
        <Footer />
      </div>
      {
        reviewOpen && <ReviewBox />
      }
    </>
  )
}

export default App