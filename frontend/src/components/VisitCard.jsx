import React from 'react'

function VisitCard({ item }) {
    return (
        <div className='bg-green-300 rounded-md p-4 py-6 flex flex-col justify-center items-center max-w-44'>
            <img src={item.icon} alt="" className='size-8' />
            <h4 className='text-xl font-semibold mt-3'>{item.title}</h4>
            <p className='text-base'>
                {item.desc}
            </p>
            <button className='px-4 py-2 cursor-pointer bg-white rounded-md mt-8'>
                Visit Now
            </button>
        </div>
    )
}

export default VisitCard