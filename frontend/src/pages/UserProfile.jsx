import React, { useState, useEffect } from 'react';
import { asserts } from '../assets/assets';
import BookingCard from '../components/BookingCard';
import BillViwer from '../components/BillViewer';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { useBookingsStore } from '../store/bookingsStore';

function UserProfile() {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const updateProfile = useAuthStore((state) => state.updateProfile);

    const [activeTab, setActiveTab] = useState('Bookings');
    const tabs = ['Bookings', 'Account'];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(0);

    const fetchBookings = useBookingsStore((state) => state.fetchBookings);
    const billData = useBookingsStore((state) => state.billData);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    // Validation function with toaster
    const validateField = (key, value) => {
        if (key === 'name') {
            if (!value.trim()) {
                toast.error('Name is required');
                return false;
            }
            if (value.trim().length < 2) {
                toast.error('Name must be at least 2 characters');
                return false;
            }
        }

        if (key === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                toast.error('Email is required');
                return false;
            }
            if (!emailRegex.test(value)) {
                toast.error('Invalid email format');
                return false;
            }
        }

        if (key === 'password') {
            if (value) {
                const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
                if (!strongPasswordRegex.test(value)) {
                    toast.error('Password must be at least 6 chars and include uppercase, lowercase, digit, special char');
                    return false;
                }
            }
        }

        if (key === 'phone') {
            const phoneRegex = /^[0-9]{7,15}$/;
            if (value && !phoneRegex.test(value)) {
                toast.error('Phone must be 7-15 digits');
                return false;
            }
        }

        return true;
    };

    const handleChangeField = async (key) => {
        const value = { name, email, password, phone }[key];
        if (!validateField(key, value)) return;

        try {
            await updateProfile({ [key]: value });
            toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully!`);
            if (key === 'password') setPassword('');
        } catch (error) {
            toast.error(`Failed to update ${key}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchBookings();
            } catch (error) {
                console.log(error?.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="pb-24">
            {/* Background header */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${asserts.userBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="relative h-80 z-10"
            ></div>

            {/* Profile Image and Info */}
            <div className="relative z-20 md:ml-8 -mt-20 flex md:flex-row flex-col gap-1 md:items-center w-fit mx-auto">
                <img
                    src={user?.profilePic}
                    className="size-44 object-center object-cover rounded-full border-4 border-white bg-white"
                    alt="User"
                />
                <div className="md:mt-22 md:text-left mt-1 text-center">
                    <h2 className="text-2xl font-semibold">{user?.name}</h2>
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
                            className="grid xl:grid-cols-[2fr_3fr] grid-cols-1 gap-24 mt-6"
                        >
                            <div className="flex flex-col gap-4 items-start justify-start">
                                {billData.map((item, index) => (
                                    <BookingCard
                                        key={index}
                                        image={item.image}
                                        title={item.title}
                                        date={item.date}
                                        location={item.location}
                                        onClick={(e) => {
                                            e?.preventDefault();
                                            setSelectedBooking(index);
                                        }}
                                    />
                                ))}
                            </div>
                            {billData?.length > 0 && (
                                <BillViwer {...billData[selectedBooking]} />
                            )}
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
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mx-auto max-w-xl">
                                {/** Name */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Name</p>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="border border-green-300 px-4 py-1 rounded-md hover:bg-green-100 transition"
                                        onClick={() => handleChangeField('name')}
                                        disabled={loading}
                                    >
                                        Change
                                    </button>
                                </div>

                                {/** Email */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Email</p>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="border border-green-300 px-4 py-1 rounded-md hover:bg-green-100 transition"
                                        onClick={() => handleChangeField('email')}
                                        disabled={loading}
                                    >
                                        Change
                                    </button>
                                </div>

                                {/** Password */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Password</p>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="border border-green-300 px-4 py-1 rounded-md hover:bg-green-100 transition"
                                        onClick={() => handleChangeField('password')}
                                        disabled={loading}
                                    >
                                        Change
                                    </button>
                                </div>

                                {/** Phone */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <p className="sm:w-20 font-medium">Phone</p>
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="border border-green-300 px-4 py-1 rounded-md hover:bg-green-100 transition"
                                        onClick={() => handleChangeField('phone')}
                                        disabled={loading}
                                    >
                                        Change
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default UserProfile;
