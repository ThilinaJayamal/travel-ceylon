import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md text-center">
        {/* SVG Illustration */}
        <svg
          className="mx-auto mb-8 w-48 h-48"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M12 21a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>

        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl mb-6">
          Ooops! The page you are looking for doesn’t exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-white text-green-400 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-100 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
