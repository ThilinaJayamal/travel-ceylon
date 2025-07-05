import React from 'react';
import { asserts } from '../assets/assets';

function Home() {
    return (
        <div className="relative max-h-full md:mx-8 mx-4 md:mt-8 mt-4 rounded-4xl overflow-hidden">
            <img
                src={asserts.heroBg}
                className="w-full h-[80vh] object-cover object-center mix-blend-overlay brightness-60"
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
    );
}

export default Home;
