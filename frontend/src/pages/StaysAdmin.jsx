import React, { useState } from 'react';
import { asserts } from '../assets/assets';
import BookingCard from '../components/BookingCard';
import { SquarePen } from 'lucide-react';
import BillViwer from '../components/BillViewer';
import { AnimatePresence, motion } from 'framer-motion';
import ImageGallery from '../components/ImageGallery';
import DescriptionEditor from '../components/DescriptionEditor';
import Checkbox from '../components/Checkbox';

const rooms = [
    { type: "Double", price: 25.0, maxGuest: 2, bed: "1 King Bed", available: true },
    { type: "Twin", price: 30.0, maxGuest: 4, bed: "2 Twin Bed", available: true },
];

function StaysAdmin() {
    const [activeTab, setActiveTab] = useState('Bookings');
    const tabs = ['Bookings', 'Dashboard', 'Account'];

    const [facilities, setFacilities] = useState([
        { title: "Breakfast", value: false },
        { title: "Fitness Center", value: false },
        { title: "Room Service", value: false },
        { title: "Grden", value: false },
        { title: "24 hour front desk", value: false },
        { title: "Family Rooms", value: false },
        { title: "Bar", value: false },
        { title: "Parking", value: false },
        { title: "Airport shuttle", value: false },
        { title: "Beach", value: false },
        { title: "Free Wifi", value: false },
        { title: "A/C Rooms", value: false },
        { title: "Parking", value: false },
        { title: "Swing pool", value: false },
        { title: "Water Park", value: false }
    ]);

    const handleChange = (index, checked) => {
        const updated = [...facilities];
        updated[index].value = checked;
        setFacilities(updated);
    };

    return (
        <div className='pb-24'>

            {/* Hero section with background */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${asserts.userBg})`,
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

            {/* User info */}
            <div className='z-20 md:ml-8 -mt-22 flex md:flex-row flex-col gap-1 md:items-center w-fit mx-auto text-center md:text-left'>
                <img src={asserts.user1} className='size-44 object-center z-20 object-cover rounded-full border-4 border-white' alt="" />
                <div className='md:mt-22 mt-1'>
                    <h2 className='text-2xl font-semibold'>Alex</h2>
                    <p className='text-lg text-black/70'>Germany</p>
                </div>
            </div>

            {/* Tabs */}
            <div className='md:mx-8 mx-4 md:mt-8 mt-4'>
                <div className='flex items-center justify-evenly bg-white px-4 py-5 rounded-xl relative border border-gray-200'>
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className='flex flex-col items-center cursor-pointer px-2'
                        >
                            <h3 className={`text-lg font-medium ${activeTab === tab ? 'text-black' : 'text-gray-500'}`}>{tab}</h3>
                            <div className={`h-1 w-full mt-1 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-green-300' : 'bg-transparent'}`} />
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">

                    {/* Bookings */}
                    {activeTab === 'Bookings' && (
                        <motion.div
                            key="bookings"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className='grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-4 mt-6'
                        >
                            <div className='flex flex-col gap-4'>
                                <BookingCard />
                                <BookingCard />
                            </div>
                            <BillViwer />
                        </motion.div>
                    )}

                    {/* Dashboard */}
                    {activeTab === 'Dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-gray-200 mt-6 rounded-md p-4 md:p-8"
                        >
                            {/* Image Gallery */}
                            <div className='mt-6'>
                                <h3 className="text-2xl font-semibold">Images</h3>
                                <ImageGallery />
                            </div>

                            {/* Description */}
                            <div className='mt-6'>
                                <h3 className="text-2xl font-semibold">Description</h3>
                                <div className='ml-0 md:ml-24 mt-3'>
                                    <DescriptionEditor />
                                </div>
                            </div>

                            {/* Room Options */}
                            <div className='mt-6'>
                                <h2 className="pb-4 text-2xl font-medium">Room Options</h2>

                                {/* Mobile Card Layout */}
                                <div className="md:hidden grid grid-cols-1 gap-4 ml-0 md:ml-24">
                                    {rooms.map((room, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-white">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold">{room.type}</span>
                                                <span className="font-medium">${room.price.toFixed(2)}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">Max Guest: {room.maxGuest}</p>
                                            <p className="text-sm text-gray-600 mb-3">Bed: {room.bed}</p>
                                            <div className="flex items-center justify-between">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked={room.available} />
                                                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-300 transition-colors" />
                                                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                                                </label>
                                                <button className="text-green-500 font-medium">Edit</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop Table Layout */}
                                <div className="hidden md:block ml-0 md:ml-24">
                                    <div className="overflow-x-auto border border-gray-200 px-4 rounded-xl bg-white">
                                        <table className="w-full table-auto text-base text-left text-gray-700">
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
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    className="sr-only peer"
                                                                    defaultChecked={room.available}
                                                                />
                                                                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-300 transition-colors duration-300"></div>
                                                                <div className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5"></div>
                                                            </label>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium cursor-pointer">Edit</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Facilities */}
                            <div className='mt-6'>
                                <h2 className="pb-4 text-2xl font-medium">Facilities</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 ml-0 md:ml-24 mt-3">
                                    {facilities.map((facility, index) => (
                                        <Checkbox
                                            key={index}
                                            title={facility.title}
                                            checked={facility.value}
                                            onChange={(checked) => handleChange(index, checked)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Surroundings */}
                            <div className='mt-12'>
                                <h2 className="pb-4 text-2xl font-medium mt-6">Hotel Surroundings</h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                                    {asserts.locations.map((location, index) => (
                                        <div key={index} className='flex flex-col items-stretch justify-start gap-6'>
                                            <h3 className='text-lg font-semibold text-center'>{location.title}</h3>
                                            <div className='flex flex-col gap-2 items-start justify-start'>
                                                {location.items.map((item, i) => (
                                                    <div key={i} className='flex justify-between gap-4 w-full'>
                                                        <p>{item.name}</p>
                                                        <p>{item.distance}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Account Tab */}
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
                                {['Name', 'Email', 'Password', 'Phone'].map((field, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                        <p className="sm:w-20 font-medium">{field}</p>
                                        <input
                                            type={field.toLowerCase() === 'password' ? 'password' : field.toLowerCase()}
                                            placeholder={field}
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
