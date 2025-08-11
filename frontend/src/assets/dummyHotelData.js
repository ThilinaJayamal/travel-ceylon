import hotelImage from "./HotelImageThissa.png";
import reviewUser1 from "./user1.jpg";
import reviewUser2 from "./user2.jpg";
import reviewUser3 from "./user3.jpg";

export const hotelData = {
  name: "Cinnamon Wild Yala",
  location: "Tissamaharama",
  address: "122/1 Matara Road, Debarawewa, Tissamaharama",
  pricePerNight: 25,
  image: hotelImage,
  description: [
    "Nestled on the fringes of Yala National Park...",
    "Located between the wild jungles of Yala and...",
  ],
  reviews: [
    { name: "Sofia", country: "Germany", image: reviewUser1, rating: 4, text: "Really appreciate the help..." },
    { name: "Zara", country: "United Kingdom", image: reviewUser2, rating: 4, text: "Really appreciate the help..." },
    { name: "Jean-Luc", country: "Germany", image: reviewUser3, rating: 4, text: "Really appreciate the help..." },
  ],
  surroundings: {
    attractions: [
      { name: "Tissamaharama Raja Maha Vihare", distance: "02 km" },
      { name: "Yatala Raja Maha Vihara", distance: "04 km" },
    ],
    nature: [
      { name: "Yala National Park", distance: "25 km" },
      { name: "Bundala Bird Sanctuary", distance: "15 km" },
    ],
    access: [
      { name: "Tissamaharama Bus stand", distance: "02 km" },
      { name: "Southern Express way", distance: "18 km" },
    ]
  },
  facilities: [
    { icon: "🍳", title: "Breakfast", desc: "Everyday good Breakfast" },
    { icon: "🏊", title: "Swimming pool", desc: "Outdoor swimming pool" },
    { icon: "🚐", title: "Shuttle", desc: "Airport shuttle service" },
    { icon: "🅿️", title: "Parking", desc: "Free parking area" },
    { icon: "📶", title: "Free Wifi", desc: "24/7 free Wifi" }
  ],
  rooms: [
    { type: "Standard Double Room", price: 25, maxGuest: 2, bed: "1 King Bed" },
    { type: "Standard Twin Room", price: 30, maxGuest: 4, bed: "2 Twin Bed" },
    { type: "Standard Triple Room", price: 38, maxGuest: 5, bed: "2 Queen Bed" }
  ]
};
