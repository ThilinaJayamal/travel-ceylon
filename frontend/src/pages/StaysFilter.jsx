import React, { useState, useEffect } from "react";
import DestinationFilter from "../components/DestinationFilter";
import { useLocation, useNavigate } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import { MapPin, Star, Users } from "lucide-react";

const StaysFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const urlFilters = {
    destination: searchParams.get("destination") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    rooms: parseInt(searchParams.get("rooms") || "1", 10),
    guests: parseInt(searchParams.get("guests") || "1", 10),
  };

  const { destination, checkIn, checkOut, rooms, guests } = urlFilters;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    priceMin: "",
    priceMax: "",
    features: {},
    dining: {},
  });

  useEffect(() => {
    const fetchAvailable = async () => {
      if (!destination) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const base = "http://localhost:5000/api/service/stays/";
        let url;

        // If both dates provided, use availability endpoint
        if (checkIn && checkOut) {
          const params = new URLSearchParams({
            location: destination,
            start_date: checkIn,
            end_date: checkOut,
            numberOfRooms: String(rooms),
            numberOfGuest: String(guests),
          });
          if (activeFilters.priceMin)
            params.set("minPrice", activeFilters.priceMin);
          if (activeFilters.priceMax)
            params.set("maxPrice", activeFilters.priceMax);
          url = `${base}/available?${params.toString()}`;
        } else {
          // Only location filter — simple list by location
          url = `${base}?location=${encodeURIComponent(destination)}`;
        }

        const res = await fetch(url, { method: "GET", credentials: "include" });

        if (!res.ok) {
          const err = await res
            .json()
            .catch(() => ({ message: "Failed to load" }));
          throw new Error(err.message || "Failed to fetch");
        }

        const data = await res.json();
        // backend might return { data: [...]} or array directly
        setResults(data.data || data.stays || data || []);
      } catch (err) {
        setError(err.message || "Network error");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailable();
  }, [destination, checkIn, checkOut, rooms, guests, activeFilters]);

  const openStay = (stay) => {
    navigate("/stays/specific-hotel", { state: { stayId: stay._id, stay } });
  };

  return (
    <div className="overflow-auto m-auto">
      {/* Destination Search */}
      <div className="flex flex-col mx-7 md:px-10 mt-40 md:mb-5 justify-center m-auto">
        <DestinationFilter
          onSearch={(params) => {
            const query = new URLSearchParams(params).toString();
            navigate(`/stays/filter?${query}`);
          }}
        />
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 m-auto justify-between max-w-[90%]">
        {/* Sidebar */}
        <div className="p-4 border-r border-gray-200 md:mb-20">
          <FilterSidebar onFilterChange={setActiveFilters} />
        </div>

        {/* Results */}
        <div className="flex-1 px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">
            {urlFilters.destination}{" "}
            <span className="text-gray-500">
              {results.length || 0} places found
            </span>
          </h2>

          {loading && (
            <div className="py-8 text-center">Loading available stays...</div>
          )}
          {error && <div className="py-4 text-red-600">Error: {error}</div>}

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:w-200">
            {results.map((item) => (
              <div
                key={item.stay?._id || item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                {/* Hotel Image */}
                <div className="relative h-48">
                  <img
                    src={
                      item.stay?.profilePic ||
                      item.stay?.images?.[0] ||
                      item.profilePic ||
                      item.images?.[0] ||
                      "/placeholder.jpg"
                    }
                    alt={item.stay?.name || item.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-6 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    Starting from Rs.
                    {item.starting_from ?? item.startingFrom ?? "—"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.stay?.name || item.name}
                    </h3>
                    <div className="flex items-center text-yellow-400 text-sm">
                      <Star className="w-4 h-4 mr-1" />
                      4.5
                    </div>
                  </div>

                  <p className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.stay?.location || item.location}
                  </p>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {(
                      item.stay?.description?.slice?.(0, 100) ||
                      item.stay?.description ||
                      item.description ||
                      ""
                    ).slice(0, 100)}
                    ...
                  </p>

                  {/* Room Info Preview */}
                  {item.rooms?.length > 0 && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm">
                      <p className="font-medium text-gray-700 mb-1">
                        Popular Room:
                      </p>
                      <div className="flex justify-between items-center">
                        <span>{item.rooms[0].roomType}</span>
                        <span className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-1" />{" "}
                          {item.rooms[0].maxGuest} Guests
                        </span>
                      </div>
                      <p className="text-emerald-600 font-semibold mt-1">
                        Rs.{item.rooms[0].price}/night
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-5">
                    <button
                      onClick={() =>
                        navigate("/stays/specific-hotel", {
                          state: { stay: item },
                        })
                      }
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {results.length === 0 && !loading && !error && (
              <p className="text-gray-500">No stays found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaysFilter;
