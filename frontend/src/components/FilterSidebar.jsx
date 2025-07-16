import { useState } from "react";

const FilterSidebar = ({ onFilterChange }) => {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [features, setFeatures] = useState({
    nonSmoking: false,
    familyRooms: false,
    ac: false,
    wifi: false,
  });

  const [dining, setDining] = useState({
    restaurant: false,
    bar: false,
  });
  const [facilities, setFacilities] = useState({
    fitnessCenter: false,
    sauna: false,
    swimmingPool: false,
    beach: false,
    airportShuttle: false,
  });

  const handleCheckbox = (section, key) => {
    if (section === "features") {
      setFeatures((prev) => {
        const updated = { ...prev, [key]: !prev[key] };
        onFilterChange({
          priceMin,
          priceMax,
          features: updated,
          dining,
          facilities,
        });
        return updated;
      });
    } else if (section === "dining") {
      setDining((prev) => {
        const updated = { ...prev, [key]: !prev[key] };
        onFilterChange({
          priceMin,
          priceMax,
          features,
          dining: updated,
          facilities,
        });
        return updated;
      });
    } else if (section === "facilities") {
      setFacilities((prev) => {
        const updated = { ...prev, [key]: !prev[key] };
        onFilterChange({
          priceMin,
          priceMax,
          features,
          dining,
          facilities: updated,
        });
        return updated;
      });
    }
  };

  const handlePriceChange = () => {
    onFilterChange({ priceMin, priceMax, features, dining });
  };

  return (
    <div className="w-full md:w-[250px] pr-5 p-4 border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <p className="font-medium mb-2">Price</p>
        <div className="flex space-x-2">
          <input
            type="number"
            value={priceMin}
            onChange={(e) => {
              setPriceMin(e.target.value);
              handlePriceChange();
            }}
            placeholder="Min"
            className="border p-1 rounded w-full"
          />
          <input
            type="number"
            value={priceMax}
            onChange={(e) => {
              setPriceMax(e.target.value);
              handlePriceChange();
            }}
            placeholder="Max"
            className="border p-1 rounded w-full"
          />
        </div>
      </div>

      {/* Room Features */}
      <div className="mb-6">
        <p className="font-medium mb-2">Room Features</p>
        {[
          { label: "Non-Smoking rooms", key: "nonSmoking" },
          { label: "Family Rooms", key: "familyRooms" },
          { label: "Air conditioning", key: "ac" },
          { label: "Free Wifi", key: "wifi" },
        ].map(({ label, key }) => (
          <div key={key} className="mb-1">
            <label>
              <input
                type="checkbox"
                checked={features[key]}
                onChange={() => handleCheckbox("features", key)}
                className="mr-2"
              />
              {label}
            </label>
          </div>
        ))}
      </div>

      {/* Dining & Refreshments */}
      <div className="mb-6">
        <p className="font-medium mb-2">Dining & Refreshments</p>
        {[
          { label: "Restaurant", key: "restaurant" },
          { label: "Bar", key: "bar" },
        ].map(({ label, key }) => (
          <div key={key} className="mb-1">
            <label>
              <input
                type="checkbox"
                checked={dining[key]}
                onChange={() => handleCheckbox("dining", key)}
                className="mr-2"
              />
              {label}
            </label>
          </div>
        ))}
      </div>
      {/* Facilities and Services */}
      <div>
        <p className="font-medium mb-2">Facilities & Services</p>
        {[
          { label: "Fitness Center", key: "fitnessCenter" },
          { label: "Sauna", key: "sauna" },
          { label: "Swimming Pool", key: "swimmingPool" },
          { label: "Beach", key: "beach" },
          { label: "Airport Shuttle", key: "airportShuttle" },
        ].map(({ label, key }) => (
          <div key={key} className="mb-1">
            <label>
              <input
                type="checkbox"
                checked={facilities[key]}
                onChange={() => handleCheckbox("facilities", key)}
                className="mr-2"
              />
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
