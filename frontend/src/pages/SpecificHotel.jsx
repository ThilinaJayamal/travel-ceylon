import React from "react";
import { hotelData } from "../assets/dummyHotelData";
import TestimonialCard from "../components/TestimonialCard";
import { useAppStore } from "../store/app-store";
import { asserts } from "../assets/assets";
const SpecificHotel = () => {
  const toggleReviewOpen = useAppStore((state) => state.toggleReviewOpen);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-grow mt-25">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{hotelData.name}</h1>
            <p className="text-gray-500">{hotelData.location}</p>
            <p className="flex items-center text-sm text-gray-600">
              📍 {hotelData.address}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <p className="text-lg font-semibold">
              ${hotelData.pricePerNight}/night
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              Book Now
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-6">
          <img
            src={hotelData.image}
            alt={hotelData.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Snapshot */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Snapshot</h2>
          <div className="space-y-4 text-gray-700">
            {hotelData.description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-8">
          <div className=" w-full">
            <h3 className="text-2xl font-semibold">What People Say About Us</h3>
            <p className=" text-black/">
              What people say about our facilities and services
            </p>

            <div className="flex gap-10 items-center justify-start mt-5 overflow-x-auto scrollbar-hide w-auto pb-8 pr-8">
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
        </section>

        {/* Surroundings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Hotel surroundings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Top attractions</h3>
              {hotelData.surroundings.attractions.map((item, idx) => (
                <p key={idx}>
                  {item.name} - {item.distance}
                </p>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Nature</h3>
              {hotelData.surroundings.nature.map((item, idx) => (
                <p key={idx}>
                  {item.name} - {item.distance}
                </p>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Practical Access</h3>
              {hotelData.surroundings.access.map((item, idx) => (
                <p key={idx}>
                  {item.name} - {item.distance}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Most popular facilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {hotelData.facilities.map((facility, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="text-3xl">{facility.icon}</div>
                <p className="font-semibold">{facility.title}</p>
                <p className="text-sm text-gray-500">{facility.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rooms */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border-b">Room Type</th>
                  <th className="py-2 px-4 border-b">Base Price</th>
                  <th className="py-2 px-4 border-b">Max Guest</th>
                  <th className="py-2 px-4 border-b">Bed Options</th>
                  <th className="py-2 px-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {hotelData.rooms.map((room, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 border-b">{room.type}</td>
                    <td className="py-2 px-4 border-b">
                      ${room.price.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">{room.maxGuest}</td>
                    <td className="py-2 px-4 border-b">{room.bed}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SpecificHotel;
