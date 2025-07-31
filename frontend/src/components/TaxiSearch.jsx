import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, CarFront } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const TaxiSearch = () => {
  
  const navigate=useNavigate();
  const[formData,setFormData]=useState({
    pickup:'Tissamaharama',
    drop:'Mirissa',
    medium:'Car'
  })

 const handleChange=(e)=>{
  const {name,value}=e.target;
  setFormData(prev=>({
    ...prev,
    [name]:value
  }))
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/taxi-bookings',{state:formData})
  };

  return (
    <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-full p-4 sm:p-7 z-50'>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-start text-left text-sm py-0 sm:text-xs md:text-sm lg:text-base m-0 font-semibold">
            <span>Where you want to go</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-1  py-0 sm:gap-4 w-full max-w-full p-0 sm:p-0 ">
            {/* Pickup */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="labelFlex self-start">
                <label className="text-sm font-medium text-gray-700 mb-1 text-left">Pickup</label>
              </div>
              <div className="relative">
                <select
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  className="w-full text-gr p-3 pr-10 pl-10 border border-gray-400 rounded-md bg-white text-gray-500 appearance-none"
                >
                  <option value="Tissamaharama">Tissamaharama</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Ella">Ella</option>
                </select>
                <ArrowDownLeft className="text-gray-800 absolute top-[35%] left-3" size={18} />
              </div>
            </div>


            {/* Drop */}
            <div className="flex flex-col flex-1">
              <div className="labelFlex self-start">
                <label className="text-sm font-medium text-gray-700 mb-1 text-left">Drop</label>
              </div>
              <div className="relative">
                <select
                  name="drop"
                  value={formData.drop}
                  onChange={handleChange}
                  className="w-full p-3 pr-10 pl-10 border border-gray-400 rounded-md bg-white text-gray-500 appearance-none"
                >
                  <option value="Mirissa">Mirissa</option>
                  <option value="Galle">Galle</option>
                  <option value="Kandy">Kandy</option>
                </select>
                <ArrowUpRight className="text-gray-800 absolute top-[35%] left-3" size={18} />
              </div>
            </div>

            {/* Medium */}
            <div className="flex flex-col flex-1">
              <div className="labelFlex self-start">
                <label className="text-sm font-medium text-gray-700 mb-1 text-left">Medium</label>
              </div>
              <div className="relative">
                <select
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  className="w-full p-3 pr-10 pl-10 border border-gray-400 rounded-md bg-white text-gray-500 appearance-none"
                >
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                  <option value="TukTuk">TukTuk</option>
                </select>
                <CarFront className="text-gray-800 absolute top-[35%] left-3" size={18} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#8dd3bb] hover:bg-teal-400 text-black text-sm sm:text-md font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md transition duration-200"
            >
              Search
            </button>
          </div>
        </form>
    </div>

  );
};

export default TaxiSearch;