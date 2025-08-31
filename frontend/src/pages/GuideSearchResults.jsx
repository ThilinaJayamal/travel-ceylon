import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, MapPin } from "lucide-react";

import NavbarBlack from "../components/NavbarBlack";

const GuideSearchResults = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/guides/search?q=${encodeURIComponent(query)}`);
  };

  const [searchLocation, setSearchLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  // Get search term from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("q");
    if (queryParam) {
      setSearchLocation(
        queryParam.charAt(0).toUpperCase() + queryParam.slice(1)
      );
      setQuery(queryParam); // Set the search input to show current search
    }
  }, []);

  const allGuides = [
    {
      id: 1,
      name: "Rajesh Perera",
      location: "Tissamaharama",
      rating: 4.8,
      reviews: 346,
      price: 25,
      image: "/api/placeholder/60/60",
      languages: ["English", "Hindi"],
      specializations: ["History and Ancient things", "Wildlife safaris"],
      description:
        "Hi I'm a passionate local tour guide with years of experience showing travelers the hidden gems of Sri Lanka. I speak English and Sinhala fluently, and I love sharing stories, culture, and unforgettable adventures. Let me help make your journey truly special!",
    },
    {
      id: 2,
      name: "Priya Fernando",
      location: "Tissamaharama District",
      rating: 4.2,
      reviews: 189,
      price: 18,
      image: "/api/placeholder/60/60",
      languages: ["English", "French"],
      specializations: ["Eco-Adventure Guides"],
      description:
        "Hi I'm a passionate local tour guide with years of experience showing travelers the hidden gems of Sri Lanka. I speak English and Sinhala fluently, and I love sharing stories, culture, and unforgettable adventures. Let me help make your journey truly special!",
    },
    {
      id: 3,
      name: "Kumar Silva",
      location: "Yala National Park, Tissamaharama",
      rating: 4.6,
      reviews: 275,
      price: 22,
      image: "/api/placeholder/60/60",
      languages: ["English", "German"],
      specializations: ["Wildlife safaris"],
      description:
        "Hi I'm a passionate local tour guide with years of experience showing travelers the hidden gems of Sri Lanka. I speak English and Sinhala fluently, and I love sharing stories, culture, and unforgettable adventures. Let me help make your journey truly special!",
    },
    {
      id: 4,
      name: "Anura Jayasinghe",
      location: "Colombo",
      rating: 3.9,
      reviews: 124,
      price: 15,
      image: "/api/placeholder/60/60",
      languages: ["English"],
      specializations: ["History and Ancient things"],
      description:
        "Hi I'm a passionate local tour guide with years of experience showing travelers the hidden gems of Sri Lanka. I speak English and Sinhala fluently, and I love sharing stories, culture, and unforgettable adventures. Let me help make your journey truly special!",
    },
    {
      id: 5,
      name: "Saman Bandara",
      location: "Kandy",
      rating: 4.4,
      reviews: 298,
      price: 30,
      image: "/api/placeholder/60/60",
      languages: ["English", "French", "German"],
      specializations: [
        "History and Ancient things",
        "Wildlife safaris",
        "Eco-Adventure Guides",
      ],
      description:
        "Hi I'm a passionate local tour guide with years of experience showing travelers the hidden gems of Sri Lanka. I speak English and Sinhala fluently, and I love sharing stories, culture, and unforgettable adventures. Let me help make your journey truly special!",
    },
    {
      id: 6,
      name: "Nimal Rathnayake",
      location: "Near Tissamaharama",
      rating: 3.7,
      reviews: 89,
      price: 12,
      image: "/api/placeholder/60/60",
      languages: ["English", "Hindi"],
      specializations: ["Eco-Adventure Guides"],
      description:
        "Hi I'm a passionate local tour guide with years of experience showing travelers the hidden gems of Sri Lanka. I speak English and Sinhala fluently, and I love sharing stories, culture, and unforgettable adventures. Let me help make your journey truly special!",
    },
    {
      id: 7,
      name: "Chaminda Wijesinghe",
      location: "Hambantota District",
      rating: 4.1,
      reviews: 156,
      price: 20,
      image: "/api/placeholder/60/60",
      languages: ["English", "German"],
      specializations: ["Wildlife safaris", "Eco-Adventure Guides"],
      description:
        "Hi I'm a passionate local tour guide with years of experience showing travelers the hidden gems of Sri Lanka. I speak English and Sinhala fluently, and I love sharing stories, culture, and unforgettable adventures. Let me help make your journey truly special!",
    },
  ];

  // Filter guides based on search location and other criteria with similar location matching
  const filteredGuides = allGuides.filter((guide) => {
    // Location filter - show guides from locations similar to search term
    if (searchLocation) {
      const searchTerm = searchLocation.toLowerCase();
      const guideLocation = guide.location.toLowerCase();

      // Check if guide location contains the search term or search term contains guide location
      const isLocationMatch =
        guideLocation.includes(searchTerm) ||
        searchTerm.includes(guideLocation) ||
        guideLocation === searchTerm;

      if (!isLocationMatch) {
        return false;
      }
    }

    // Price filter
    if (minPrice && guide.price < parseInt(minPrice)) return false;
    if (maxPrice && guide.price > parseInt(maxPrice)) return false;

    // Rating filter
    if (selectedRating && guide.rating < selectedRating) return false;

    // Language filter
    if (selectedLanguages.length > 0) {
      const hasSelectedLanguage = selectedLanguages.some((lang) =>
        guide.languages.includes(lang)
      );
      if (!hasSelectedLanguage) return false;
    }

    // Specialization filter
    if (selectedSpecializations.length > 0) {
      const hasSelectedSpecialization = selectedSpecializations.some((spec) =>
        guide.specializations.includes(spec)
      );
      if (!hasSelectedSpecialization) return false;
    }

    return true;
  });

  const languages = ["English", "French", "German", "Hindi"];
  const specializations = [
    "History and Ancient things",
    "Wildlife safaris",
    "Eco-Adventure Guides",
  ];
  const ratings = [1, 2, 3, 4, 5];

  const handleLanguageChange = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const handleSpecializationChange = (specialization) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization)
        ? prev.filter((s) => s !== specialization)
        : [...prev, specialization]
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <NavbarBlack />
      {/* search box */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md mb-10 mt-10 p-8">
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
            className="bg-green-300 text-black font-semibold px-6 rounded-md hover:bg-green-600 hover:text-white transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter and search results */}
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-80 bg-white rounded-lg p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price</h3>
                <div className="flex gap-2">
                  <select
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Min</option>
                    <option value="10">$10</option>
                    <option value="15">$15</option>
                    <option value="20">$20</option>
                    <option value="25">$25</option>
                  </select>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Max</option>
                    <option value="20">$20</option>
                    <option value="30">$30</option>
                    <option value="40">$40</option>
                    <option value="50">$50</option>
                  </select>
                </div>
              </div>

              {/* Ratings Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Ratings</h3>
                <div className="flex gap-2">
                  {ratings.map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setSelectedRating(
                          selectedRating === rating ? "" : rating
                        )
                      }
                      className={`px-3 py-1 border rounded ${
                        selectedRating === rating
                          ? "bg-teal-500 text-white border-teal-500"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Language</h3>
                <div className="space-y-2">
                  {languages.map((language) => (
                    <label key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                        className="mr-2 text-teal-500 focus:ring-teal-500"
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specialization Filter */}
              <div>
                <h3 className="font-medium mb-3">Specialization</h3>
                <div className="space-y-2">
                  {specializations.map((specialization) => (
                    <label key={specialization} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSpecializations.includes(
                          specialization
                        )}
                        onChange={() =>
                          handleSpecializationChange(specialization)
                        }
                        className="mr-2 text-teal-500 focus:ring-teal-500"
                      />
                      <span className="text-sm">{specialization}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">
                    {searchLocation || "All Locations"}
                  </span>
                  <span className="text-sm">
                    {filteredGuides.length} Local guides found
                  </span>
                </div>
              </div>

              {/* Guide Cards */}
              <div className="space-y-4">
                {filteredGuides.length > 0 ? (
                  filteredGuides.map((guide) => (
                    <div
                      key={guide.id}
                      className="bg-white rounded-lg p-6 shadow-sm border"
                    >
                      <div className="flex gap-4">
                        <img
                          src={guide.image}
                          alt={guide.name}
                          className="w-16 h-16 rounded-full object-cover bg-gray-200"
                        />

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {guide.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {guide.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                starting from
                              </p>
                              <p className="text-2xl font-semibold text-teal-600">
                                ${guide.price}
                                <span className="text-sm text-gray-500">
                                  /person
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                              {renderStars(guide.rating)}
                            </div>
                            <span className="font-medium">{guide.rating}</span>
                            <span className="text-gray-500 text-sm">
                              ({guide.reviews} client reviews)
                            </span>
                          </div>

                          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                            {guide.description}
                          </p>

                          <button className="bg-green-300 hover:bg-green-600 hover:text-white text-black px-6 py-2 rounded font-medium transition-colors">
                            Contact Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      No guides found matching your criteria.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                )}

                {/* Show More Button */}
                {filteredGuides.length > 0 && (
                  <div className="text-center pt-4">
                    <button className="w-full bg-green-300 hover:bg-green-600 hover:text-white py-3 rounded font-medium transition-colors">
                      Show more
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideSearchResults;
