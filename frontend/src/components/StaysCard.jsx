import React from "react";

const StaysCard = ({ name, location, imageUrl }) => {
  return (
    <div className="w-[250px] shrink-0 rounded-xl overflow-hidden relative mx-2 shadow-md">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[340px] object-cover"
      />
      <div className="absolute bottom-16 left-4 text-white">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm">{location}</p>
      </div>
      <button className="absolute bottom-4 left-4 right-4 bg-green-300 text-black py-2 rounded-md font-medium cursor-pointer">
        Book Now
      </button>
    </div>
  );
};

export default StaysCard;
