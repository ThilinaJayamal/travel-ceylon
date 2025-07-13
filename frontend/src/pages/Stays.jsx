import React from "react";
import { asserts } from "../assets/assets";
import DestinationFilter from "../components/DestinationFilter";

const Stays = () => {
  return (
  <div className="overflow-auto m-auto">
      {/* Hero section */}
      <div
        className="h-[90vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${asserts.Stays_hero_section})` }}
      >
        <div className="flex flex-col px-6 md:px-10 lg:px-12 md:w-[400px] lg:w-[600px] max-w-3xl ml-10 m-auto">
          <h1 className="text-4xl md:text-5xl text-white font-semibold leading-tight">
            Make your travel wishlist, we'll do the rest
          </h1>
          <p className="text-lg md:text-2xl text-white mt-4">
            Special offers to suit your plan
          </p>
        </div>
      </div>
      {/* Filter section */}
      <div className="relative z-10 -mt-12 md:-mt-20 px-4 sm:px-8">
        <DestinationFilter />
      </div>
    </div>
    
  );
};

export default Stays;
