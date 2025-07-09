import React from 'react'
import { asserts } from '../assets/assets'

function BookingCard({ title, date, place }) {
    return (
        <div className='w-full bg-white rounded-md flex items-center justify-between gap-4 p-4 border border-gray-200 max-h-fit'>
            <div>
                <img src={asserts.Bt_bg} className='size-28 rounded-md' alt="" />
            </div>
            <div className='w-full'>
                <div className='flex justify-between items-center gap-4'>
                    <h3 className='text-lg font-semibold'>Toyota Vitz CAX-0696</h3>
                    <p className='text-sm'>25 Feb 2025</p>
                </div>
                <p className='text-sm text-black/70'>Tissamaharama</p>

                <button className='cursor-pointer w-full px-4 py-2 rounded-md bg-green-300 mt-6'>
                    View bookings
                </button>
            </div>
        </div>
    )
}

export default BookingCard