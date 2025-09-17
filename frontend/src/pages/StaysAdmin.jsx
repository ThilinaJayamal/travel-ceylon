import React, { useState, useEffect } from 'react';
import { asserts } from '../assets/assets';
import BookingCard from '../components/BookingCard';
import BillViewer from '../components/BillViewer';
import { AnimatePresence, motion } from 'framer-motion';
import { SquarePen } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import DescriptionEditor from '../components/DescriptionEditor';
import Checkbox from '../components/Checkbox';
import { useHotelStore } from '../store/hotelStore';
import { useServiceAuthStore } from "../store/serviceAuthStrore"

const rooms = [
  { type: "Double", price: 25.0, maxGuest: 2, bed: "1 King Bed", available: true },
  { type: "Twin", price: 30.0, maxGuest: 4, bed: "2 Twin Bed", available: true }
];

const initialFacilities = [
  "Breakfast", "Fitness Center", "Room Service", "Grden", "24 hour front desk", "Family Rooms",
  "Bar", "Parking", "Airport shuttle", "Beach", "Free Wifi", "A/C Rooms", "Swing pool", "Water Park"
].map(title => ({ title, value: false }));

function StaysAdmin() {
  const getStaysMe = useHotelStore((state) => state.getStaysMe);
  const staysProfile = useHotelStore((state) => state.staysProfile);
  const loading = useHotelStore((state) => state.loading);
  const user = useServiceAuthStore((state) => state.user);

  const [activeTab, setActiveTab] = useState('Bookings');
  const [facilities, setFacilities] = useState(initialFacilities);
  const [selectedBooking, setSelectedBooking] = useState(0);

  const mockBookingData = [];

  useEffect(() => {
    getStaysMe();
  }, [user])

  if (staysProfile == null || loading == true) {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }

  return (
    <>
      <div className="pb-24">
        {/* Background Header */}
        <div
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${staysProfile.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          className="relative h-80 z-10"
        >
          <button className='p-2 rounded-md bg-green-300 absolute bottom-2 right-2 z-20 cursor-pointer'>
            <SquarePen className='size-6' />
          </button>
        </div>

        {/* Profile Info */}
        <div className="z-20 md:ml-8 -mt-20 flex md:flex-row flex-col gap-1 md:items-center w-fit mx-auto text-center md:text-left">
          <img src={staysProfile.profilePic}
            className="size-44 object-center z-20 object-cover rounded-full border-4
           border-white bg-black" alt="User" />
          <div className="md:mt-22 mt-1">
            <h2 className="text-2xl font-semibold">{staysProfile.name}</h2>
            <p className="text-lg text-black/70">{staysProfile.location}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="md:mx-8 mx-4 md:mt-8 mt-4">
          <div className="flex items-center justify-evenly bg-white px-4 py-5 rounded-xl border border-gray-200">
            {['Bookings', 'Dashboard', 'Account'].map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex flex-col items-center cursor-pointer px-2"
              >
                <h3 className={`text-lg font-medium ${activeTab === tab ? 'text-black' : 'text-gray-500'}`}>{tab}</h3>
                <div className={`h-1 w-full mt-1 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-green-300' : 'bg-transparent'}`} />
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'Bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid xl:grid-cols-[2fr_3fr] grid-cols-1 gap-6 mt-6"
              >
                <div className="flex flex-col gap-4">
                  {mockBookingData.map((item, idx) => (
                    <BookingCard
                      key={idx}
                      image={item.image}
                      title={item.title}
                      location={item.location}
                      date={item.date}
                      index={idx}
                      onClick={setSelectedBooking}
                    />
                  ))}
                </div>
                <BillViewer {...mockBookingData[selectedBooking]} />
              </motion.div>
            )}

            {activeTab === 'Dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 mt-6 rounded-md p-4 md:p-8"
              >
                <h3 className="text-2xl font-semibold mb-4">Images</h3>
                <ImageGallery hotelImages={staysProfile?.images} />

                <h3 className="text-2xl font-semibold mt-8 mb-3">Description</h3>
                <DescriptionEditor content={staysProfile?.description} />

                <h2 className="text-2xl font-medium mt-8 mb-4">Room Options</h2>
                

                <h2 className="text-2xl font-medium mt-10 mb-3">Facilities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 mt-3">

                  {
                    Object.keys(staysProfile.facilities).forEach(key => {
                      return <Checkbox
                        key={key}
                        title={key}
                        checked={staysProfile.facilities[key]}
                        onChange={(checked) => { }}
                      />

                    })
                  }
                </div>
              </motion.div>
            )}

            {activeTab === 'Account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 mt-6 rounded-md px-4 py-8"
              >
                <div className="space-y-4 mx-auto max-w-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">name</p>
                    <input
                      type={'text'}
                      placeholder={''}
                      value={staysProfile?.name}
                      onChange={(e) => { }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">email</p>
                    <input
                      type={'text'}
                      placeholder={''}
                      value={user?.email}
                      onChange={(e) => { }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">password</p>
                    <input
                      type={'password'}
                      placeholder={''}
                      value={user?.password}
                      onChange={(e) => { }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">Phone</p>
                    <input
                      type={'text'}
                      placeholder={''}
                      value={staysProfile?.contact[0]}
                      onChange={(e) => { }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default StaysAdmin;
