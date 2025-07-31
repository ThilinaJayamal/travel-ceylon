import React, { useEffect, useState } from 'react';
import { asserts } from '../assets/assets';
import TaxiSearch from '../components/TaxiSearch';
import {
    Car,
    ShieldCheck,
    CalendarClock,
    CreditCard,
    Accessibility
} from 'lucide-react';
import { useReviewStore } from '../store/review-store';
import TestimonialCard from '../components/TestimonialCard';
import { useAppStore } from '../store/app-store';

const features = [
    {
        icon: Car,
        title: 'Vehicle Choice',
        description: '5 types of vehicles',
    },
    {
        icon: ShieldCheck,
        title: 'Safety & Support',
        description: 'Verified drivers with ratings',
    },
    {
        icon: CalendarClock,
        title: 'Easy Booking',
        description: '24/7 availability',
    },
    {
        icon: CreditCard,
        title: 'Flexible Payment',
        description: 'Cash/Card/Digital wallets',
    },
    {
        icon: Accessibility,
        title: 'Special Needs',
        description: 'Child seats available',
    },
];

export const vehicles = [
    {
        id: 1,
        name: "Bikes",
        price: 3.00,
        image: "",
        description: "Max 2 persons",
        features: ["3-seater", "Fuel efficient", "Easy parking"]
    },
    {
        id: 2,
        name: "TukTuks",
        price: 4.00,
        image: "",
        description: "Max 3 persons",
        features: ["5-seater", "AC", "Automatic"]
    },
    {
        id: 3,
        name: "Cars",
        image: "",
        description: "Max 4 persons",
        price: 5.00
    },
    {
        id: 4,
        name: "Vans",
        price: 7.00,
        image: "",
        description: "Max 4-6 persons",


    }
    // Add other vehicles...
];


