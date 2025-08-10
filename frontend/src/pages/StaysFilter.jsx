import React, { useState, useEffect } from "react";
import DestinationFilter from "../components/DestinationFilter";
import { useLocation } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";

// Dummy stays data (replace with your actual data as needed)
const staysData = [
  {
    id: 1,
    name: "Ocean View Apartment",
    location: "Colombo",
    price: 120,
    description: "Beautiful apartment with ocean views and modern amenities.",
    features: ["wifi", "balcony", "air-conditioning"],
    dining: ["breakfast", "dinner"],
    image: "https://source.unsplash.com/random/300x200?apartment",
  },
  {
    id: 2,
    name: "Cozy Mountain Cabin",
    location: "Kandy",
    price: 80,
    description: "A rustic cabin nestled in the mountains with great hiking trails.",
    features: ["fireplace", "kitchen", "parking"],
    dining: ["breakfast"],
    image: "https://source.unsplash.com/random/300x200?cabin",
  },
  {
    id: 3,
    name: "City Center Hostel",
    location: "Colombo",
    price: 45,
    description: "Affordable and friendly hostel in the heart of the city.",
    features: ["wifi", "shared-kitchen"],
    dining: [],
    image: "https://source.unsplash.com/random/300x200?hostel",
  },
  {
    id: 4,
    name: "Luxury Villa",
    location: "Galle",
    price: 350,
    description: "Spacious villa with private pool and garden.",
    features: ["pool", "wifi", "parking"],
    dining: ["breakfast", "lunch", "dinner"],
    image: "https://source.unsplash.com/random/300x200?villa",
  },
  // add more dummy stays as needed
];

const StaysFilter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // URL filters (from DestinationFilter search)
  const urlFilters = {
    destination: searchParams.get("destination") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    rooms: parseInt(searchParams.get("rooms") || "1"),
    guests: parseInt(searchParams.get("guests") || "1"),
  };

  const [activeFilters, setActiveFilters] = useState({
    priceMin: "",
    priceMax: "",
    features: {},
    dining: {},
  });

  const [filteredStays, setFilteredStays] = useState([]);

  useEffect(() => {
    let result = staysData;

    if (urlFilters.destination) {
      result = result.filter(
        (stay) =>
          stay.location.toLowerCase() === urlFilters.destination.toLowerCase()
      );
    }

    // Price filtering
    if (activeFilters.priceMin) {
      result = result.filter((stay) => stay.price >= activeFilters.priceMin);
    }

    if (activeFilters.priceMax) {
      result = result.filter((stay) => stay.price <= activeFilters.priceMax);
    }

    // Features filtering
    if (activeFilters.features) {
      Object.entries(activeFilters.features).forEach(([feature, isSelected]) => {
        if (isSelected) {
          result = result.filter((stay) => stay.features?.includes(feature));
        }
      });
    }

    // Dining filtering
    if (activeFilters.dining) {
      Object.entries(activeFilters.dining).forEach(([option, isSelected]) => {
        if (isSelected) {
          result = result.filter((stay) => stay.dining?.includes(option));
        }
      });
    }

    setFilteredStays(result);
  }, [location.search, activeFilters, urlFilters.destination]);

  return (
    <div className="overflow-auto m-auto">
      <div className="flex flex-col mx-7 md:px-10 mt-40 md:mb-5 justify-center m-auto">
        {/* destination filter component */}
        <DestinationFilter
          onSearch={(params) => {
            const query = new URLSearchParams(params).toString();
            window.location.href = `/stays/filter?${query}`;
          }}
        />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 m-auto justify-between max-w-[90%]">
        <div className=" p-4 border-r border-gray-200 md:mb-20">
          <FilterSidebar onFilterChange={setActiveFilters} />
        </div>
        {/* Stays */}
        <div className="flex-1 px-6 py-8 ">
          <h2 className="text-2xl font-bold mb-4">
            {urlFilters.destination || "All locations"}{" "}
            <span className="text-gray-500">{filteredStays.length} places found</span>
          </h2>

          <div className="space-y-6">
            {filteredStays.map((stay) => (
              <div
                key={stay.id}
                className="flex bg-white shadow-md rounded-xl overflow-hidden"
              >
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-[200px] h-[150px] object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold">{stay.name}</h3>
                    <p className="text-sm text-gray-500">{stay.location}</p>
                    <p className="text-sm mt-2 text-gray-700">{stay.description}</p>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-emerald-500 font-semibold">
                      ${stay.price}/<span className="text-sm">night</span>
                    </p>
                    <button className="bg-emerald-400 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow">
                      View Hotel
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredStays.length === 0 && (
              <p className="text-center text-gray-500 mt-10">No stays found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaysFilter;
