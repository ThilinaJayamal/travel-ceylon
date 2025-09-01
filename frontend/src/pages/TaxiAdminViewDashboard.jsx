import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sarah from "../assets/Taxi/sarah.png";
import adminBG from "../assets/Taxi/adminBG.webp";
import { Camera } from "lucide-react";

const TaxiAdminViewDashboard = () => {
  const navigate = useNavigate();

  // Mock data with editable fields
  const [vehicleData, setVehicleData] = useState({
    numberPlate: "CAX-0696",
    model: "Toyota Vitz",
    driverImage: sarah,
    location: "Tissamaharama",
    vehicleImages: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
      "https://images.unsplash.com/photo-1494976107521-84c46bb12dd2?w=400",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400",
    ],
    description:
      "With seating for 3 passengers plus the driver, it offers a cozy yet spacious ride, perfect for small families, solo travelers, or quick group trips. The car features air conditioning to keep you cool on warm days and a well-maintained interior for a pleasant journey. Its compact size makes it agile in traffic, while the efficient engine ensures a smooth and economical ride.",
    driverBio:
      "Hello, I'm SampletaxiDriver! I have extensive experience as a professional driver, ensuring safe and comfortable rides for my passengers. With years of driving in and around Tissamaharama, I know the best routes to get you to your destination efficiently. My goal is to provide a friendly and reliable service while making your journey enjoyable. Looking forward to driving you safely!",
  });

  const [editMode, setEditMode] = useState(null);
  const [tempData, setTempData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (field) => {
    setEditMode(field);
    setTempData({ [field]: vehicleData[field] });
    if (window.innerWidth < 768) {
      setShowModal(true);
    }
  };

  const handleSave = () => {
    setVehicleData({ ...vehicleData, ...tempData });
    setEditMode(null);
    setShowModal(false);
    setTempData({});
  };

  const handleCancel = () => {
    setEditMode(null);
    setShowModal(false);
    setTempData({});
  };

  const handleImageChange = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedImages = [...tempData.vehicleImages];
        updatedImages[index] = e.target.result;
        setTempData({ ...tempData, vehicleImages: updatedImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const EditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:hidden">
      <div className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">
              Edit{" "}
              {editMode === "vehicleImages"
                ? "Vehicle Images"
                : editMode === "description"
                ? "Description"
                : "Driver Bio"}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4">
          {editMode === "vehicleImages" && (
            <div className="space-y-4">
              {tempData.vehicleImages?.map((img, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <label className="block text-sm font-medium mb-2">
                    Image {index + 1}:
                  </label>
                  <div className="space-y-3">
                    <img
                      src={img}
                      alt={`Vehicle ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {editMode === "description" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Vehicle Description:
              </label>
              <textarea
                value={tempData.description || ""}
                onChange={(e) =>
                  setTempData({ ...tempData, description: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                rows="6"
                placeholder="Enter vehicle description"
              />
            </div>
          )}
          {editMode === "driverBio" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Driver Bio:
              </label>
              <textarea
                value={tempData.driverBio || ""}
                onChange={(e) =>
                  setTempData({ ...tempData, driverBio: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                rows="6"
                placeholder="Enter driver bio"
              />
            </div>
          )}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-green-200 text-black px-4 py-2 rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
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
                src={vehicleData.driverImage}
                alt="driver"
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <div className="mb-1 md:mb-2">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black">
                {vehicleData.model} {vehicleData.numberPlate}
              </h1>
              <h2 className="text-black/60 text-xs md:text-sm lg:text-base font-medium">
                {vehicleData.location}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="px-4 md:px-8 lg:px-15 py-16 md:py-20 mt-6 md:mt-10">
        <div className="flex space-x-8 md:space-x-20 lg:space-x-60 justify-center overflow-x-auto">
          <button
            onClick={() => navigate("/taxi-admin-bookings")}
            className="text-gray-500 font-medium hover:text-gray-900 transition-colors pb-2 whitespace-nowrap"
          >
            Bookings
          </button>
          <button className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-2 whitespace-nowrap">
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

      {/* Dashboard Content */}
      <div className="px-4 md:px-8 lg:px-15 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Vehicle Images */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-black/70 text-base">
                  Vehicle Images
                </h2>
                <button
                  onClick={() => handleEdit("vehicleImages")}
                  className="bg-green-200 text-black px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-300 transition-colors"
                >
                  Edit Images
                </button>
              </div>

              {/* Desktop Edit Mode */}
              {editMode === "vehicleImages" && window.innerWidth >= 768 ? (
                <div className="space-y-4">
                  {tempData.vehicleImages?.map((img, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <label className="block text-sm font-medium mb-2">
                        Image {index + 1}:
                      </label>
                      <div className="flex gap-4 items-start">
                        <img
                          src={img}
                          alt={`Vehicle ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border flex-shrink-0"
                        />
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(index, e.target.files[0])
                            }
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Choose a new image to replace the current one
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-200 text-black px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicleData.vehicleImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Vehicle ${index + 1}`}
                        className="w-full h-24 md:h-32 object-cover rounded-lg"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Description & Bio */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Description Section */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-black/70 text-base">
                  Vehicle Description
                </h2>
                <button
                  onClick={() => handleEdit("description")}
                  className="bg-green-200 text-black px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-300 transition-colors"
                >
                  Edit
                </button>
              </div>

              {/* Desktop Edit Mode */}
              {editMode === "description" && window.innerWidth >= 768 ? (
                <div>
                  <textarea
                    value={tempData.description || ""}
                    onChange={(e) =>
                      setTempData({ ...tempData, description: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    rows="6"
                    placeholder="Enter vehicle description"
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-200 text-black px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {vehicleData.description}
                </p>
              )}
            </div>

            {/* Driver Bio Section */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-black/70 text-base">
                  About the Driver
                </h2>
                <button
                  onClick={() => handleEdit("driverBio")}
                  className="bg-green-200 text-black px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-300 transition-colors"
                >
                  Edit Bio
                </button>
              </div>

              {/* Desktop Edit Mode */}
              {editMode === "driverBio" && window.innerWidth >= 768 ? (
                <div>
                  <textarea
                    value={tempData.driverBio || ""}
                    onChange={(e) =>
                      setTempData({ ...tempData, driverBio: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    rows="6"
                    placeholder="Enter driver bio"
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-200 text-black px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {vehicleData.driverBio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Edit Modal */}
      {showModal && <EditModal />}
    </div>
  );
};

export default TaxiAdminViewDashboard;
