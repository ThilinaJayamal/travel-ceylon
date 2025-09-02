import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, MapPin, Filter, X } from "lucide-react";

import NavbarBlack from "../components/NavbarBlack";

const GuideSearchResults = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      name: "Priya Nanayakkara",
      location: "Kandy",
      rating: 4.8,
      reviews: 346,
      price: 25,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      languages: ["English", "Hindi"],
      specializations: ["History and Ancient things", "Wildlife safaris"],
      description:
        "I'm knowledgeable, patient, and deeply connected to the history and traditions of Kandy. If you're looking for someone to guide you through centuries of Sri Lankan culture with authenticity, respect, and engaging storytelling — I'd be honored to be part of your cultural exploration in Sri Lanka.",
    },
    {
      id: 2,
      name: "Dilshan Fernando",
      location: "Ella",
      rating: 4.2,
      reviews: 189,
      price: 30,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      languages: ["English", "French"],
      specializations: ["Eco-Adventure Guides"],
      description:
        "I'm energetic, safety-focused, and fully committed to showing you the natural wonders that make Ella special. If you're looking for someone to guide you through thrilling hikes with stunning views, local insights, and unforgettable experiences — I'd be honored to be part of your mountain adventure in Sri Lanka.",
    },
    {
      id: 3,
      name: "Saman Kumara",
      location: "Tissamaharama",
      rating: 4.6,
      reviews: 275,
      price: 20,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      languages: ["English", "German"],
      specializations: ["Wildlife safaris"],
      description:
        "I'm friendly, reliable, and fully committed to making sure you feel safe, informed, and inspired throughout your journey. If you're looking for someone to guide you with passion, knowledge, and a personal touch — I'd be honored to be part of your adventure in Sri Lanka.",
    },
    {
      id: 4,
      name: "Nimal Perera",
      location: "Galle",
      rating: 3.9,
      reviews: 124,
      price: 35,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      languages: ["English"],
      specializations: ["History and Ancient things"],
      description:
        "I'm detail-oriented, historically knowledgeable, and passionate about sharing the stories that shaped this beautiful coastline. If you're looking for someone to guide you through maritime history, local traditions, and stunning ocean vistas — I'd be honored to be part of your coastal discovery in Sri Lanka.",
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
      location: "Tissamaharama",
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
      location: "Hambantota",
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
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Filter content component (reusable for desktop and mobile)
  const FilterContent = () => (
    <>
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
        <div className="flex gap-2 flex-wrap">
          {ratings.map((rating) => (
            <button
              key={rating}
              onClick={() =>
                setSelectedRating(selectedRating === rating ? "" : rating)
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
                checked={selectedSpecializations.includes(specialization)}
                onChange={() => handleSpecializationChange(specialization)}
                className="mr-2 text-teal-500 focus:ring-teal-500"
              />
              <span className="text-sm">{specialization}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <NavbarBlack />
      {/* search box */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md mb-6 sm:mb-10 mt-6 sm:mt-10 p-4 sm:p-8 mx-4 sm:mx-auto">
        <label
          htmlFor="search"
          className="block mb-2 text-gray-700 font-normal"
        >
          Search your Local Guide
        </label>
        <form
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          onSubmit={handleSubmit}
        >
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
            className="bg-green-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-green-600 hover:text-white transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter and search results */}
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border w-full sm:w-auto justify-center sm:justify-start"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile filter overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowMobileFilters(false)}
              ></div>
              <div className="absolute right-0 top-0 h-full w-full sm:w-80 bg-white p-6 overflow-y-auto">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="absolute top-4 right-4 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
                <FilterContent />
              </div>
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 bg-white rounded-lg p-6 h-fit sticky top-6">
              <FilterContent />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-base sm:text-lg">
                      {searchLocation || "All Locations"}
                    </span>
                  </div>
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
                      className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <img
                          src={guide.image}
                          alt={guide.name}
                          className="w-16 h-16 rounded-full object-cover bg-gray-200 mx-auto sm:mx-0"
                        />

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                            <div className="text-center sm:text-left w-full sm:w-auto">
                              <h3 className="font-semibold text-lg">
                                {guide.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {guide.location}
                              </p>
                            </div>
                            <div className="text-center sm:text-right w-full sm:w-auto">
                              <p className="text-sm text-gray-500">
                                starting from
                              </p>
                              <p className="text-xl sm:text-2xl font-semibold text-teal-600">
                                ${guide.price}
                                <span className="text-sm text-gray-500">
                                  /person
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                            <div className="flex">
                              {renderStars(guide.rating)}
                            </div>
                            <span className="font-medium text-sm sm:text-base">
                              {guide.rating}
                            </span>
                            <span className="text-gray-500 text-xs sm:text-sm">
                              ({guide.reviews} client reviews)
                            </span>
                          </div>

                          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                            {guide.description}
                          </p>

                          <div className="text-center sm:text-left">
                            <Link to={`/guide/${guide.id}`}>
                              <button className="bg-green-300 hover:bg-green-600 hover:text-white text-black px-6 py-2 rounded font-medium transition-colors w-full sm:w-auto">
                                Contact Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
                    <p className="text-gray-500 text-base sm:text-lg">
                      No guides found matching your criteria.
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                )}

                {/* Show More Button */}
                {filteredGuides.length > 0 && (
                  <div className="text-center pt-4 mb-10">
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
