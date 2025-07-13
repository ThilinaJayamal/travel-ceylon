import React from 'react'

function ProvinceCard({ item }) {
    return (
        <div className='flex gap-4 items-center justify-start bg-white rounded-md p-4 border border-gray-200'>
            <img src={item.Image} alt="" className='size-24 object-cover object-center rounded-md' />
            
            <div>
                <p className='text-xl font-medium'>{item.title}</p>
                <p className='text-base text-black/70'>{item.description}</p>
            </div>
        </div>
    )
}

export default ProvinceCard