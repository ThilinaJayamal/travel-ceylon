import React from "react";
import { useNavigate } from "react-router-dom";
import { asserts } from "../assets/assets";

const places = [
  {
    name: "Kandy",
    province: "Central Province",
    image: asserts.kandy,
  },
  {
    name: "Ella",
    province: "Uva Province",
    image: asserts.ella,
  },
  {
    name: "Yala",
    province: "Southern Province",
    image: asserts.yala,
  },
  {
    name: "Tissamaharama",
    province: "Southern Province",
    image: asserts.tissa,
  },
  {
    name: "Jaffna",
    province: "North Province",
    image: asserts.jaffna,
  },
  {
    name: "Galle",
    province: "Southern Province",
    image: asserts.galle,
  },
];

const MustVisitSlider = () => {
  const navigate = useNavigate();

  const handleShowGuides = (place) => {
    const townName = place.name;
    navigate(`/guides/search?q=${encodeURIComponent(townName)}`);
  };

  return (
    <section className="py-10 rounded-2xl max-w-[88%] mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Most Popular Places That You Must Need a Guide
      </h2>

      <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
        {places.map((place, index) => (
          <div
            key={index}
            className="w-[85vw] md:w-[35%] flex-shrink-0 rounded-xl shadow-md relative"
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 rounded-xl text-white text-center px-4">
              <h3 className="text-xl font-semibold">{place.name}</h3>
              <p className="text-sm">{place.province}</p>
            </div>

            <button
              onClick={() => handleShowGuides(place)}
              className="absolute bottom-4 right-4 bg-green-300 text-black px-4 py-2 rounded hover:bg-green-700 hover:text-white transition"
            >
              Show Guides
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MustVisitSlider;
