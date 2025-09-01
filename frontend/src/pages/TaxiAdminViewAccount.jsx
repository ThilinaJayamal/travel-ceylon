import React, { useState } from "react";
import sarah from "../assets/Taxi/sarah.png";
import adminBG from "../assets/Taxi/adminBG.webp";
import { useNavigate } from "react-router-dom";

const TaxiAdminViewAccount = () => {
  const navigate = useNavigate();

  const vehicleData = {
    numberPlate: "CAX-0696",
    model: "Toyota Vitz",
    driverImage: sarah,
    location: "Tissamaharama",
  };

  // Mock account data
  const [accountData, setAccountData] = useState({
    name: "Sample User",
    email: "sampleuser@gmail.com",
    password: "************",
    phone: "0774342348",
  });

  // Change handler (for demo purpose just logs)
  const handleChange = (field) => {
    alert(`Change ${field} clicked!`);
    // You can later integrate a modal/input to update account data
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-30">
      {/* Header Section */}
      <section className="relative h-40 md:h-48 lg:h-56">
        <img
          src={adminBG}
          className="h-full w-full object-cover"
          alt="admin-bg"
        />

        {/* Profile */}
        <div className="absolute -bottom-12 md:-bottom-20 left-4 md:left-8 lg:left-15">
          <div className="flex items-end gap-3 md:gap-4">
            <div>
              <img
                src={vehicleData.driverImage}
                alt="driver"
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div className="mb-1 md:mb-2">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black">
                {vehicleData.model} {vehicleData.numberPlate}
              </h1>
              <h2 className="text-black/60 text-xs md:text-sm lg:text-base font-medium">
                {vehicleData.location}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="px-4 md:px-8 lg:px-15 py-16 md:py-20 mt-6 md:mt-10">
        <div className="flex space-x-8 md:space-x-20 lg:space-x-60 justify-center overflow-x-auto">
          <button
            onClick={() => navigate("/taxi-admin-bookings")}
            className="text-gray-500 font-medium hover:text-gray-900 transition-colors pb-2 whitespace-nowrap"
          >
            Bookings
          </button>
          <button
            onClick={() => navigate("/taxi-admin-dashboard")}
            className="text-gray-500 font-medium hover:text-gray-900 transition-colors pb-2 whitespace-nowrap"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/taxi-admin-account")}
            className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-2 whitespace-nowrap"
          >
            Account
          </button>
        </div>
      </div>

      {/* Account Details */}
      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-lg shadow-md p-6 md:p-10 space-y-6">
        {/* Name */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="text-gray-700 font-medium">Name</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-gray-900">{accountData.name}</p>
            <button
              onClick={() => handleChange("Name")}
              className="border px-4 py-1 rounded-md text-sm font-medium text-green-700 border-green-600 hover:bg-green-50"
            >
              Change
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="text-gray-700 font-medium">Email</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-gray-900 break-all">{accountData.email}</p>
            <button
              onClick={() => handleChange("Email")}
              className="border px-4 py-1 rounded-md text-sm font-medium text-green-700 border-green-600 hover:bg-green-50"
            >
              Change
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="text-gray-700 font-medium">Password</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-gray-900">{accountData.password}</p>
            <button
              onClick={() => handleChange("Password")}
              className="border px-4 py-1 rounded-md text-sm font-medium text-green-700 border-green-600 hover:bg-green-50"
            >
              Change
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="text-gray-700 font-medium">Phone number</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-gray-900">{accountData.phone}</p>
            <button
              onClick={() => handleChange("Phone Number")}
              className="border px-4 py-1 rounded-md text-sm font-medium text-green-700 border-green-600 hover:bg-green-50"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxiAdminViewAccount;
