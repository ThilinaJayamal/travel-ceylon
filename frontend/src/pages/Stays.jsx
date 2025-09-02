import React, { useRef } from "react";
import Mirissa from "../assets/Mirissa.png";
import Hikkaduwa from "../assets/Hikkaduwa.png";
import HikkaduwaCelestia from "../assets/Hikkaduwa_calestia.png";
import Arugambay from "../assets/Arugambay.png";
import Katharagama from "../assets/Katharagama.png";
import Thissamaharama from "../assets/ThissamaharamaC.png";

import { asserts } from "../assets/assets";
import DestinationFilter from "../components/DestinationFilter";
import StaysCard from "../components/StaysCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "../components/TestimonialCard";
import { useAppStore } from "../store/app-store";
import { useNavigate } from "react-router-dom";

const Stays = () => {
  const scrollRef = useRef(null);
  const toggleReviewOpen = useAppStore((state) => state.toggleReviewOpen);
  const navigate = useNavigate();

  // ---- Inline staysData with imported images ----
  const staysData = [
    { name: "The Grand Serenity", location: "Mirissa", imageUrl: Mirissa },
    { name: "Onyx Towers", location: "Hikkaduwa", imageUrl: Hikkaduwa },
    { name: "The Celestia", location: "Hikkaduwa", imageUrl: HikkaduwaCelestia },
    { name: "AruGamBAY", location: "Arugambay", imageUrl: Arugambay },
    { name: "Pearl Residences", location: "Katharagama", imageUrl: Katharagama },
    { name: "Lake villa", location: "Thissamaharama", imageUrl: Thissamaharama },
  ];

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  const handleSearch = (params) => {
    const queryString = new URLSearchParams(params).toString();
    navigate(`/stays/filter?${queryString}`);
  };

  return (
    <div className="overflow-auto m-auto">
      {/* Hero section */}
      <div
        className="h-[90vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${asserts.Stays_hero_section})` }}
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

      {/* Filter section */}
      <div className="relative z-10 -mt-12 md:-mt-20 px-6 md:px-10 lg:px-12">
        <DestinationFilter onSearch={handleSearch} />
      </div>

      {/* Stays Cards Section */}
      <div className="flex flex-col mx-7 md:px-10 lg:px-12 py-10 justify-center m-auto">
        <h2 className="text-3xl font-bold">Top Hotels & Stays</h2>
        <p className="text-gray-600 mb-4">
          Celebrate in style. Sleep somewhere unforgettable. Browse top-rated
          stays for every getaway.
        </p>

        <div className="relative">
          {/* Arrow Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 cursor-pointer"
          >
            <ChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 py-4"
          >
            {staysData.map((stay, index) => (
              <StaysCard key={index} {...stay} />
            ))}
            <div className="w-[250px] shrink-0 rounded-xl relative mx-2 items-center flex flex-col justify-center">
              <button
                onClick={() => console.log("Show more stays")}
                className="bg-emerald-400 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded shadow max-h-[60px] w-[115px] cursor-pointer"
              >
                Show More
              </button>
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Additional Search Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 md:px-10 bg-white max-w-[88%] rounded-lg shadow-md m-auto mb-10">
        <div className="flex items-end h-full">
          <img src={asserts.searchMan} alt="Man with Binocular" />
        </div>
        <div className="flex flex-col justify-center items-center mb-2">
          <h2 className="text-2xl font-bold mb-4">
            Looking for the Best Hotels for Your Dream Vacation?
          </h2>
          <p className="text-gray-600 mb-6">
            At travelCeylon, we bring you Sri Lanka’s most unforgettable stays —
            from sun-kissed beach villas in Bentota to charming colonial-era
            boutiques in Colombo. Every property is handpicked for comfort,
            character, and convenience, so your getaway feels just right from
            the moment you check in.
          </p>
          <button className="bg-emerald-400 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer">
            Search Hotel
          </button>
        </div>
      </div>

      {/* Offers Section */}
      <div className="flex flex-col max-w-[88%] m-auto mb-10">
        <h1 className="text-4xl font-semibold">What we offer</h1>
        <p className="text-gray-600 mt-2 mb-6">
          Enjoy unforgettable stays across Sri Lanka with handpicked hotels for
          every traveler. From beachfront villas to hilltop hideaways, each stay
          promises comfort, charm, and convenience. Verified properties,
          transparent rates, and flexible check-in options—book instantly and
          stay your way!
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 lg:gap-10 space-x-4">
          {asserts.staysOffers.map((offer, index) => (
            <div
              key={index}
              className="flex flex-col items-center mb-6 p-4 bg-green-200 bg-opacity-25 hover:bg-green-300 shadow-xl rounded-2xl transform motion-safe:hover:scale-105"
            >
              <img
                src={offer.image}
                alt={offer.heading}
                className="w-12 h-12 mb-7 mt-4"
              />
              <div className="text-center md:max-w-[200px] mb-10">
                <h3 className="text-xl font-semibold mb-3">{offer.heading}</h3>
                <p className="text-gray-500">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="mt-12 m-auto max-w-[88%] mb-10">
        <div className="w-full">
          <h3 className="text-4xl font-semibold">What People Say About Us</h3>
          <p className="text-lg text-black/90 mt-3">
            What people say about our facilities and services
          </p>

          <div className="flex gap-6 items-center justify-start mt-12 overflow-x-auto scrollbar-hide w-auto pb-8 pr-8">
            {asserts.testimonials.map((item, index) => (
              <TestimonialCard
                key={index}
                user={item.user}
                country={item.country}
                text={item.text}
                rating={item.rating}
                img={item.img}
                star={asserts.star}
              />
            ))}
          </div>

          <div className="flex justify-end items-center">
            <button
              onClick={() => toggleReviewOpen()}
              className="px-4 py-2 rounded-md border-2 border-green-300 cursor-pointer"
            >
              Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Partner with us Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-10 py-10 bg-emerald-100 p-6 max-w-[88%] rounded-lg shadow-md m-auto mb-20">
        <div className="flex flex-col justify-center items-start md:ml-10">
          <h1 className="text-2xl font-semibold mb-4">
            Partner with Sri Lanka’s Largest hotel booking Platform
          </h1>
          <p className="text-gray-600 mb-6">
            Partner with us to showcase your property to thousands of travelers.
            Benefit from our marketing tools, real-time booking management, and
            dedicated support to grow your business. Your journey starts here
            where Sri Lanka’s hospitality meets hassle-free planning.
          </p>
          <div className="w-full flex justify-center">
            <button className="bg-emerald-400 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer">
              List Your Hotel
            </button>
          </div>
        </div>
        <div className="flex items-end h-full">
          <img
            src={asserts.businessman}
            alt="Image of Businessman"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Stays;
