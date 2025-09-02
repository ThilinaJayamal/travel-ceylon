function formatDate(dateStr) {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export const converDataForBill = (data) => {
    try {
        const guideBooked = data?.bookings.guide || [];
        const taxiBooked = data?.bookings.taxi || [];
        const staysBooked = data?.bookings.stays || [];
        const rentBooked = data?.bookings.rent || [];

        // Taxi
        const formatedTaxi = taxiBooked?.map((t) => ({
            id: t._id,
            image: t?.serviceId.profilePic,
            title: t?.serviceId.vehicleNo + " " + t?.serviceId.vehicleType,
            subtitle: t?.serviceId.driverName,
            totalAmount: "LKR." + (t?.amount.toFixed(2)),
            location: t?.serviceId.location,
            date: "2 Mar 2025",
            sections: [
                {
                    heading: "Journey Details",
                    items: [
                        { label: "Pickup", value: t?.pickup },
                        { label: "Drop", value: t?.dropup },
                        { label: "Distance", value: t?.distance + " km" },
                        { label: "Date", value: formatDate(t?.date) },
                        { label: "Time", value: t?.time }
                    ]
                },
                {
                    heading: "Payment Details",
                    items: [
                        { label: "Base Fare", value: t?.amount.toFixed(2) },
                        {
                            label: "Distance Charge (per km)",
                            value: "LKR." + (t?.serviceId.perKm.toFixed(2))
                        },
                        { label: "Tax", value: "LKR 0.00" }
                    ]
                }
            ]
        }));

        // Guide
        const formatedGuide = guideBooked?.map((g) => ({
            id: g._id,
            title: g?.serviceId.name,
            image: g?.serviceId.profilePic,
            subtitle: g?.serviceId.city,
            totalAmount: "LKR." + (g?.serviceId.price.toFixed(2)),
            location: g?.serviceId.city,
            date: "2 Mar 2025",
            sections: [
                {
                    heading: "Guide Details",
                    items: [
                        { label: "Date", value: formatDate(g?.date) },
                        { label: "Time", value: g?.time },
                        { label: "Location", value: g?.serviceId.city }
                    ]
                },
                {
                    heading: "Payment Details",
                    items: [
                        { label: "Base Fare", value: g?.serviceId.price.toFixed(2) },
                        { label: "Tax", value: "LKR 0.00" }
                    ]
                }
            ]
        }));

        // Rent
        const formatedRent = rentBooked?.map((r) => ({
            id: r._id,
            title: r?.serviceId.vehicleNo + " " + r?.serviceId.vehicleType,
            image: r?.serviceId.images?.[0],
            subtitle: r?.area,
            totalAmount: "LKR." + (r?.serviceId.perDay.toFixed(2)),
            location: r?.area,
            date: "2 Mar 2025",
            sections: [
                {
                    heading: "Rental Details",
                    items: [
                        { label: "Pickup Date", value: formatDate(r?.pickup) },
                        { label: "Return Date", value: formatDate(r?.return) },
                        { label: "Area", value: r?.area }
                    ]
                },
                {
                    heading: "Payment Details",
                    items: [
                        { label: "Per Day", value: "LKR." + r?.serviceId.perDay.toFixed(2) },
                        { label: "Tax", value: "LKR 0.00" }
                    ]
                }
            ]
        }));

        // Stays
        const formatedStays = staysBooked?.map((s) => ({
            id: s._id,
            title: s?.serviceId.name,
            image: s?.serviceId.profilePic,
            subtitle: s?.serviceId.location,
            totalAmount: "LKR." + (s?.roomId.price.toFixed(2)),
            location: s?.serviceId.location,
            date: "2 Mar 2025",
            sections: [
                {
                    heading: "Stay Details",
                    items: [
                        { label: "Room Type", value: s?.roomId.roomType },
                        { label: "Start Date", value: formatDate(s?.start_date) },
                        { label: "End Date", value: formatDate(s?.end_date) },
                        { label: "Guests", value: s?.roomId.maxGuest }
                    ]
                },
                {
                    heading: "Payment Details",
                    items: [
                        { label: "Price per Night", value: "LKR." + s?.roomId.price.toFixed(2) },
                        { label: "Tax", value: "LKR 0.00" }
                    ]
                }
            ]
        }));

        return [
            ...formatedGuide,
            ...formatedTaxi,
            ...formatedRent,
            ...formatedStays
        ];
    } catch (error) {
        console.log(error?.message);
    }
};
