import React, { useState } from 'react';
import { asserts } from '../assets/assets';
import { useAppStore } from '../store/app-store';
import { useReviewStore } from '../store/review-store';
import { Star } from 'lucide-react';

function ReviewBox() {
  const toggleReviewOpen = useAppStore((state) => state.toggleReviewOpen);
  const reviewBelongsTo = useAppStore((state) => state.reviewBelongsTo);
  const createPlatformReview = useReviewStore((state) => state.ccreatePlatformReview);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const addReview = async () => {

    try {
      setLoading(true);
      await createPlatformReview({
        rating,
        comment: review,
      });

      setRating(0);
      setReview('');
      toggleReviewOpen();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50'>
      <div className='sm:w-[400px] w-[80%] bg-white rounded-4xl p-8 border border-gray-200 relative'>

        {/* Tick Icon */}
        <div className='flex justify-center items-center mt-4'>
          <div className='bg-green-200 size-16 flex justify-center items-center rounded-full'>
            <div className='bg-green-300 size-8 flex justify-center items-center rounded-full'>
              <img src={asserts.tick} alt="tick" className='size-6' />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className='text-2xl text-center mt-6'>
          How is Your<br />
          <span className='text-3xl font-semibold text-black/70'>Experience?</span>
        </h2>

        {/* Star Rating */}
        <div className='flex items-center justify-center gap-2 mt-6'>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`size-8 cursor-pointer transition-colors duration-200 ${(hover || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                }`}
            />
          ))}
        </div>

        {/* Review Textarea */}
        <h4 className='mt-6 text-lg'>Write your review</h4>
        <textarea
          placeholder='Type here...'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className='w-full p-4 border border-gray-200 rounded-md mt-2 resize-none'
          rows={6}
        ></textarea>

        {/* Submit Button */}
        <div className='flex justify-center items-center'>
          <button
            className='mt-6 px-12 py-2 bg-green-300 rounded-md hover:bg-green-400 transition-all disabled:opacity-50'
            disabled={loading}
            onClick={addReview}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Close Button */}
        <div
          onClick={toggleReviewOpen}
          className='absolute top-2 right-2 size-8 bg-red-400 rounded-full cursor-pointer flex justify-center items-center hover:bg-red-500 transition-all'
        >
          <img src={asserts.close} alt="close" className='size-4' />
        </div>
      </div>
    </div>
  );
}

export default ReviewBox;
