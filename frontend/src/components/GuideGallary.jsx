import React from "react";

import { asserts } from "../assets/assets";

const places = [
  {
    name: "Anuradhapura",
    province: "North Central Province",
    image: "../assets/guideGallary/anuradapura.jpg",
  },
  {
    name: "Ella",
    province: "Uva Province",
    image: "../assets/guideGallary/ella.png",
  },
  {
    name: "Galle",
    province: "Southern Province",
    image: "../assets/guideGallary/galle.jpg",
  },
  {
    name: "Hortan Plains",
    province: "Central Province",
    image: "../assets/guideGallary/hortan.jpg",
  },
  {
    name: "Sigiriya",
    province: "North Central Province",
    image: "../assets/guideGallary/sigiriya.jpg",
  }
];

const GuideGallary = () => {
  return (
    <section className="py-10 rounded-2xl max-w-[88%] mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Tour Gallery
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
            <button className="absolute bottom-4 right-4 bg-green-300 text-black px-4 py-2 rounded hover:bg-green-700 hover:text-white transition">
              Show Guides
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuideGallary;
