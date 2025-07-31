import React, { useState, useEffect } from 'react';
import { asserts } from '../assets/assets';
import BookingCard from '../components/BookingCard';
import BillViewer from '../components/BillViewer';
import { AnimatePresence, motion } from 'framer-motion';
import { SquarePen } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import DescriptionEditor from '../components/DescriptionEditor';
import Checkbox from '../components/Checkbox';

const rooms = [
  { type: "Double", price: 25.0, maxGuest: 2, bed: "1 King Bed", available: true },
  { type: "Twin", price: 30.0, maxGuest: 4, bed: "2 Twin Bed", available: true }
];

const initialFacilities = [
  "Breakfast", "Fitness Center", "Room Service", "Grden", "24 hour front desk", "Family Rooms",
  "Bar", "Parking", "Airport shuttle", "Beach", "Free Wifi", "A/C Rooms", "Swing pool", "Water Park"
].map(title => ({ title, value: false }));

function StaysAdmin() {
  const [activeTab, setActiveTab] = useState('Bookings');
  const [facilities, setFacilities] = useState(initialFacilities);
  const [selectedBooking, setSelectedBooking] = useState(0);

  // Account fields
  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleFacilityChange = (index, checked) => {
    const updated = [...facilities];
    updated[index].value = checked;
    setFacilities(updated);
  };

  const handleAccountChange = (field, value) => {
    setAccount(prev => ({ ...prev, [field]: value }));
  };

  const mockBookingData = [
    {
      image: asserts.Bt_bg,
      title: "Luxury Resort Stay",
      date: "10 Aug 2025",
      location: "Nuwara Eliya",
      sections: [
        {
          heading: "Booking Details",
          items: [
            { label: "Check-in", value: "2025-08-10" },
            { label: "Check-out", value: "2025-08-15" }
          ]
        },
        {
          heading: "Cost Breakdown",
          items: [
            { label: "Room", value: "$200" },
            { label: "Tax", value: "$20" },
            { label: "Service", value: "$15" }
          ]
        }
      ]
    },
    {
      image: asserts.heroBg,
      title: "Beach View Hotel",
      date: "5 Sep 2025",
      location: "Unawatuna",
      sections: [
        {
          heading: "Booking Details",
          items: [
            { label: "Check-in", value: "2025-09-05" },
            { label: "Check-out", value: "2025-09-08" }
          ]
        },
        {
          heading: "Charges",
          items: [
            { label: "Room", value: "$180" },
            { label: "Breakfast", value: "$30" },
            { label: "Tax", value: "$15" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="pb-24">
      {/* Background Header */}
      <div
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${asserts.userBg})`,
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
        <img src={asserts.user1} className="size-44 object-center z-20 object-cover rounded-full border-4 border-white" alt="User" />
        <div className="md:mt-22 mt-1">
          <h2 className="text-2xl font-semibold">Alex</h2>
          <p className="text-lg text-black/70">Germany</p>
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
              <ImageGallery />

              <h3 className="text-2xl font-semibold mt-8 mb-3">Description</h3>
              <DescriptionEditor />

              <h2 className="text-2xl font-medium mt-8 mb-4">Room Options</h2>
              <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-gray-900 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Room Type</th>
                      <th className="px-6 py-4">Base Price</th>
                      <th className="px-6 py-4">Max Guest</th>
                      <th className="px-6 py-4">Bed Options</th>
                      <th className="px-6 py-4">Availability</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="px-6 py-4">{room.type}</td>
                        <td className="px-6 py-4">${room.price.toFixed(2)}</td>
                        <td className="px-6 py-4">{room.maxGuest}</td>
                        <td className="px-6 py-4">{room.bed}</td>
                        <td className="px-6 py-4">
                          <input type="checkbox" defaultChecked={room.available} />
                        </td>
                        <td className="px-6 py-4 text-green-500 cursor-pointer">Edit</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-medium mt-10 mb-3">Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 mt-3">
                {facilities.map((facility, index) => (
                  <Checkbox
                    key={index}
                    title={facility.title}
                    checked={facility.value}
                    onChange={(checked) => handleFacilityChange(index, checked)}
                  />
                ))}
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
                {['name', 'email', 'password', 'phone'].map((field, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="sm:w-20 font-medium capitalize">{field}</p>
                    <input
                      type={field === 'password' ? 'password' : 'text'}
                      placeholder={field}
                      value={account[field]}
                      onChange={(e) => handleAccountChange(field, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default StaysAdmin;
