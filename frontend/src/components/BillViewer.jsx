import React from 'react'
import { asserts } from '../assets/assets'

function BillViewer() {
    return (
        <div className='max-w-xl p-4 md:p-8 rounded-md bg-white border border-gray-200 max-h-fit'>
            <div className='grid grid-cols-[1fr_2fr] gap-4'>
                <img src={asserts.Bt_bg} className='max-w-full max-h-32 rounded-md' alt="" />
                <div className='flex flex-col items-start justify-end'>
                    <h3 className='text-2xl font-semibold'>Toyota  Vitz  CAX-0696</h3>
                    <p className='text-lg'>sample taxiDriver</p>
                </div>
            </div>
            <hr className='mt-4' />

            <h4 className='mt-4 text-xl font-semibold text-black/70'>Journey Details</h4>

            <div className='ml-8 mt-4'>

                <div className='flex justify-between items-center text-black/70'>
                    <p>Pickup</p>
                    <p>Tissamaharama</p>
                </div>

                <div className='flex justify-between items-center text-black/70'>
                    <p>Pickup</p>
                    <p>Tissamaharama</p>
                </div>

                <div className='flex justify-between items-center text-black/70'>
                    <p>Pickup</p>
                    <p>Tissamaharama</p>
                </div>

            </div>

            <hr className='mt-4' />

            <h4 className='mt-4 text-xl font-semibold text-black/70'>Payment Details</h4>

            <div className='ml-8 mt-4'>

                <div className='flex justify-between items-center text-black/70'>
                    <p>Pickup</p>
                    <p>Tissamaharama</p>
                </div>

                <div className='flex justify-between items-center text-black/70'>
                    <p>Pickup</p>
                    <p>Tissamaharama</p>
                </div>

                <div className='flex justify-between items-center text-black/70'>
                    <p>Pickup</p>
                    <p>Tissamaharama</p>
                </div>

            </div>

            <hr className='mt-4' />

            <div className='ml-8 mt-4'>

                <div className='flex justify-between items-center text-black/70'>
                    <p>Total amount</p>
                    <p>$170.00</p>
                </div>
            </div>
        </div>
    )
}

export default BillViewer