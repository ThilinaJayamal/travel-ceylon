import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";

import {
  BaggageClaim,
  Snowflake,
  Armchair,
  Luggage,
  Leaf,
  Users,
  Smile,
  Sun,
  Car,
  Bike,
  ThermometerSnowflake,
  Zap,
} from "lucide-react";

const RentedVehicleDetails = () => {
  const location = useLocation();
  const { vehicle } = location.state || {};

  const [pickupDate, setPickupDate] = useState("2025-02-04");
  const [returnDate, setReturnDate] = useState("2025-02-09");
  const [area, setArea] = useState("Tissamaharama");

  const navigate = useNavigate();

  return (
    <>
      <div className="mt-24 mx-auto w-[75%] sm:w-[80%] lg:w-[90.5%]">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 w-full backdrop-blur-md rounded-xl shadow-lg">
          {/* Left part - Driver Image and Name */}
          <div className="flex items-center flex-col sm:flex-row w-full md:w-auto mb-4 md:mb-0">
            <img
              src={vehicle?.driverImage}
              alt="Driver"
              className="w-20 h-20 sm:w-20 sm:h-20 ml-5 sm:ml-0 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xs sm:text-sm md:text-2xl font-bold text-black text-center sm:text-left hidden sm:block">
                {vehicle?.model}
                <span className="ml-3 text-xs sm:text-sm md:text-2xl">
                  {vehicle?.numberPlate}
                </span>
              </h2>
              <h2 className="text-xs sm:text-sm md:text-3xl text-center font-bold text-black sm:text-left sm:hidden block">
                {vehicle?.model}
              </h2>
              <h2 className="ml-3 text-xs font-semibold text-center sm:text-left sm:text-sm md:text-3xl sm:hidden block">
                {vehicle?.numberPlate}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 text-left">
                {vehicle?.driverName}
              </p>
            </div>
          </div>

          {/* Right part - Price and Button */}
          <div className="flex flex-col items-end w-full md:w-auto">
            <div className="text-black font-bold -mt-2 sm:-mt-0 text-lg md:text-2xl mb-2 md:mb-1 sm:text-left md:text-right w-full md:w-auto md:p-3 text-center">
              ${vehicle?.feePerKm}/km
            </div>
            <button className="bg-green-200 text-xs md:text-sm text-black px-4 py-2 w-full md:w-auto rounded-xl font-semibold hover:bg-green-300">
              Rent Now
            </button>
          </div>
        </div>

        <div className="w-full h-52 mt-10 md:h-[400px]">
          <img
            src={vehicle?.image}
            alt="vehicleImage"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="mt-5">
          <h1 className="h-auto text-gray-500 font-medium text-xs md:text-sm text-left">
            {vehicle?.bio}
          </h1>
        </div>

        {/* Facilities/Features Section */}
        <h2 className="text-sm md:text-lg  font-bold mt-5 mb-6 text-center sm:text-left text-gray-500">
          Facilities
        </h2>

        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {vehicle?.features?.map((feature, id) => {
            let IconComponent;
            switch (feature.icon) {
              case "BaggageClaim":
                IconComponent = BaggageClaim;
                break;
              case "Snowflake":
                IconComponent = Snowflake;
                break;
              case "Armchair":
                IconComponent = Armchair;
                break;
              case "Luggage":
                IconComponent = Luggage;
                break;
              case "Leaf":
                IconComponent = Leaf;
                break;
              case "Users":
                IconComponent = Users;
                break;
              case "Smile":
                IconComponent = Smile;
                break;
              case "Sun":
                IconComponent = Sun;
                break;
              case "Car":
                IconComponent = Car;
                break;
              case "Bike":
                IconComponent = Bike;
                break;
              case "ThermometerSnowflake":
                IconComponent = ThermometerSnowflake;
                break;
              case "Zap":
                IconComponent = Zap;
                break;
              default:
                IconComponent = null;
            }

            return (
              <div
                key={id}
                className="bg-green-200 p-4 rounded-2xl shadow-md backdrop-blur-md flex flex-col items-center justify-center text-center sm:w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] h-20  sm:h-44 md:h-48 gap-2 transition-transform hover:scale-105 duration-200"
              >
                {IconComponent && (
                  <IconComponent className="w-8 h-8 text-black" />
                )}
                <h3 className="font-semibold text-sm sm:text-xl">
                  {feature.name}
                </h3>
                <p className="text-xs text-gray-700 px-2 -mt-2">
                  {feature.caption}
                </p>
              </div>
            );
          })}
        </div>

        <div className="">
          <h2 className="text-sm md:text-lg font-bold mt-8 mb-6 text-center sm:text-left text-gray-500">
            Rental Policy
          </h2>
          <p className="text-black font-medium text-xs md:text-base text-left mb-4">
            To book a {vehicle?.vehicleType}, a {vehicle?.advance} payment is
            required at the time of reservation. Before turning the bike, We
            will check the distance traveled using the meter and calculate the
            total rental cost based on the owner's set rate.
          </p>
          <h2 className="text-black font-medium text-xs md:text-base text-left ml-0 sm:ml-5">
            {"\u2022"} If the total cost is less than ${vehicle?.advance}, we
            will refund the difference.
          </h2>
          <h2 className="text-black font-medium text-xs md:text-base text-left sm:ml-5">
            {"\u2022"} If the total cost exceeds ${vehicle?.advance}, you will
            be required to pay the remaining balance.
          </h2>
        </div>

        <div>
          <h2 className="text-sm md:text-lg font-bold mt-8 mb-6 text-center sm:text-left text-gray-500">
            Start the Journey
          </h2>
        </div>

        <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden mb-20 sm:mb-24 p-5 px-1">
          <div className="flex flex-col sm:flex-row">
            {/* Vehicle Image */}
            <div className="w-full p-3 md:w-1/4 md:p-4">
              <img
                src={vehicle?.image}
                alt="Vehicle"
                className="w-full h-full md:mt-4 md:p-4 sm:object-cover rounded-xl md:rounded-3xl"
              />
            </div>

            {/* Form Section */}
            <div className="w-full md:w-3/4 flex justify-end flex-col p-4 md:p-6">
              <div className="flex justify-end mb-4 md:mb-6 -mt-4">
                <div className="text-lg md:text-2xl font-bold text-green-600">
                  ${vehicle?.feePerKm || "1.3"}/km
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Pickup Date Field */}
                <div className="relative">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full p-3 pt-6 pb-3 border text-gray-600 border-gray-300 rounded-lg px-2 focus:outline-none focus:ring-2  focus:border-transparent text-xs md:text-sm h-12 md:h-14"
                  />
                  <label className="absolute left-6 -top-2 text-xs font-medium text-gray-700 pointer-events-none bg-white px-2">
                    Pickup
                  </label>
                </div>

                {/* Return Date Field */}
                <div className="relative">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-3 pt-6 pb-3 border border-gray-300 text-gray-600 rounded-lg px-2 focus:outline-none focus:ring-2  focus:border-transparent text-xs md:text-sm h-12 md:h-14"
                  />
                  <label className="absolute left-6 -top-2 text-xs font-medium text-gray-700 pointer-events-none bg-white px-2">
                    Return
                  </label>
                </div>

                {/* Area Dropdown */}
                <div className="relative">
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-3 pt-5 pb-3 border border-gray-300 text-gray-600 rounded-lg pl-9 pr-2 appearance-none focus:outline-none focus:ring-2 focus:border-transparent text-xs md:text-sm h-12 md:h-14"
                  >
                    <option value="Tissamaharama">Tissamaharama</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Matara">Matara</option>
                  </select>
                  <label className="absolute left-6 -top-2 text-xs font-medium text-gray-600 pointer-events-none bg-white px-2">
                    Area
                  </label>
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 mt-1 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 pointer-events-none">
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Pay Now Button */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      navigate("/taxi-renting-payment");
                    }}
                    className="w-full bg-green-200 hover:bg-green-300 text-black font-semibold py-3 md:py-4 px-6 rounded-lg transition duration-200 h-12 md:h-14 text-sm md:text-base"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentedVehicleDetails;
