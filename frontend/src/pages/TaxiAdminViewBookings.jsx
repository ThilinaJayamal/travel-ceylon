import React, { useState } from "react";
import adminBG from "../assets/Taxi/adminBG.webp";
import sarah from "../assets/Taxi/sarah.png";
import { useNavigate } from "react-router-dom";

const TaxiAdminViewBookings = () => {
  const navigate = useNavigate();
  const taxiVehicle = {
    numberPlate: "CAX-0696",
    model: "Toyota Vitz",
    driverImage: sarah,
    location: "Tissamaharama",
  };

  // Mock bookings data
  const bookings = {
    pending: [
      {
        id: 1,
        user: "Booking User",
        country: "United States",
        date: "25 Feb 2025",
        email: "bookinguser1@gmail.com",
        phone: "+1 470235454",
        pickup: "Tissamaharama",
        drop: "Mirissa",
        bookingDate: "04 Feb 2025",
        time: "10:20 AM",
        distance: "128 km",
        additional: "-",
      },
    ],
    history: [
      {
        id: 3,
        user: "Booking User",
        country: "France",
        date: "05 Feb 2025",
        email: "bookinguser3@gmail.com",
        phone: "+33 612334455",
        pickup: "Paris",
        drop: "Lyon",
        bookingDate: "02 Feb 2025",
        time: "11:00 AM",
        distance: "465 km",
        additional: "-",
      },
      {
        id: 4,
        user: "Booking User",
        country: "United States",
        date: "05 Feb 2025",
        email: "bookinguser4@gmail.com",
        phone: "+1 502334455",
        pickup: "Colombo",
        drop: "Kandy",
        bookingDate: "01 Feb 2025",
        time: "08:30 AM",
        distance: "122 km",
        additional: "VIP package",
      },
      {
        id: 5,
        user: "Booking User",
        country: "Italy",
        date: "03 Feb 2025",
        email: "bookinguser5@gmail.com",
        phone: "+39 602334455",
        pickup: "Rome",
        drop: "Naples",
        bookingDate: "29 Jan 2025",
        time: "07:00 PM",
        distance: "225 km",
        additional: "-",
      },
      {
        id: 6,
        user: "Booking User",
        country: "India",
        date: "03 Feb 2025",
        email: "bookinguser6@gmail.com",
        phone: "+91 9876543210",
        pickup: "Delhi",
        drop: "Agra",
        bookingDate: "30 Jan 2025",
        time: "06:45 AM",
        distance: "233 km",
        additional: "Airport pickup",
      },
    ],
  };

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    // Show modal on mobile, keep side panel on desktop
    if (window.innerWidth < 768) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const BookingDetailsContent = ({ booking }) => (
    <div className="space-y-2 text-sm">
      <p>
        <span className="font-semibold">User:</span> {booking.user}
      </p>
      <p>
        <span className="font-semibold">Email:</span>{" "}
        <a
          href={`mailto:${booking.email}`}
          className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
        >
          {booking.email}
        </a>
      </p>
      <p>
        <span className="font-semibold">Phone:</span>{" "}
        <a
          href={`tel:${booking.phone}`}
          className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
        >
          {booking.phone}
        </a>
      </p>
      <p>
        <span className="font-semibold">Country:</span> {booking.country}
      </p>
      <hr className="my-3" />
      <p>
        <span className="font-semibold">Pickup:</span> {booking.pickup}
      </p>
      <p>
        <span className="font-semibold">Drop:</span> {booking.drop}
      </p>
      <p>
        <span className="font-semibold">Date:</span> {booking.bookingDate}
      </p>
      <p>
        <span className="font-semibold">Time:</span> {booking.time}
      </p>
      <p>
        <span className="font-semibold">Distance:</span> {booking.distance}
      </p>
      <p>
        <span className="font-semibold">Additional Info:</span>{" "}
        {booking.additional}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative h-40 md:h-48 lg:h-56">
        <img
          src={adminBG}
          className="h-full w-full object-cover"
          alt="admin-bg"
        />

        {/* Profile */}
        <div className="absolute -bottom-12 md:-bottom-20 left-4 md:left-8 lg:left-15">
          <div className="flex items-end gap-3 md:gap-4">
            <div>
              <img
                src={taxiVehicle.driverImage}
                alt="driver"
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div className="mb-1 md:mb-2">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black">
                {taxiVehicle.model} {taxiVehicle.numberPlate}
              </h1>
              <h2 className="text-black/60 text-xs md:text-sm lg:text-base font-medium">
                {taxiVehicle.location}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="px-4 md:px-8 lg:px-15 py-16 md:py-20 mt-6 md:mt-10">
        <div className="flex space-x-8 md:space-x-20 lg:space-x-60 justify-center overflow-x-auto">
          <button className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-2 whitespace-nowrap">
            Bookings
          </button>
          <button
            onClick={() => navigate("/taxi-admin-dashboard")}
            className="text-gray-500 font-medium hover:text-gray-900 transition-colors pb-2 whitespace-nowrap"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/taxi-admin-account")}
            className="text-gray-500 font-medium hover:text-gray-900 transition-colors pb-2 whitespace-nowrap"
          >
            Account
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 lg:px-15 pb-20">
        {/* Left side - Bookings */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Pending */}
          <div>
            <h1 className="text-sm text-black/50 font-semibold mb-3">
              Pending
            </h1>
            <div className="space-y-3">
              {bookings.pending.map((b) => (
                <div key={b.id} className="bg-white shadow-md p-4 rounded-2xl">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          b.user
                        )}&background=e5e7eb&color=374151&size=40`}
                        alt={b.user}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm md:text-base">
                          {b.user}
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {b.country}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{b.date}</p>
                  </div>
                  <button
                    onClick={() => handleViewBooking(b)}
                    className="w-full bg-green-200 text-black px-4 py-2 text-sm rounded-xl font-medium"
                  >
                    View Booking
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <h1 className="text-sm text-black/50 font-semibold mb-3">
              History
            </h1>
            <div className="space-y-3">
              {bookings.history.map((b) => (
                <div key={b.id} className="bg-white shadow-md p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          b.user
                        )}&background=e5e7eb&color=374151&size=40`}
                        alt={b.user}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm md:text-base">
                          {b.user}
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {b.country}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{b.date}</p>
                  </div>
                  <button
                    onClick={() => handleViewBooking(b)}
                    className="w-full bg-green-200 text-black px-4 py-2 text-sm rounded-md font-medium"
                  >
                    View Booking
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Receipt (Desktop only) */}
        <div className="hidden md:block w-1/2 mt-8">
          {selectedBooking ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="font-bold text-lg mb-4">Booking Details</h2>
              <BookingDetailsContent booking={selectedBooking} />
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-10">
              Select a booking to view details
            </div>
          )}
        </div>
      </div>

      {/* Mobile Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 p-4 z-50 flex items-center md:hidden">
          <div className="bg-white w-full rounded-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Booking Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4">
              <BookingDetailsContent booking={selectedBooking} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxiAdminViewBookings;
