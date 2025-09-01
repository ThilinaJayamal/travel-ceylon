import React, { useEffect, useState } from "react";
import { CalendarDays, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RentTaxiSearch = ({ vehicleName }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickup: "",
    medium: "",
    drop: "",
    pickupDate: "",
    returnDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (vehicleName) {
      // Remove the trailing 's' from vehicle name and convert to lowercase
      const medium = vehicleName.toLowerCase().endsWith("s")
        ? vehicleName.toLowerCase().slice(0, -1)
        : vehicleName.toLowerCase();

      setFormData((prev) => ({
        ...prev,
        medium: medium,
      }));
    }
  }, [vehicleName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate with the form data and keep the currently selected vehicle
    navigate("/rent-taxi", {
      state: {
        vehicle: { name: vehicleName }, // Maintain the vehicle selection
        state: formData,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-full p-4 sm:p-7 z-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-left text-sm font-semibold">
          Where you want to go
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Area (Pickup) */}
          <div className="flex flex-col flex-1">
            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left">
              Area
            </label>
            <div className="relative">
              <select
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                className="w-full text-xs sm:text-sm  p-3 pl-10 border border-gray-400 rounded-md bg-white text-gray-500 appearance-none"
              >
                <option value="Sri Lanka">All of Sri Lanka</option>
                <option value="Tissamaharama">Tissamaharama</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
              </select>
              <ArrowDownLeft
                className="text-gray-800 absolute top-[35%] left-3"
                size={18}
              />
            </div>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col flex-1">
            <label className="text-xs font-medium text-gray-700 mb-1 text-left">
              Pick Up
            </label>
            <div className="relative">
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-400 rounded-md text-gray-700 text-xs sm:text-sm"
              />
              <CalendarDays
                className="text-gray-800 absolute top-[35%] left-3"
                size={18}
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="flex flex-col flex-1">
            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left">
              Return
            </label>
            <div className="relative">
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-400 rounded-md text-gray-700 text-xs sm:text-sm"
              />
              <CalendarDays
                className="text-gray-800 absolute top-[35%] left-3"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-green-200 hover:bg-green-300 text-black text-xs sm:text-sm font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentTaxiSearch;
