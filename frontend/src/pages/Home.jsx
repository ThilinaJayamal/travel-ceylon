import React from 'react';
import { asserts } from '../assets/assets';
import VisitCard from '../components/VisitCard';
import TestimonialCard from '../components/TestimonialCard';

function Home() {

    return (
        <div className='md:mx-8 mx-4 md:mt-8 mt-4 min-h-screen'>
            {/* Hero Section */}
            <div className="relative h-[80vh] rounded-4xl overflow-hidden">
                <img
                    src={asserts.heroBg}
                    className="w-full h-full object-cover object-center mix-blend-multiply brightness-60"
                    alt=""
                />
                <div className='absolute inset-0 w-full flex flex-col justify-between items-center px-4 py-8'>
                    <h1 className='md:text-4xl text-2xl text-white font-bold'>Travel <span className='text-green-200'>Ceylon</span></h1>
                    <div className='text-white text-center'>
                        <span className='font-semibold lg:text-6xl md:text-4xl text-3xl'>
                            Dream it - Plan it<br />
                            We’ll make it happen
                        </span>
                        <p className='lg:text-2xl md:text-xl text-lg mt-2'>Your travel dreams, our responsibility</p>
                    </div>

                    <div className='flex flex-col md:flex-row justify-between items-center w-full text-white gap-4 text-lg'>
                        <div className='flex justify-center gap-6 items-center'>
                            <button className='cursor-pointer flex gap-2 items-center'>
                                <img src={asserts.stays} alt="" />
                                Stays
                            </button>
                            <button className='cursor-pointer flex gap-2 items-center'>
                                <img src={asserts.taxiAlert} alt="" />
                                Taxi
                            </button>
                            <button className='cursor-pointer flex gap-2 items-center'>
                                <img src={asserts.shareLocation} alt="" />
                                Tour Guides
                            </button>
                        </div>

                        <div className='flex justify-center gap-6 items-center'>
                            <button className='cursor-pointer'>Login</button>
                            <button className='py-2 px-4 rounded-md cursor-pointer bg-white text-black'>Sign Up</button>
                        </div>
                    </div>
                </div>

                <div className='absolute top-8 right-8 border-2 border-white rounded-full size-8 flex justify-center items-center cursor-pointer'>
                    <span className='text-sm font-semibold text-white'>EN</span>
                </div>
            </div>

            {/* Trip Planning Section */}
            <div className='mt-20 grid lg:grid-cols-[2.5fr_2fr] gap-4 grid-cols-1'>
                <div className='p-4 flex flex-col justify-center items-start'>
                    <h2 className='text-5xl font-semibold uppercase'>Plan your Perfect trip</h2>
                    <p className='text-2xl mt-3 text-black/90'>Search Hotels and Places Hire to our most popular destinations in Sri Lanka.</p>
                    <p className='text-xl mt-6 text-black/70'>
                        Where we make your journeys seamless and exciting! Our platform helps you find the best destinations, book hassle-free trips, and discover must-visit places with ease. Whether you're planning your next adventure or need assistance with vehicle rentals, route navigation, or nearby facilities, we've got you covered.
                    </p>
                    <button className='px-4 py-2.5 bg-green-300 font-semibold rounded-md mt-12 cursor-pointer'>
                        Explore Sri Lanka
                    </button>
                </div>
                <div className='flex lg:justify-end justify-center items-center'>
                    <img src={asserts.collage} alt="" className='max-w-full max-h-[600px]' />
                </div>
            </div>

            {/* Booking Section */}
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
                    <img src={asserts.travelMan} alt="" className='max-w-full max-h-[600px]' />
                </div>
            </div>

            {/* Testimonial Section */}
            <div className='mt-12'>
                <div className='p-4 w-full'>
                    <h3 className='text-4xl font-semibold'>What People Say About Us</h3>
                    <p className='text-lg text-black/90 mt-3'>What people say about our facilities and services</p>

                    <div className='flex gap-6 items-center justify-start mt-12 overflow-x-auto scrollbar-hide w-auto pb-8 pr-8'>
                        {asserts.testimonials.map((item, index) => (
                            <TestimonialCard
                                key={index}
                                user={item.user}
                                country={item.country}
                                text={item.text}
                                rating={item.rating}
                                img={item.img}
                                star={asserts.star}
                            />
                        ))}
                    </div>

                    <div className='flex justify-end items-center'>
                        <button className='px-4 py-2 rounded-md border-2 border-green-300 cursor-pointer'>Add Review</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;
