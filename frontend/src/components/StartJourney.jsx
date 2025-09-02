import { useState } from "react";
import { CalendarDays, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StartJourney({ vehicle }) {
  const [pickup, setPickup] = useState("Tissamaharama");
  const [drop, setDrop] = useState("Mirissa");
  const [date, setDate] = useState("2025-02-04");
  const [time, setTime] = useState("10:00");

  const navigate = useNavigate();

  return (
    <div className="mx-auto">
      <h2 className="text-xl font-bold text-gray-600 my-8 text-center sm:text-left">
        Start the Journey
      </h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full flex flex-col md:flex-row">
        {/* Image - takes full width on mobile, 40% on larger screens */}
        <div className="w-full md:w-2/5  flex items-center justify-center">
          <div className="w-[80%] p-5 lg:p-10">
            <img
              src={vehicle.image}
              alt="Taxi"
              className="w-full h-full md:h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Form Content - takes full width on mobile, 60% on larger screens */}
        <div className="w-full md:w-3/5 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
            {/* Pickup */}
            <div className="relative w-full">
              <select
                id="pickup"
                className="w-full border border-gray-400 rounded-md p-3 text-xs sm:text-sm outline-none appearance-none"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              >
                <option value="">Select Pickup</option>
                <option>Tissamaharama</option>
                <option>Colombo</option>
                <option>Ella</option>
              </select>
              <label
                htmlFor="pickup"
                className="absolute -top-2 left-2 bg-white px-1 text-xs sm:text-sm text-gray-600"
              >
                Pickup
              </label>
            </div>

            {/* Drop */}
            <div className="relative w-full">
              <select
                id="drop"
                className="w-full border border-gray-400 rounded-md p-3 text-xs sm:text-sm outline-none appearance-none"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
              >
                <option value="">Select Drop</option>
                <option>Mirissa</option>
                <option>Kandy</option>
                <option>Galle</option>
              </select>
              <label
                htmlFor="drop"
                className="absolute -top-2 left-2 bg-white px-1 text-xs sm:text-sm text-gray-600"
              >
                Drop
              </label>
            </div>

            {/* Date */}
            <div className="relative w-full">
              <input
                type="date"
                id="date"
                className="w-full border border-gray-400 rounded-md p-3 text-xs sm:text-sm outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label
                htmlFor="date"
                className="absolute -top-2 left-2 bg-white px-1 text-xs sm:text-sm text-gray-600"
              >
                Date
              </label>
            </div>

            {/* Time */}
            <div className="relative w-full">
              <input
                type="time"
                id="time"
                className="w-full border border-gray-400 rounded-md p-3 text-xs sm:text-sm outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <label
                htmlFor="time"
                className="absolute -top-2 left-2 bg-white px-1 text-xs sm:text-sm text-gray-600"
              >
                Time
              </label>
            </div>
          </div>

          {/* Button - right aligned on desktop, centered on mobile */}
          <div className="flex justify-center md:justify-end mt-6">
            <button
              onClick={() => {
                navigate("/taxi-booking-payment");
              }}
              className="bg-green-200 hover:bg-green-300 text-black font-semibold py-2 px-8 rounded-md"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
