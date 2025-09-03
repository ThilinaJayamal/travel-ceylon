import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import NavbarBlack from "../components/NavbarBlack";

const Guide = () => {
  const getGuideIdFromUrl = () => {
    const { id } = useParams();
    return id;
  };

  const guideId = getGuideIdFromUrl() || 3;

  const guideData = {
    1: {
      id: "1",
      name: "Priya Nanayakkara",
      location: "Kandy",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      startingPrice: 25,
      bio: "Hello! I'm a passionate cultural guide based in Kandy, with over 5 years of experience showcasing the rich heritage of the hill country. Whether you're interested in ancient temples like the Temple of the Tooth, traditional dance performances, or the lush botanical gardens, I'm here to make your cultural journey unforgettable.",
      description:
        "I'm knowledgeable, patient, and deeply connected to the history and traditions of Kandy. If you're looking for someone to guide you through centuries of Sri Lankan culture with authenticity, respect, and engaging storytelling — I'd be honored to be part of your cultural exploration in Sri Lanka.",
      images: [
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1580130379624-3a069adbffc5?w=1000&h=400&fit=crop",
      ],
    },
    2: {
      id: "2",
      name: "Dilshan Fernando",
      location: "Ella",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      startingPrice: 30,
      bio: "Hello! I'm an adventure guide based in Ella, with over 8 years of experience helping travelers discover the breathtaking landscapes of Sri Lanka's hill country. Whether you're interested in hiking to Little Adam's Peak, exploring the famous Nine Arch Bridge, or chasing waterfalls in the misty mountains, I'm here to make your adventure safe and memorable.",
      description:
        "I'm energetic, safety-focused, and fully committed to showing you the natural wonders that make Ella special. If you're looking for someone to guide you through thrilling hikes with stunning views, local insights, and unforgettable experiences — I'd be honored to be part of your mountain adventure in Sri Lanka.",
      images: [
        "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1000&h=400&fit=crop",
      ],
    },
    3: {
      id: "3", 
      name: "Saman Kumara",
      location: "Tissamaharama",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      startingPrice: 20,
      bio: "Hello! I'm a licensed tour guide based in Sri Lanka, with over 7 years of experience helping travelers explore the beauty, culture, and history of this incredible island. Whether you're interested in ancient cities like Anuradhapura and Sigiriya, the misty mountains of Ella, or the golden beaches of the south coast, I'm here to make your trip unforgettable.",
      description:
        "I'm friendly, reliable, and fully committed to making sure you feel safe, informed, and inspired throughout your journey. If you're looking for someone to guide you with passion, knowledge, and a personal touch — I'd be honored to be part of your adventure in Sri Lanka.",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1000&h=400&fit=crop",
      ],
    },
    4: {
      id: "4", 
      name: "Nimal Perera",
      location: "Galle",
      profileImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      startingPrice: 35,
      bio: "Hello! I'm a heritage guide specializing in the southern coast of Sri Lanka, with over 6 years of experience bringing the colonial history and coastal culture to life. Whether you're exploring the historic Galle Fort, whale watching in Mirissa, or discovering hidden gem beaches along the coast, I'm here to make your coastal journey extraordinary.",
      description:
        "I'm detail-oriented, historically knowledgeable, and passionate about sharing the stories that shaped this beautiful coastline. If you're looking for someone to guide you through maritime history, local traditions, and stunning ocean vistas — I'd be honored to be part of your coastal discovery in Sri Lanka.",
      images: [
        "https://images.unsplash.com/photo-1552055632-2c4ac47b5e37?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&h=400&fit=crop",
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1000&h=400&fit=crop",
      ],
    },
  };

  const currentGuide = guideData[guideId] || guideData["3"]; // Default to guide 3

  // Gallery state and functions
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < currentGuide.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Booking form
  const [formData, setFormData] = useState({
    message: "",
    date: "04 Feb 2025",
    time: "10:00 am",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const bookingSectionRef = useRef(null);

  const handleScroll = () => {
    bookingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  // Fixed: Create a proper event handler function
  const handleBookNow = () => {
    const guideIdForBooking = currentGuide.id;
    const bookingDate = formData.date;
    const bookingTime = formData.time;
    const description = formData.message;

    navigate(
      `/guide/${guideIdForBooking}/payment?date=${encodeURIComponent(
        bookingDate
      )}&time=${encodeURIComponent(
        bookingTime
      )}&description=${encodeURIComponent(description)}`
    );
  };

  return (
    <>
      <NavbarBlack />
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-16 mb-8 max-w-[80%] mx-auto mt-10">
        {/* Profile Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={currentGuide.profileImage}
                alt={currentGuide.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
              />
            </div>

            {/* Name and Location */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                {currentGuide.name}
              </h1>
              <p className="text-gray-600 text-lg">{currentGuide.location}</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">starting from</p>
            <p className="text-2xl font-semibold text-emerald-500">
              ${currentGuide.startingPrice}
              <span className="text-sm font-normal text-gray-400">
                /per day
              </span>
            </p>
          </div>
        </div>

        {/* Bio and Description */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-700 leading-relaxed">{currentGuide.bio}</p>
          <p className="text-gray-700 leading-relaxed">
            {currentGuide.description}
          </p>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-end">
          <button
            onClick={handleScroll}
            className="bg-green-300 hover:bg-green-700 hover:text-white text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-10 max-w-[80%] mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gallery</h2>

        {/* Main Image Display */}
        <div className="relative">
          <div className="relative w-full h-96 bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={currentGuide.images[currentImageIndex]}
              alt={`${currentGuide.name} tour - Photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {currentImageIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
            )}

            {currentImageIndex < currentGuide.images.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            )}

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {currentGuide.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div
        ref={bookingSectionRef}
        className="flex items-center justify-center bg-gray-50 p-4 mb-16"
      >
        {/* Booking Form Container - 80% width, centered */}
        <div className="w-[80%] bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          {/* Form Heading */}
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8 p-4">
            Start the Journey
          </h1>

          <div className="space-y-6">
            {/* Message Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Additional Request
              </label>
              <textarea
                placeholder="Put your message here"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Date and Time Input Section with Submit Button */}
            <div className="flex gap-6 items-end flex-wrap sm:flex-nowrap">
              {/* Date Input */}
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select a date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {/* Calendar Icon */}
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Time Input */}
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select a time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {/* Clock Icon */}
                  <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Submit Button - Fixed: Now properly calls handleBookNow on click */}
              <button
                onClick={handleBookNow}
                className="bg-green-300 hover:bg-green-700 hover:text-white text-black font-medium px-8 py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
