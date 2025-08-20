import React, { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, CarFront } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaxiSearch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: "Tissamaharama",
    drop: "Mirissa",
    medium: "car",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/taxi-bookings", { state: formData });
  };

  const selectClasses =
    "w-full border border-gray-400 text-gray-500 rounded-md p-3 pl-10 pr-3 text-sm sm:text-base outline-none bg-white appearance-none";

  const labelClasses =
    "absolute -top-2 left-3 bg-white px-1 text-xs sm:text-sm text-gray-600";

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-full p-4 sm:p-7 z-50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-start text-left text-gray-600 text-sm font-medium">
          <span>Where you want to go</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Pickup */}
          <div className="relative w-full">
            <select
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="" disabled hidden />
              <option value="Tissamaharama">Tissamaharama</option>
              <option value="Colombo">Colombo</option>
              <option value="Ella">Ella</option>
            </select>
            <label htmlFor="pickup" className={labelClasses}>
              Pickup
            </label>
            <ArrowDownLeft
              className="absolute top-[35%] left-3 text-gray-800"
              size={18}
            />
          </div>

          {/* Drop */}
          <div className="relative w-full">
            <select
              name="drop"
              value={formData.drop}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="" disabled hidden />
              <option value="Mirissa">Mirissa</option>
              <option value="Galle">Galle</option>
              <option value="Kandy">Kandy</option>
            </select>
            <label htmlFor="drop" className={labelClasses}>
              Drop
            </label>
            <ArrowUpRight
              className="absolute top-[35%] left-3 text-gray-800"
              size={18}
            />
          </div>

          {/* Medium */}
          <div className="relative w-full">
            <select
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="" disabled hidden />
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="TukTuk">TukTuk</option>
            </select>
            <label htmlFor="medium" className={labelClasses}>
              Medium
            </label>
            <CarFront
              className="absolute top-[35%] left-3 text-gray-800"
              size={18}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-200 hover:bg-green-300 text-black text-sm sm:text-md font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md transition duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaxiSearch;
