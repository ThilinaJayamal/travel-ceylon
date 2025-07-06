import React from 'react';

const TestimonialCard = ({ user, country, text, rating, img, star }) => {
  return (
    <div className='min-w-[18rem] max-w-72 bg-white rounded-md p-4 overflow-hidden
     border border-gray-200 flex-shrink-0 shadow-[8px_8px_0px_0px_rgba(34,_197,_94,_0.5)]'>
      <div className='flex justify-start items-center mt-4 gap-4'>
        <img
          src={img}
          className='size-16 object-center object-cover rounded-full border border-gray-200'
          alt={user}
        />
        <div>
          <h6 className='text-lg'>{user}</h6>
          <p className='text-sm text-black/70'>{country}</p>
        </div>
      </div>

      <p className='text-base text-black/70 mt-6'>{text}</p>

      <div className='flex gap-1 mt-3'>
        {[...Array(rating)].map((_, i) => (
          <img key={i} src={star} alt="star" className='size-6' />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
