import React, { useState } from 'react'
import { asserts } from '../assets/assets'
import BookingCard from '../components/BookingCard';
import { SquarePen } from 'lucide-react';
import BillViwer from '../components/BillViewer';

function UserProfile() {

    const [activeTab, setActiveTab] = useState('Bookings');

    const tabs = ['Bookings', 'Account'];

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
                <img src={asserts.user1} className='size-44 object-center z-20
            object-cover rounded-full border-4 border-white' alt="" />
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
                            <h3 className={`text-lg font-medium ${activeTab === tab ? 'text-black' : 'text-gray-500'
                                }`}>
                                {tab}
                            </h3>
                            {/* Bottom Indicator Line */}
                            <div
                                className={`h-1 w-full mt-1 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-green-300' : 'bg-transparent'
                                    }`}
                            ></div>
                        </div>
                    ))}
                </div>



                {/** Conditional Tab rendering */}
                {
                    activeTab === tabs[0] ?
                        (
                            <div className='grid xl:grid-cols-[2fr_3fr] grid-cols-1 gap-4 mt-6'>

                                <div className='flex flex-col gap-4 items-start justify-start'>
                                    <BookingCard />
                                    <BookingCard />
                                </div>

                                <BillViwer />
                            </div>
                        )
                        :
                        (
                            <div className="bg-white border border-gray-200 mt-6 rounded-md px-4 py-8">
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
                            </div>

                        )
                }
            </div>

        </div>
    )
}

export default UserProfile