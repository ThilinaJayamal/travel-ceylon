import React from 'react'

function Temp() {
    return (
        <div>
            {/* Home & Login */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            

            {/* Taxi routes */}
            <Route path="/taxi" element={<Taxi />} />
            <Route path="/taxi-bookings" element={<TaxiBookings />} />
            <Route path="/specific-taxi" element={<SpecificTaxi />} />
            <Route path="/view-renting-vehicle" element={<RentedVehicleDetails />} />

            {/* Registration routes */}
            <Route path="/registration" element={<Registration />} />
            <Route path="/registration/hotel" element={<HotelRegistration />} />
            <Route path="/registration/taxi" element={<TaxiRegistration />} />
            <Route path="/registration/guide" element={<GuideRegistration />} />

            <Route path="/taxi-admin-bookings" element={<TaxiAdminViewBookings />} />
            <Route path="/taxi-admin-dashboard" element={<TaxiAdminViewDashboard />} />
            <Route path="/taxi-admin-account" element={<TaxiAdminViewAccount />} />

            <Route path="/stays-admin" element={<StaysAdmin />} />

            <Route path="/rent-taxi" element={<RentTaxi />} />

            {/* User & stays */}



            <Route path="/stays" element={<Stays />} />
            <Route path="/stays/specific-hotel" element={<SpecificHotel />} />
            <Route path="/stays/payment" element={<HotelPayment />} />
            <Route path="/stays/filter" element={<StaysFilter />} />



            {/* Guide routes */}
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/search" element={<GuideSearchResults />} />
            <Route path="/guide/:id" element={<Guide />} />
        </div>
    )
}

export default Temp