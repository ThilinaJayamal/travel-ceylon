import { useState } from "react";
import { CalendarDays, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function StartJourney({ vehicle }) {
  const [pickup, setPickup] = useState("Tissamaharama");
  const [drop, setDrop] = useState("Mirissa");
  const [date, setDate] = useState("2025-02-04");
  const [time, setTime] = useState("10:00");

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm text-gray-600 mb-1 text-left">
                Pickup
              </label>
              <div className="flex items-center border rounded-md p-2">
                <ArrowUpRight className="text-gray-500 mr-2 h-5 w-5" />
                <select
                  className="w-full outline-none bg-transparent text-xs sm:text-sm"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                >
                  <option>Tissamaharama</option>
                  <option>Colombo</option>
                  <option>Ella</option>
                </select>
              </div>
            </div>

            {/* Drop */}
            <div className="flex flex-col mb-2">
              <label className="text-xs sm:text-sm text-gray-600 mb-1 text-left">
                Drop
              </label>
              <div className="flex items-center border rounded-md p-2">
                <ArrowDownLeft className="text-gray-500 mr-2 h-5 w-5" />
                <select
                  className="w-full outline-none bg-transparent text-xs sm:text-sm"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                >
                  <option>Mirissa</option>
                  <option>Kandy</option>
                  <option>Galle</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm text-gray-600 mb-1 text-left">
                Date
              </label>
              <div className="flex items-center border rounded-md p-2">
                <CalendarDays className="text-gray-500 mr-2 h-5 w-5" />
                <input
                  type="text"
                  className="w-full outline-none text-xs sm:text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Time */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm text-gray-600 mb-1 text-left">
                Time
              </label>
              <div className="flex items-center border rounded-md p-2">
                <Clock className="text-gray-500 mr-2 h-5 w-5" />
                <input
                  type="text"
                  className="w-full outline-none text-xs sm:text-sm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Button - right aligned on desktop, centered on mobile */}
          <div className="flex justify-center md:justify-end mt-6">
            <button className="bg-green-200 hover:bg-green-300 text-black font-semibold py-2 px-8 rounded-md">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
