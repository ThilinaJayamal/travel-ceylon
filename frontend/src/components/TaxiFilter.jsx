import React, { useState } from "react";

const TaxiFilter = ({ vehicles, onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 50 },
    selectedModels: [],
    selectedFuelTypes: [],
    selectedCarTypes: [],
  });

  const minPrice = Math.min(...vehicles.map((v) => v.feePerKm));
  const maxPrice = Math.max(...vehicles.map((v) => v.feePerKm));
  const availableModels = [...new Set(vehicles.map((v) => v.model))];
  const availableFuelTypes = [...new Set(vehicles.map((v) => v.fuelType))];
  const availableCarTypes = [
    ...new Set(vehicles.map((v) => v.carType).filter(Boolean)),
  ];

  const handlePriceChange = (e, type) => {
    const newFilters = {
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: Number(e.target.value),
      },
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (type, value) => {
    const newFilters = { ...filters };
    const selectedArray = newFilters[`selected${type}`];
    const index = selectedArray.indexOf(value);

    if (index === -1) {
      selectedArray.push(value);
    } else {
      selectedArray.splice(index, 1);
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div>
      <h1 className="text-black text-2xl font-semibold text-left">Filters</h1>
      <div className="w-[80%] h-[1px] bg-gray-300 mt-4"></div>

      {/*Price Filter */}
      <div className="mt-6 mb-4">
        <h1 className="text-base font-semibold text-left mb-3">Price</h1>
        <div className="flex gap-4">
          <div className="relative w-full">
            <input
              type="number"
              min={minPrice}
              max={maxPrice}
              value={filters.priceRange.min}
              onChange={(e) => handlePriceChange(e, "min")}
              className="w-full p-2 border border-gray-300 rounded text-black pr-8"
              placeholder="Min"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 5.707l-2.646 2.647a.5.5 0 0 1-.708-.708l3-3z"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-full">
            <input
              type="number"
              min={minPrice}
              max={maxPrice}
              value={filters.priceRange.max}
              onChange={(e) => handlePriceChange(e, "max")}
              className="w-full p-2 border border-gray-300 rounded text-black pr-8"
              placeholder="Max"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 5.707l-2.646 2.647a.5.5 0 0 1-.708-.708l3-3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] h-[1px] bg-gray-300 mt-2"></div>

      {/* Model Filter */}
      {availableModels.length > 0 && (
        <div className="my-6">
          <h3 className="font-semibold text-base mb-3 text-left">Model</h3>
          <div className="space-y-3">
            {availableModels.map((model) => (
              <div key={model} className="flex items-center">
                <input
                  type="checkbox"
                  id={`model-${model}`}
                  checked={filters.selectedModels.includes(model)}
                  onChange={() => handleCheckboxChange("Models", model)}
                  className="w-5 h-5 border-2 border-gray-300 rounded mr-3 cursor-pointer"
                />
                <label
                  htmlFor={`model-${model}`}
                  className="text-base font-semibold cursor-pointer"
                >
                  {model}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-[80%] h-[1px] bg-gray-300"></div>

      {/* Fuel Type Filter */}
      {availableFuelTypes.length > 0 && (
        <div className="my-6">
          <h3 className="font-semibold text-base mb-3 text-left">Fuel Type</h3>
          <div className="space-y-3">
            {availableFuelTypes.map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={`fuel-${type}`}
                  checked={filters.selectedFuelTypes.includes(type)}
                  onChange={() => handleCheckboxChange("FuelTypes", type)}
                  className="w-5 h-5 border-2 border-gray-300 rounded mr-3 cursor-pointer shadow-xl"
                />
                <label
                  htmlFor={`fuel-${type}`}
                  className="text-base font-semibold cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Car Type Filter (only if available) */}
      {availableCarTypes.length > 0 && (
        <div className="my-6">
          <h3 className="font-semibold text-base mb-3 text-left">Car Type</h3>
          <div className="space-y-3">
            {availableCarTypes.map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={filters.selectedCarTypes.includes(type)}
                  onChange={() => handleCheckboxChange("CarTypes", type)}
                  className="w-5 h-5 border-2 border-gray-300 rounded mr-3 cursor-pointer"
                />
                <label
                  htmlFor={`type-${type}`}
                  className="text-base font-semibold cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxiFilter;
