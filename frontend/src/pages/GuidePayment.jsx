import React, { useState, useEffect } from "react";
import { CreditCard, Check, Loader2 } from "lucide-react";

  const dummyUsers = {
    1: {
      id: "1",
      name: "Priya Nanayakkara",
      location: "Kandy",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    },

    2: {
      id: "2",
      name: "Dilshan Fernando",
      location: "Ella",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    3: {
      id: "3",
      name: "Saman Kumara",
      location: "Tissamaharama",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    },
    4: {
      id: "4",
      name: "Nimal Perera",
      location: "Galle",
      profileImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    },
  };

const GuidePayment = () => {
  const [guide, setGuide] = useState(null);
  const [journeyDetails, setJourneyDetails] = useState({
    date: "04 Feb 2025",
    time: "10:00 am",
    description: "",
  });
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, completed
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
    country: "",
    saveCard: false,
  });

  useEffect(() => {
    // Extract guide ID from URL pattern: guide/id/payment
    const path = window.location.pathname;
    const pathParts = path.split("/");
    const guideIndex = pathParts.indexOf("guide");

    if (guideIndex !== -1 && pathParts[guideIndex + 1]) {
      const guideId = pathParts[guideIndex + 1];
      const foundGuide = dummyUsers[guideId];
      setGuide(foundGuide);
    } else {
      // Fallback to guide 1 if no ID found
      setGuide(dummyUsers["1"]);
    }

    // Extract URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get("date");
    const timeParam = urlParams.get("time");
    const descriptionParam = urlParams.get("description");

    // Update journey details if parameters exist
    setJourneyDetails({
      date: dateParam ? decodeURIComponent(dateParam) : "04 Feb 2025",
      time: timeParam ? decodeURIComponent(timeParam) : "10:00 am",
      description: descriptionParam ? decodeURIComponent(descriptionParam) : "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus("processing");

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("completed");
      setTimeout(() => {
        setPaymentStatus("idle");
      }, 3000);
    }, 2000);
  };

  const PaymentNotification = () => {
    if (paymentStatus === "processing") {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600">
              Please wait while we process your payment...
            </p>
          </div>
        </div>
      );
    }

    if (paymentStatus === "completed") {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-green-600">
              Payment Completed!
            </h3>
            <p className="text-gray-600">
              Your payment has been processed successfully.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading guide details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 mt-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Guide Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            {/* Guide Profile */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={guide.profileImage}
                alt={guide.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {guide.name}
                </h1>
                <p className="text-gray-600">{guide.location}</p>
              </div>
            </div>

            {/* Journey Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Journey Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{journeyDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{journeyDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{guide.location}</span>
                </div>
                {journeyDetails.description && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-600">Additional Request</span>
                    <span className="font-medium text-sm bg-gray-50 p-2 rounded">
                      {journeyDetails.description}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Payment Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fee</span>
                  <span className="font-medium">$30.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total amount
                    </span>
                    <span className="font-bold text-lg">$30.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Add a new card
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name on Card */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  required
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Exp Date and CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exp. Date
                  </label>
                  <input
                    type="text"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Country or Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country or Region
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="IN">India</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </div>

              {/* Save Card Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="saveCard"
                  checked={formData.saveCard}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Save my card for quick payments
                </label>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                disabled={paymentStatus === "processing"}
                className="w-full bg-green-300 hover:bg-green-600 disabled:bg-green-400 text-black hover:text-white font-semibold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {paymentStatus === "processing" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Pay now"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Payment Status Notifications */}
      <PaymentNotification />
    </div>
  );
};

export default GuidePayment;
