import React, { useState } from 'react'
import { asserts } from '../assets/assets'
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

            <div className='z-20 md:ml-8 -mt-22 flex md:flex-row flex-col gap-1 md:items-center w-fit mx-auto'>
                <img src={asserts.user1} className='size-44 object-center z-20 object-cover rounded-full border-4 border-white' alt="" />
                <div className='md:mt-22 md:text-left mt-1 text-center'>
                    <h2 className='text-2xl font-semibold'>Alex</h2>
                    <p className='text-lg text-black/70'>Germany</p>
                </div>
            </div>

            <div className='md:mx-8 mx-4 md:mt-8 mt-4'>
                <div className='flex items-center justify-evenly bg-white px-4 py-5 rounded-xl relative border border-gray-200'>
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className='flex flex-col items-center cursor-pointer px-2'
                        >
                            <h3 className={`text-lg font-medium ${activeTab === tab ? 'text-black' : 'text-gray-500'}`}>
                                {tab}
                            </h3>
                            <div
                                className={`h-1 w-full mt-1 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-green-300' : 'bg-transparent'}`}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Animated tab content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'Bookings' ? (
                        <motion.div
                            key="bookings"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className='grid xl:grid-cols-[2fr_3fr] grid-cols-1 gap-4 mt-6'
                        >
                            <div className='flex flex-col gap-4 items-start justify-start'>
                                <BookingCard />
                                <BookingCard />
                            </div>
                            <BillViwer />
                        </motion.div>
                    )
                        :
                        (activeTab === 'Dashboard' ? (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border border-gray-200 mt-6 rounded-md px-4 py-8"
                            >
                                <div>
                                    <ImageGallery />
                                    <DescriptionEditor />


                                    <h2 className="pb-4 text-lg font-medium mt-6">Room Options</h2>
                                    <div className='ml-12 mt-3'>
                                        <div className="w-full">
                                            <div className="flex flex-col items-center w-full overflow-hidden rounded-xl bg-white border border-gray-200">
                                                <table className="table-auto w-full text-sm text-left text-gray-700">
                                                    <thead className="text-gray-900 font-medium border-b-2 border-gray-200">
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
                                                            <tr key={index} className="">
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
                                                                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-300 transition-colors duration-300"></div>
                                                                        <div className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5"></div>
                                                                    </label>
                                                                </td>
                                                                <td className="px-6 py-4 text-blue-600 font-medium cursor-pointer hover:underline">
                                                                    Edit
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="pb-4 text-lg font-medium mt-6">Facilities</h2>

                                    <div className="grid grid-cols-3 gap-y-4 ml-12 mt-3">
                                        {facilities.map((facility, index) => (
                                            <Checkbox
                                                key={index}
                                                title={facility.title}
                                                checked={facility.value}
                                                onChange={(checked) => handleChange(index, checked)}
                                            />
                                        ))}
                                    </div>

                                    <h2 className="pb-4 text-lg font-medium mt-6">Hotel Suroundings</h2>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <h4 className='text-center'>Top attractions</h4>
                                        </div>
                                        <div>
                                            <h4 className='text-center'>Nature</h4>
                                        </div>
                                        <div>
                                            <h4 className='text-center'>Practical Access</h4>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        )
                            :
                            (
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
                                            <p className="sm:w-20 font-medium">Name</p>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                            />
                                            <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                            <p className="sm:w-20 font-medium">Email</p>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                            />
                                            <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                            <p className="sm:w-20 font-medium">Password</p>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                            />
                                            <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                            <p className="sm:w-20 font-medium">Phone</p>
                                            <input
                                                type="tel"
                                                placeholder="Phone"
                                                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                            />
                                            <button className="border border-green-300 px-4 py-1 rounded-md">Change</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default StaysAdmin;
