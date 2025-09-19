import React from "react";
import { hotelData } from "../assets/dummyHotelData"; // ✅ adjust path if needed

export default function HotelPayment() {
  const { image, name, address, booking, payment } = hotelData;
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.max(
    1,
    Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
  );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 mb-20">
        {/* Left: Booking Details */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold mb-1">{name}</h2>
          <p className="text-gray-600 mb-4">{address}</p>

          <h3 className="font-semibold text-gray-800 mb-2">Booking Details</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>{booking.roomType}</p>
            <p>
              <span className="font-medium">Rooms:</span> {booking.rooms}
            </p>
            <p>
              <span className="font-medium">Guests:</span> {booking.people}
            </p>
            <p>
              <span className="font-medium">Check in:</span> {booking.checkIn}
            </p>
            <p>
              <span className="font-medium">Check out:</span> {booking.checkOut}
            </p>
            <p>
              <span className="font-medium">Nights:</span> {nights}
            </p>
          </div>

          <h3 className="font-semibold text-gray-800 mt-6 mb-2">
            Payment Details
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Base Fee:</span> $
              {payment.baseFee.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Discount:</span> $
              {payment.discount.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Taxes:</span> $
              {payment.taxes.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Service Fee:</span> $
              {payment.serviceFee.toFixed(2)}
            </p>
          </div>
          <div className="mt-4 border-t pt-2">
            <p className="font-semibold text-gray-900">
              Total:{" "}
              <span className="text-green-600">
                ${payment.total.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add a new card</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Exp. Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Country or Region
              </label>
              <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200">
                <option>Sri Lanka</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <span className="text-sm">Save my card for quick payments</span>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-400 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Pay now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