const Taxi = () => {
    const setReviewBelongsTo = useAppStore((state) => state.setReviewBelongsTo);
    const toggleReviewOpen = useAppStore((state) => state.toggleReviewOpen);

    const [reviews, setReviews] = useState([]);

    const fetchAllReviews = async () => {
        try {
            const data = await getPlatformReviews();
            console.log(data)
            setReviews(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchAllReviews();
    }, [fetchAllReviews])

    const getPlatformReviews = useReviewStore((state) => state.getPlatformReviews);
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-screen w-full">
                <div
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url(${asserts.taxiBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    className="h-[80vh] w-full relative md:px-14 px-7 py-12 text-white flex items-center"
                >
                    <div className="text-white space-y-4">
                        <h1 className="text-5xl font-bold leading-tight">
                            Plan your ride,<br />
                            we’ll take you<br />
                            there!
                        </h1>
                        <p className="text-xl text-gray-100">Special offers to suit your plan.</p>
                    </div>
                </div>

                {/* TaxiSearch Below Hero */}
                <div className="relative -mt-24 z-10 xl:mx-12 mx-4">
                    <TaxiSearch />
                </div>
            </section>

            <div className='xl:mx-12 mx-4 bg-green-200 mb-16 rounded-xl p-8 mt-36'>
                <h2 className='text-4xl mb-4 font-semibold'>Drive your own</h2>
                <p className='text-lg'>
                    Explore Sri Lanka on your terms! Whether you're a local resident or an international visitor with a valid driver's license, rent the perfect vehicle for your journey.
                    Choose from our range of trusted options—zippy tuktuks for city adventures,
                    comfortable cars for long drives, spacious vans for group trips, or reliable
                    buses for family outings. All rentals include insurance and 24/7 roadside
                    assistance, so you can hit the road with confidence.
                </p>

                <div className="w-full flex justify-center mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            asserts.taxiTypeCard.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-52 h-72 bg-cover bg-center rounded-lg shadow-md flex flex-col justify-end p-4 text-white"
                                    style={{ backgroundImage: `url(${item.img})` }}
                                >
                                    <div className="flex gap-2 items-center justify-between">
                                        <p className="text-base">
                                            {item.name} starting from
                                        </p>
                                        <p className="font-bold text-xl">{item.start}</p>
                                    </div>
                                    <button className='bg-green-200 rounded-full text-black text-lg px-2 py-1 mt-2 hover:bg-green-300 cursor-pointer'>Book Now</button>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

            <div className='xl:mx-12 mx-4 mb-16 rounded-xl p-8 mt-12'>
                <h2 className='text-4xl font-semibold mb-4'>What we offer</h2>
                <p className='text-lg'>Enjoy seamless travel across Sri Lanka with our safe, reliable rides. Choose from tuktuks, cars, or vans—all with verified drivers, transparent pricing, and 24/7 support. Book instantly and pay your way!</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 mt-6 w-fit mx-auto">
                    {features.map(({ icon: Icon, title, description }, index) => (
                        <div key={index}
                            className='size-54 bg-green-200 rounded-xl flex flex-col justify-center gap-1 items-center p-2'>
                            <Icon className='size-12' />
                            <h3 className='text-xl font-semibold'>{title}</h3>
                            <p>{description}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className='xl:mx-12 mx-4 mb-16 p-8 mt-12 grid lg:grid-cols-[2.5fr_2fr] gap-4 grid-cols-1 bg-white rounded-4xl'>
                <div className='p-4 flex flex-col justify-start items-start'>
                    <h2 className='text-5xl font-semibold'>Where Every Journey Feels Like First Class</h2>
                    <p className='text-xl mt-4 text-black/90'>At travelCeylon, we connect you to Sri Lanka’s most reliable rides—from buzzing tuktuks in Colombo to luxury SUVs for scenic hill country routes. Every driver is verified and every fare is transparent, so you can explore with confidence.</p>
                    <p className='text-xl mt-6 text-black/70'>
                        Tuktuks for quick hops . AC cars for long trips . Family-sized vans
                        Instant bookings . 24/7 availability . Flight tracking for airport pickups
                        Upfront fares . No surge pricing . Multiple payment options
                        GPS-tracked rides . Verified drivers . Emergency support
                    </p>

                </div>
                <div className='flex lg:justify-end justify-center items-center'>
                    <img src={asserts.taxiBanner} alt="" className='max-w-full max-h-[600px]' />
                </div>
            </div>

            <div className='flex gap-6 items-center justify-start mt-12 overflow-x-auto scrollbar-hide w-auto ml-12 pb-12 pr-8'>
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

            <div className='flex justify-end items-center xl:mx-12 mx-4'>
                <button onClick={() => {
                    toggleReviewOpen();
                    setReviewBelongsTo('platform')

                }}
                    className='px-4 py-2 rounded-md border-2 border-green-300 cursor-pointer'>
                    Add Review
                </button>
            </div>


            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white xl:mx-12 mx-4 mb-16 rounded-xl mt-12 border border-gray-200'>
                <div className='pt-4'>
                    <img src={asserts.taxibtm} className='max-w-full max-h-[400px] lg:rounded-[0px] rounded-b-full mx-auto' alt="" />
                </div>
                <div className='p-8'>
                    <h1 className='text-4xl font-semibold'>Partner with Sri Lanka’s Favorite Ride Platform</h1>
                    <p className='text-lg mt-4'>Are you a taxi, tuktuk, or private vehicle driver? Partner with travelCeylon and connect with thousands of travelers exploring Sri Lanka! From city rides to scenic tours, we match you with riders who value safety, fair pricing, and reliable service.</p>
                    <p className='text-lg font-medium mt-4'>List your property to reach thousands of travelers</p>
                    <button className='mt-6 px-8 py-2 rounded-full bg-green-200 text-lg cursor-pointer hover:bg-green-300'>List your Vehicle</button>
                </div>
            </div>


        </div>
    );
};

export default Taxi;
