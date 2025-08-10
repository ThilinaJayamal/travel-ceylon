// src/pages/Home.jsx
import { asserts } from '../assets/assets';
import VisitCard from '../components/VisitCard';
import TestimonialCard from '../components/TestimonialCard';
import ProvinceCard from '../components/ProvinceCard';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogOut, Hotel, Car, MapPin } from 'lucide-react';
import useAuthStore from '../store/authStore'; // Import the Zustand store

function Home({ setReviewFor, setShowReviewBox }) {
    const navigate = useNavigate();

    // --- Zustand Integration ---
    // Get user state and logout action from the store
    const { user, isAuthenticated, logout } = useAuthStore();

    // Dummy reviews (remains the same)
    const [reviews, setReviews] = useState([]);

    // Fetch dummy reviews (remains the same)
    const fetchAllReviews = () => {
        const dummyReviews = [
            {
                user: { name: "Alice", image: "https://i.pravatar.cc/101" },
                comment: "Amazing service and beautiful places!",
                rating: 5
            },
            {
                user: { name: "Bob", image: "https://i.pravatar.cc/102" },
                comment: "Great booking experience. Highly recommend.",
                rating: 4
            },
            {
                user: { name: "Charlie", image: "https://i.pravatar.cc/103" },
                comment: "Taxi service was excellent!",
                rating: 5
            }
        ];
        setReviews(dummyReviews);
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

    // --- Updated Logout Handler ---
    const handleLogout = async () => {
        try {
            await logout(); // Call the logout action from the store
            // Optional: Add a success toast message here if desired
            // toast.success("You have been logged out.");
             // Navigate to login or home page after logout
            navigate('/login'); // Or navigate('/')
        } catch (err) {
            console.error("Logout error:", err);
            // Optional: Add an error toast message here
            // toast.error("Logout failed. Please try again.");
        }
    };
    // --- End Updated Logout Handler ---

    return (
        <>
            <div className='md:mx-8 mx-4 md:mt-8 mt-4 min-h-screen'>

                {/* Hero Section */}
                <div
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${asserts.heroBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    className="h-[80vh] rounded-4xl overflow-hidden relative md:px-14 px-7 py-12 mt-12 flex flex-col justify-between items-center text-white"
                >

                    <div className="absolute top-6 right-6 z-10 border-2 border-white rounded-full size-10 flex justify-center items-center cursor-pointer bg-white/10 backdrop-blur-md">
                        <span className="text-sm font-semibold text-white">EN</span>
                    </div>

                    <h1 className="md:text-5xl text-3xl font-bold text-center">
                        Travel <span className="text-green-200">Ceylon</span>
                    </h1>

                    <div className="text-center">
                        <span className="font-semibold lg:text-6xl md:text-4xl text-3xl  block">
                            Dream it - Plan it<br />
                            We’ll make it happen
                        </span>
                        <p className="lg:text-2xl md:text-xl text-lg mt-2">
                            Your travel dreams, our responsibility
                        </p>
                    </div>

                    {/** Hero section navigation bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 text-lg mt-6">
                        <div className="flex justify-center gap-6 items-center">
                            <button
                                onClick={() => { navigate("/stays"); scrollTo(0, 0); }}
                                className="cursor-pointer flex gap-2 items-center hover:text-green-300 transition"
                            >
                                <Hotel size={20} /> Stays
                            </button>

                            <button
                                onClick={() => { navigate("/taxi"); scrollTo(0, 0); }}
                                className="cursor-pointer flex gap-2 items-center hover:text-green-300 transition"
                            >
                                <Car size={20} /> Taxi
                            </button>

                            <button // Update this if you have a specific route for guides
                                onClick={() => { /* navigate("/guides"); scrollTo(0, 0); */ }}
                                className="cursor-pointer flex gap-2 items-center hover:text-green-300 transition"
                            >
                                <MapPin size={20} /> Tour Guides
                            </button>
                        </div>

                        {/* --- Updated User Authentication Display --- */}
                        {isAuthenticated && user ? ( // Check both isAuthenticated and user object
                            <div className='flex gap-6 items-center'>
                                {/* Link user image to profile if you have a profile route */}
                                <img
                                    onClick={() => { navigate("/user-profile"); scrollTo(0, 0); }}
                                    src={user?.profilePic}
                                    alt={user.name || "User"}
                                    className='size-10 rounded-full cursor-pointer'
                                />
                                <button
                                    className='flex gap-1 items-center cursor-pointer hover:text-red-600 transition'
                                    onClick={handleLogout} // Use the updated logout handler
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center gap-6 items-center">
                                <Link to={"/login"}>
                                    <button className="cursor-pointer hover:text-green-300 transition">Login</button>
                                </Link>
                                <Link to={"/login"}> {/* Often, Sign Up is on the same page or redirects */}
                                    <button className="py-2 px-4 rounded-md cursor-pointer bg-white text-black hover:bg-green-200 transition">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                        {/* --- End Updated User Authentication Display --- */}
                    </div>
                </div>

                {/* Trip Planning Section (remains largely the same) */}
                <div className='mt-20 grid lg:grid-cols-[2.5fr_2fr] gap-4 grid-cols-1'>
                    <div className='p-4 flex flex-col justify-center items-start'>
                        <h2 className='text-5xl font-semibold uppercase'>Plan your Perfect trip</h2>
                        <p className='text-2xl mt-3 text-black/90'>Search Hotels and Places Hire to our most popular destinations in Sri Lanka.</p>
                        <p className='text-xl mt-6 text-black/70'>
                            Where we make your journeys seamless and exciting! Our platform helps you find the best destinations, book hassle-free trips, and discover must-visit places with ease. Whether you're planning your next adventure or need assistance with vehicle rentals, route navigation, or nearby facilities, we've got you covered.
                        </p>
                        <button
                             onClick={() => { navigate("/explore"); scrollTo(0, 0); }} // Add an explore route if needed
                             className='px-4 py-2.5 bg-green-300 font-semibold rounded-md mt-12 cursor-pointer'
                        >
                            Explore Sri Lanka
                        </button>
                    </div>
                    <div className='flex lg:justify-end justify-center items-center'>
                        <img src={asserts.collage} alt="" className='max-w-full max-h-[600px]' />
                    </div>
                </div>

                {/* Booking Section (remains largely the same) */}
                <div className='mt-20 grid lg:grid-cols-[2.5fr_2fr] gap-4 grid-cols-1 bg-white rounded-4xl overflow-hidden border border-gray-200'>
                    <div className='w-full h-full p-4 text-center flex flex-col gap-12 justify-center items-center'>
                        <div>
                            <h3 className='text-4xl font-semibold'>Get Start Now!</h3>
                            <p className='text-2xl mt-2'>Hurry up make your Booking</p>
                        </div>

                        <div className='flex md:flex-row md:justify-center md:items-center flex-col gap-6'>
                            {asserts.visitCardList.map((item, index) => (
                                <VisitCard key={index} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className='flex lg:justify-end justify-center items-center p-4'>
                        <img src={asserts.travelMan} alt="" className='max-w-full max-h-[400px]' />
                    </div>
                </div>

                {/* Testimonial Section (remains largely the same) */}
                <div className='mt-12'>
                    <div className='p-4 w-full'>
                        <h3 className='text-4xl font-semibold'>What People Say About Us</h3>
                        <p className='text-lg text-black/90 mt-3'>What people say about our facilities and services</p>

                        <div className='flex gap-6 items-center justify-start mt-12 overflow-x-auto scrollbar-hide w-auto pb-8 pr-8'>
                            {reviews.map((item, index) => (
                                <TestimonialCard
                                    key={index}
                                    user={item.user.name}
                                    country={"England"}
                                    text={item.comment}
                                    rating={item.rating}
                                    img={item.user.image}
                                    star={asserts.star}
                                />
                            ))}
                        </div>

                        <div className='flex justify-end items-center'>
                            <button
                                onClick={() => setShowReviewBox(true)}
                                className='px-4 py-2 rounded-md border-2 border-green-300 cursor-pointer'>
                                Add Review
                            </button>
                        </div>
                    </div>
                </div>

                {/* Registration & Instructions (remains largely the same) */}
                <div className='mt-12 bg-green-300 rounded-4xl border border-gray-200 px-4 pt-8 pb-4'>
                    <div className='grid lg:grid-cols-[1fr_1.5fr] grid-cols-1 gap-4'>
                        <div className='flex lg:justify-end justify-center order-2 lg:order-1'>
                            <img src={asserts.womenWithHand} alt="" className='max-h-[300px] w-auto' />
                        </div>
                        <div className='order-1 lg:order-2 flex justify-center items-center'>
                            <span className='md:text-4xl text-2xl font-medium text-center max-w-[600px] md:leading-12 leading-8 lg:mt-0 mt-12'>
                                "Why wait? If you own a hotel, rent vehicles, or offer tour guide, list with us today!"
                            </span>
                        </div>
                    </div>

                    <div className='bg-white p-4 rounded-4xl'>
                        <div className='grid md:grid-cols-7 grid-cols-2 gap-4 my-6 px-4'>
                            <div className='flex items-center justify-center flex-col text-base text-center'>
                                <img src={asserts.r1} alt="" className='size-10' />
                                <p>Register now in travelCeylon</p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img src={asserts.r5} alt="" className='size-14' />
                            </div>
                            <div className='flex items-center justify-center flex-col text-base text-center'>
                                <img src={asserts.r2} alt="" className='size-10' />
                                <p>List out your properties</p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img src={asserts.r5} alt="" className='size-14' />
                            </div>
                            <div className='flex items-center justify-center flex-col text-base text-center'>
                                <img src={asserts.r3} alt="" className='size-10' />
                                <p>Join with 10000+ tourists</p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img src={asserts.r5} alt="" className='size-14' />
                            </div>
                            <div className='flex items-center justify-center flex-col text-base text-center'>
                                <img src={asserts.r4} alt="" className='size-10' />
                                <p>get your dollar income</p>
                            </div>
                        </div>

                        <div className='mt-8'>
                            {/* Link the Register button to the login/signup page or a dedicated provider registration page */}
                            <button
                                onClick={() => { navigate('/login'); /* or '/provider-register' */ scrollTo(0,0); }}
                                className='px-4 py-2 bg-green-600 rounded-full w-full text-xl font-medium cursor-pointer text-white'
                            >
                                Register Now! It is Free
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locations (remains the same) */}
            <div style={{ backgroundImage: `url(${asserts.Bt_bg})` }} className='md:px-14 px-7 py-14 pb-28 mt-12'>
                <h2 className='text-4xl font-semibold text-white'>We Cover all</h2>
                <p className='text-xl mt-2 text-white'>We cover all the Provinces in Sri Lanka</p>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-12">
                    {asserts.provinces.map((item, index) => (
                        <ProvinceCard
                            key={index}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
