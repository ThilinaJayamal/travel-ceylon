import React, { useState, useEffect } from 'react';
import { asserts } from '../assets/assets';
import BookingCard from '../components/BookingCard';
import { SquarePen } from 'lucide-react';
import BillViwer from '../components/BillViewer';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '../store/auth-store';
import toast from 'react-hot-toast';
import axios from 'axios';

function UserProfile() {
    const user = useAuthStore((state) => state.user);
    const [activeTab, setActiveTab] = useState('Bookings');
    const tabs = ['Bookings', 'Account'];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    const handleChangeField = async (field, value) => {
        try {
            const response = await axios.put(`/api/user/update`, {
                [field]: value,
            });
            toast.success(`${field} updated successfully`);
        } catch (error) {
            console.error(error);
            toast.error(`Failed to update ${field}`);
        }
    };

    if (!user) return <div className="text-center py-10">Loading user data...</div>;

    return (
        <div className="pb-24">
        
            {/* Background header */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${asserts.userBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="relative h-80 z-10"
            >
                <button className="p-2 rounded-md bg-green-300 absolute bottom-2 right-2 z-20 cursor-pointer">
                    <SquarePen className="size-6" />
                </button>
            </div>

            {/* Profile Image and Info */}
            <div className="relative z-20 md:ml-8 -mt-20 flex md:flex-row flex-col gap-1 md:items-center w-fit mx-auto">
                <img
                    src={user.image}
                    className="size-44 object-center object-cover rounded-full border-4 border-white"
                    alt="User"
                />
                <div className="md:mt-22 md:text-left mt-1 text-center">
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-lg text-black/70">Germany</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="md:mx-8 mx-4 md:mt-8 mt-4">
                <div className="flex items-center justify-evenly bg-white px-4 py-5 rounded-xl border border-gray-200">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="flex flex-col items-center cursor-pointer px-2"
                        >
                            <h3 className={`text-lg font-medium ${activeTab === tab ? 'text-black' : 'text-gray-500'}`}>
                                {tab}
                            </h3>
                            <div
                                className={`h-1 w-full mt-1 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-green-300' : 'bg-transparent'
                                    }`}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'Bookings' ? (
                        <motion.div
                            key="bookings"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid xl:grid-cols-[2fr_3fr] grid-cols-1 gap-4 mt-6"
                        >
                            <div className="flex flex-col gap-4 items-start justify-start">
                                <BookingCard />
                                <BookingCard />
                            </div>
                            <BillViwer />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="account"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-gray-200 mt-6 rounded-md px-4 py-8"
                        >
                            <div className="space-y-4 mx-auto max-w-xl">

                                {/* Name */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Name</p>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <button
                                        className="border border-green-300 px-4 py-1 rounded-md"
                                        onClick={() => handleChangeField('name', name)}
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Email</p>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        className="border border-green-300 px-4 py-1 rounded-md"
                                        onClick={() => handleChangeField('email', email)}
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Password */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Password</p>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="border border-green-300 px-4 py-1 rounded-md"
                                        onClick={() => handleChangeField('password', password)}
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Phone</p>
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <button
                                        className="border border-green-300 px-4 py-1 rounded-md"
                                        onClick={() => handleChangeField('phone', phone)}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default UserProfile;
