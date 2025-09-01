import React from "react";
import { useState, useEffect } from "react";
import { Home, Upload } from "lucide-react";
import { useParams, Link } from "react-router-dom";

import BookingDashboard from "../components/BookingDashboard";

const GuideAdmin = () => {
  const getGuideIdFromUrl = () => {
    const { id } = useParams();
    return id;
  };

  const guideId = getGuideIdFromUrl() || 3;

  const dummyUsers = {
    1: {
      id: "1",
      name: "Saman Kumara",
      location: "Tissamaharama",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      coverImage:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&h=400&fit=crop",
    },
    2: {
      id: "2",
      name: "Priya Fernando",
      location: "Kandy",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b97c?w=150&h=150&fit=crop&crop=face",
      coverImage:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&h=400&fit=crop",
    },
    3: {
      id: "3",
      name: "Ravi Silva",
      location: "Galle",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      coverImage:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=400&fit=crop",
    },
  };

  const handleCoverUpload = () => {
    //    Contains logic to change the existing coverpage in the database
  };

  return (
    <>
      <div className="w-full">
        {/* Cover Photo Section */}
        <div className="relative h-48 sm:h-64 lg:h-80 w-full">
          <img
            src={dummyUsers[guideId].coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>

          {/* Header Navigation */}
          <div className="absolute top-0 right-0 left-0 p-4 sm:p-6">
            <div className="flex items-center justify-end">
              <Link to="/" className="flex items-center text-white">
                <div className="w-6 h-6 fill-current">
                  <svg viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
              </Link>
              <div className="flex items-center space-x-3 text-white mx-6">
                <img
                  src={dummyUsers[guideId].profileImage}
                  alt="Admin"
                  className="w-8 h-8 rounded-full border border-white"
                />
                <span className="text-sm font-medium">taxiAdmin</span>
              </div>
            </div>
          </div>

          {/* Upload button */}
          <button
            onClick={handleCoverUpload}
            className="absolute bottom-5 right-5 bg-green-300 hover:bg-green-700 hover:text-white text-black px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload new cover</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 mb-4">
          <div className="relative -mt-12 sm:-mt-6 lg:-mt-16 pb-6 px-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={dummyUsers[guideId].profileImage}
                  alt={dummyUsers[guideId].name}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-white"></div>
              </div>

              {/* Profile Info */}
              <div className="pb-2 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  {dummyUsers[guideId].name}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-medium">
                  {dummyUsers[guideId].location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingDashboard />
    </>
  );
};

export default GuideAdmin;
