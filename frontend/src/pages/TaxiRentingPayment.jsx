import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaxiRentingPayment = () => {
  const navigate = useNavigate();

  // Mock renting data
  const rentingData = {
    vehicle: {
      model: "Bajaj Vespa HU-0543",
      owner: "Vehicle Owner",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Vespa_Sprint_Vintage.jpg",
    },
    journey: {
      area: "Tissamaharama",
      pickup: "04 Feb 2025",
      return: "09 Feb 2025",
    },
    payment: {
      advance: 60.0,
      discount: 0,
      taxes: 0,
      serviceFee: 0,
      total: 60.0,
    },
  };

  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
    country: "Sri Lanka",
    saveCard: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePayment = () => {
    setShowPopup(true);

    // Auto redirect after 3 seconds
    setTimeout(() => {
      navigate("/taxi");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-16 relative">
      <div className="max-w-6xl mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left: Renting Summary */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            {/* Vehicle Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-24 h-20 md:w-28 md:h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={rentingData.vehicle.image}
                  alt="Vehicle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  {rentingData.vehicle.model}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {rentingData.vehicle.owner}
                </p>
              </div>
            </div>

            {/* Journey Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-4 text-gray-800">
                Journey Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Area</span>
                  <span className="font-medium text-gray-600">
                    {rentingData.journey.area}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup</span>
                  <span className="font-medium text-gray-600">
                    {rentingData.journey.pickup}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return</span>
                  <span className="font-medium text-gray-600">
                    {rentingData.journey.return}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-sm font-medium mb-4 text-black">
                Payment Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Advance</span>
                  <span>${rentingData.payment.advance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span>{rentingData.payment.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span>{rentingData.payment.taxes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>{rentingData.payment.serviceFee}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-base">
                  <span>Total Amount</span>
                  <span>${rentingData.payment.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-black/60">
              Add a new card
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black/60">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-green-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black/60">
                    Exp. Date
                  </label>
                  <input
                    type="text"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-green-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/60">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-green-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60">
                  Country or Region
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-black/60 focus:ring focus:ring-green-200"
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="saveCard"
                  checked={formData.saveCard}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded"
                />
                <span className="text-sm">Save my card for quick payments</span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-green-300 hover:bg-green-400 text-black py-2 mt-4 rounded-lg font-semibold transition"
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 md:w-96 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-500 text-3xl">✔</span>
              </div>
            </div>
            <h2 className="text-lg font-semibold">Payment Success!</h2>
            <p className="text-2xl font-bold my-2">
              ${rentingData.payment.total.toFixed(2)}
            </p>
            <hr className="my-3" />
            <div className="text-left text-sm space-y-2">
              <p>
                <span className="text-gray-600">Ref number:</span>{" "}
                <span className="font-medium">76893245</span>
              </p>
              <p>
                <span className="text-gray-600">Name:</span>{" "}
                <span className="font-medium">user</span>
              </p>
              <p>
                <span className="text-gray-600">Date:</span>{" "}
                <span className="font-medium">04.04.2025</span>
              </p>
              <p>
                <span className="text-gray-600">Time:</span>{" "}
                <span className="font-medium">11:15am</span>
              </p>
              <p>
                <span className="text-gray-600">Amount:</span>{" "}
                <span className="font-medium">
                  ${rentingData.payment.total.toFixed(2)}
                </span>
              </p>
            </div>
            <p className="mt-4">Thank You!</p>
            <button
              onClick={() => navigate("/taxi")}
              className="w-full bg-green-300 hover:bg-green-400 text-black py-2 mt-4 rounded-lg font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxiRentingPayment;
