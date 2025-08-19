import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Guides from './pages/Guides'
import Footer from './components/Footer'


function App() {
  return (
    // <div className='bg-gray-50'>
    //   <Home />
    //   <Footer />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guides" element={<Guides />} />
      </Routes>
    </Router>
  )
}

export default App