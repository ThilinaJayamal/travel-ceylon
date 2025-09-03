import { div } from "framer-motion/client";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { asserts } from "../assets/assets";
import MustVisitSlider from "../components/MustVisitSlider";
import GuideGallary from "../components/GuideGallary";

const cards = [
  {
    src: asserts.guide1,
    alt: "guide1",
  },
  {
    src: asserts.guide2,
    alt: "guide2",
  },
  {
    src: asserts.guide3,
    alt: "guide3",
  },
  {
    src: asserts.guide4,
    alt: "guide4",
  },
];

function Guides() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/guides/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* // Hero Section */}
      <div
        className="h-[90vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${asserts.guide_cover})` }}
      >
        <div className="flex flex-col mx-3 md:mx-10 lg:px-12 md:w-[400px] lg:w-[600px] max-w-3xl ml-10 m-auto">
          <h1 className="text-4xl md:text-5xl text-white font-semibold leading-tight">
            Make your travel wishlist, we'll do the rest
          </h1>
          <p className="text-lg md:text-2xl text-white mt-4">
            Special offers to suit your plan
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative -top-16 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <label
          htmlFor="search"
          className="block mb-2 text-gray-700 font-normal"
        >
          Search your Local Guide
        </label>
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="search"
            placeholder="Search the area"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="submit"
            className="bg-green-300 text-black font-semibold px-6 rounded-md hover:bg-green-400 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* feature cards section */}
      <section className="bg-white rounded-2xl p-6 md:p-10 max-w-[88%] mx-auto shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Discover Sri Lanka Through Local Eyes
        </h2>
        <p className="text-sm md:text-base text-gray-700 mb-8 max-w-4xl">
          Experience the island like never before with our certified Sri Lankan
          tour guides—historians, wildlife experts, and culinary insiders who
          bring each destination to life. Whether you’re a solo traveler or a
          family, choose your perfect guide for cultural deep-dives,
          off-the-beaten-path adventures, or customized itineraries.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="w-full flex justify-center">
              <img
                src={card.src}
                alt={card.alt}
                className="w-full max-w-xs h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Additional Search Section */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 md:px-10 shadow-md
          bg-white max-w-[88%] rounded-lg  m-auto max-h-auto mb-10 mt-14"
      >
        <div className="flex items-end h-full">
          <img src={asserts.guider} alt="Man with Binocular" />
        </div>
        <div className="flex flex-col justify-center items-center mb-2">
          <h2 className="text-2xl font-bold mb-4">
            Partner with Sri Lanka's Most Trusted Tour Guide Platform{" "}
          </h2>
          <p className="text-gray-600 mb-6">
            At travelCeylon, we connect passionate local experts with travelers
            seeking authentic Sri Lankan experiences—from ancient temple
            historians to wildlife trackers and culinary storytellers. Showcase
            your knowledge and grow your business with our traveler community.
          </p>
          <button className="bg-emerald-400 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer">
            <Link to="/service/login">Register as Guide</Link>
          </button>
        </div>
      </div>

      {/* places Slider */}
      <MustVisitSlider />
      <GuideGallary />
    </>
  );
}

export default Guides;
