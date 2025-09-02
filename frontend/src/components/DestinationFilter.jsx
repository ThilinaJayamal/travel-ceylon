import { useState } from "react";
import { FaBed, FaUser } from "react-icons/fa";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";

const destinations = [
  "Tissamaharama",
  "Nuwaraeliya",
  "Mirissa",
  "Ella",
  "Kandy",
  "Galle",
  "Trincomalee",
  "Anuradhapura",
  "Sigiriya",
  "Polonnaruwa",
];

const DestinationFilter = ({ onSearch }) => {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showRoomGuest, setShowRoomGuest] = useState(false);

  const handleSearch = () => {
    const searchData = {
      destination: selectedDestination,
      checkIn,
      checkOut,
      rooms,
      guests,
    };
    onSearch(searchData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto -mt-12">
      <h2 className="text-lg font-semibold mb-4">Find your Perfect Destination</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaBed className="mr-2 text-gray-500" />
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="outline-none w-full bg-transparent"
            >
              {destinations.map((place, idx) => (
                <option key={idx} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check In */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check In
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="date"
              className="outline-none w-full bg-transparent"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check Out
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="date"
              className="outline-none w-full bg-transparent"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Rooms & Guests */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rooms & Guests
          </label>
          <div
            onClick={() => setShowRoomGuest(!showRoomGuest)}
            className="flex items-center justify-between border rounded px-3 py-2 cursor-pointer"
          >
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-500" />
              <span>
                {rooms} Room, {guests} Guest{guests > 1 ? "s" : ""}
              </span>
            </div>
            <span className="text-gray-500">&#x25BC;</span>
          </div>

          {showRoomGuest && (
            <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-md p-4 space-y-2">
              {/* Room Selector */}
              <div className="flex justify-between items-center">
                <span>Room</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="px-2 rounded"
                  >
                    <FaRegSquareMinus className="text-xl" />
                  </button>
                  <span>{rooms}</span>
                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="px-2 rounded"
                  >
                    <FaRegSquarePlus className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Guest Selector */}
              <div className="flex justify-between items-center">
                <span>Guests</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="px-2 rounded"
                  >
                    <FaRegSquareMinus className="text-xl" />
                  </button>
                  <span>{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="px-2 rounded"
                  >
                    <FaRegSquarePlus className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex items-end justify-end col-span-full mt-4 lg:mt-0">
          <button
            onClick={handleSearch}
            className="bg-emerald-400 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationFilter;
