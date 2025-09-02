import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bed, Minus, Plus, Upload } from "lucide-react";
import Progressbar from "../../components/progressbar.jsx";

function HotelRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // All form data in one state object
  const [formData, setFormData] = useState({
    // Step 1
    hotelName: "",
    location: "",
    // Step 2
    number1: "",
    number2: "",
    email: "",
    websiteLink: "",
    // Step 3
    facilities: {
      breakfast: false,
      roomService: false,
      bar: false,
      frontDesk24h: false,
      airportShuttle: false,
      airportShuttleAlt: false,
      fitnessCenter: false,
      garden: false,
      parking: false,
      nonSmokingRooms: false,
      familyRooms: false,
      freeWifi: false,
      airConditioning: false,
      spa: false,
      swimmingPool: false,
      waterPark: false,
      beach: false,
    },
    // Step 4
    roomType: "Double",
    roomCount: 1,
    guestCount: 1,
    bedCounts: {
      "Twin bed(s)": 1,
      "Full bed(s)": 1,
      "Queen bed(s)": 1,
      "King bed(s)": 1,
    },
    // Step 5
    photos: [],
    // Step 6
    description: "",
    agreedToTerms: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility],
      },
    }));
  };

  const handleBedChange = (type, change) => {
    setFormData((prev) => ({
      ...prev,
      bedCounts: {
        ...prev.bedCounts,
        [type]: Math.max(prev.bedCounts[type] + change, 0),
      },
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 50 * 1024 * 1024
    );
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...validFiles].slice(0, 10),
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/registration");
    }
  };

  const handleFinish = async () => {
    // Prepare facilities array from object
    const selectedFacilities = Object.entries(formData.facilities)
      .filter(([, value]) => value)
      .map(([key]) => key);

    // Prepare rooms array
    const rooms = [
      {
        type: formData.roomType,
        count: formData.roomCount,
        maxGuest: formData.guestCount,
        beds: formData.bedCounts,
      },
    ];

    // Prepare images (if uploading to backend, use FormData)
    const formPayload = new FormData();
    formPayload.append("name", formData.hotelName);
    formPayload.append("location", formData.location);
    formPayload.append("contact", `${formData.number1},${formData.number2}`);
    formPayload.append("website", formData.websiteLink || "");
    formPayload.append("description", formData.description);

    selectedFacilities.forEach((fac) =>
      formPayload.append("facilities[]", fac)
    );
    formPayload.append("rooms", JSON.stringify(rooms));

    formData.photos.forEach((file) => {
      formPayload.append("images", file);
    });

    formPayload.append("profilePic", formData.photos[0]);

    try {
      const res = await fetch("http://localhost:5000/api/service/stays", {
        method: "POST",
        body: formPayload,
        credentials: "include", // if using cookies for auth
      });
      const data = await res.json();
      if (res.ok) {
        alert("Hotel registered successfully!");
        navigate("/stays/admin");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Network error");
      console.log(err);
    }
  };
  // Bed types data
  const bedTypes = [
    {
      name: "Twin bed(s)",
      size: "35–51 inches wide",
      icon: <Bed className="w-8 h-8" />,
    },
    {
      name: "Full bed(s)",
      size: "52–59 inches wide",
      icon: <Bed className="w-8 h-8" />,
    },
    {
      name: "Queen bed(s)",
      size: "60–70 inches wide",
      icon: <Bed className="w-8 h-8" />,
    },
    {
      name: "King bed(s)",
      size: "71–81 inches wide",
      icon: <Bed className="w-8 h-8" />,
    },
  ];

  // Facilities data
  const facilityList = [
    { key: "breakfast", label: "Breakfast" },
    { key: "roomService", label: "Room service" },
    { key: "bar", label: "Bar" },
    { key: "frontDesk24h", label: "24-hour front desk" },
    { key: "airportShuttle", label: "Airport Shuttle (Standard)" },
    { key: "airportShuttleAlt", label: "Airport Shuttle (Premium)" },
    { key: "fitnessCenter", label: "Fitness Center" },
    { key: "garden", label: "Garden" },
    { key: "parking", label: "Parking" },
    { key: "nonSmokingRooms", label: "Non-Smoking Rooms" },
    { key: "familyRooms", label: "Family Rooms" },
    { key: "freeWifi", label: "Free WiFi" },
    { key: "airConditioning", label: "Air Conditioning" },
    { key: "spa", label: "Spa" },
    { key: "swimmingPool", label: "Swimming Pool" },
    { key: "waterPark", label: "Water Park" },
    { key: "beach", label: "Beach" },
  ];

  const leftFacilities = facilityList.slice(0, 9);
  const rightFacilities = facilityList.slice(9);

  // Render different steps based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-[10px] max-w-[600px] m-[10px]">
            <p className="text-sm text-left mb-3 text-[#212121]">
              What is your hotel Name?
            </p>
            <div className="relative w-full mb-5">
              <label className="absolute top-[-8px] left-[14px] bg-white px-[6px] text-xs text-[#333] z-[1]">
                Add hotel name
              </label>
              <input
                type="text"
                required
                className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent z-0"
                value={formData.hotelName}
                onChange={(e) => handleInputChange("hotelName", e.target.value)}
              />
            </div>

            <p className="text-sm text-left mb-3 text-[#212121]">
              Set your location
            </p>
            <div className="relative w-full mb-5">
              <label className="absolute top-[-8px] left-[14px] bg-white px-[6px] text-xs text-[#333] z-[1]">
                Add location
              </label>
              <input
                type="text"
                required
                className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent z-0"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="flex justify-center w-full mt-5 pt-5">
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] mr-[30px] hover:opacity-70"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] hover:opacity-70"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-[10px] max-w-[600px] m-[10px]">
            <div>
              <p className="text-sm text-left mb-3 text-[#212121]">
                Add your contact numbers
              </p>
              <div className="flex justify-between gap-5 w-full">
                <div className="flex-1 relative">
                  <label className="absolute top-[-8px] left-[14px] bg-white px-[6px] text-xs text-[#333] z-[1]">
                    Number 1
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent z-0"
                    value={formData.number1}
                    onChange={(e) =>
                      handleInputChange("number1", e.target.value)
                    }
                  />
                </div>
                <div className="flex-1 relative">
                  <label className="absolute top-[-8px] left-[14px] bg-white px-[6px] text-xs text-[#333] z-[1]">
                    Number 2
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent z-0"
                    value={formData.number2}
                    onChange={(e) =>
                      handleInputChange("number2", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-left mb-3 mt-4 text-[#212121]">
                Add your email
              </p>
              <div className="relative w-full mb-5">
                <label className="absolute top-[-8px] left-[14px] bg-white px-[6px] text-xs text-[#333] z-[1]">
                  Email
                </label>
                <input
                  type="text"
                  required
                  className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent z-0"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-left mb-3 text-[#212121]">
                Add your Website link
              </p>
              <div className="relative w-full mb-5">
                <label className="absolute top-[-8px] left-[14px] bg-white px-[6px] text-xs text-[#333] z-[1]">
                  Website-link
                </label>
                <input
                  type="text"
                  required
                  className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent z-0"
                  value={formData.websiteLink}
                  onChange={(e) =>
                    handleInputChange("websiteLink", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex justify-center w-full mt-5 pt-5">
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] mr-[30px] hover:opacity-70"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] hover:opacity-70"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-[10px] max-w-[600px] m-[10px]">
            <div className="mb-5 text-center">
              <p className="text-sm text-left mb-3 text-[#212121]">
                What are the Facilities?
              </p>
            </div>
            <div className="flex justify-center gap-10 mx-auto w-full max-w-[500px] mb-[30px]">
              <div className="flex flex-col gap-[15px] items-start">
                {leftFacilities.map((facility) => (
                  <label
                    key={facility.key}
                    className="flex items-center text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.facilities[facility.key]}
                      onChange={() => handleFacilityChange(facility.key)}
                    />
                    <span
                      className="w-4 h-4 border-[1.5px] border-[#ccc] rounded mr-[10px] relative transition-[background-color,border-color] duration-300 checked:bg-[#8DD3BB] checked:border-[#8DD3BB] after:content-[''] after:absolute after:left-1 after:top-[1px] after:w-1 after:h-2 after:border-solid after:border-white after:border-r-2 after:border-b-2 after:transform after:rotate-45 after:opacity-0"
                      style={
                        formData.facilities[facility.key]
                          ? {
                              backgroundColor: "#8DD3BB",
                              borderColor: "#8DD3BB",
                            }
                          : {}
                      }
                    >
                      {formData.facilities[facility.key] && (
                        <span className="absolute left-1 top-[1px] w-1 h-2 border-solid border-white border-r-2 border-b-2 transform rotate-45"></span>
                      )}
                    </span>
                    <span className="text-xs">{facility.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col gap-[15px] items-start">
                {rightFacilities.map((facility) => (
                  <label
                    key={facility.key}
                    className="flex items-center text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.facilities[facility.key]}
                      onChange={() => handleFacilityChange(facility.key)}
                    />
                    <span
                      className="w-4 h-4 border-[1.5px] border-[#ccc] rounded mr-[10px] relative transition-[background-color,border-color] duration-300"
                      style={
                        formData.facilities[facility.key]
                          ? {
                              backgroundColor: "#8DD3BB",
                              borderColor: "#8DD3BB",
                            }
                          : {}
                      }
                    >
                      {formData.facilities[facility.key] && (
                        <span className="absolute left-1 top-[1px] w-1 h-2 border-solid border-white border-r-2 border-b-2 transform rotate-45"></span>
                      )}
                    </span>
                    <span className="text-xs">{facility.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center w-full mt-5 pt-5">
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] mr-[30px] hover:opacity-70"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] hover:opacity-70"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-[10px] max-w-[600px] m-[10px]">
            <p className="text-sm text-left mb-3 text-[#212121]">
              What type of Room?
            </p>
            <select
              className="h-[45px] rounded-[5px] border border-[#e0e0e0] text-sm mb-[30px] outline-none bg-white text-left p-[10px]"
              value={formData.roomType}
              onChange={(e) => handleInputChange("roomType", e.target.value)}
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              <option value="Deluxe">Deluxe</option>
            </select>

            <p className="text-sm text-left mb-3 text-[#212121]">
              How many rooms of this type do you have?
            </p>
            <div className="w-[150px] mb-[30px]">
              <input
                type="number"
                className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent appearance-none"
                min="1"
                value={formData.roomCount}
                onChange={(e) =>
                  handleInputChange("roomCount", Number(e.target.value))
                }
              />
            </div>

            <p className="text-sm text-left mb-3 text-[#212121]">
              What are the available Beds in this room?
            </p>
            <div className="flex flex-col gap-[15px] mb-[30px]">
              {bedTypes.map((bed) => (
                <div
                  className="flex justify-between items-center"
                  key={bed.name}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-100 rounded-lg">
                      {bed.icon}
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="font-medium text-sm text-[#212121]">
                        {bed.name}
                      </span>
                      <span className="text-xs text-[#757575]">{bed.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center border border-[#e0e0e0] rounded-[6px] h-10 px-1 bg-white">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-none border-none cursor-pointer p-0 m-0"
                      onClick={() => handleBedChange(bed.name, -1)}
                    >
                      <Minus className="w-[14px] h-[14px]" />
                    </button>
                    <p className="w-[30px] text-center text-base font-medium m-0">
                      {formData.bedCounts[bed.name]}
                    </p>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-none border-none cursor-pointer p-0 m-0"
                      onClick={() => handleBedChange(bed.name, 1)}
                    >
                      <Plus className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-left mb-3 text-[#212121]">
              How many guests can stay in this room?
            </p>
            <div className="w-[150px] mb-[30px]">
              <input
                type="number"
                className="w-full py-[14px] px-3 text-sm border border-[#ddd] rounded-[5px] outline-none bg-transparent appearance-none"
                min="1"
                value={formData.guestCount}
                onChange={(e) =>
                  handleInputChange("guestCount", Number(e.target.value))
                }
              />
            </div>

            <div className="flex justify-center w-full mt-5 pt-5">
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] mr-[30px] hover:opacity-70"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] hover:opacity-70"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-[10px] max-w-[600px] m-[10px]">
            <p className="text-sm text-left mb-3 text-[#212121]">
              Upload at least 5 Photos of your Hotel & Rooms
            </p>
            <div className="border border-[#ddd] p-[30px] rounded-[5px] mt-[14px] mb-5 flex flex-col items-center justify-center cursor-pointer">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center w-full cursor-pointer"
              >
                <Upload className="w-[70px] h-[70px] mb-[10px] opacity-70 text-gray-500" />
                <p className="text-sm text-center mb-[5px] mt-[10px]">
                  Drag and Drop or upload
                </p>
                <p className="text-[10px] text-center text-[#757575] mt-0">
                  JPG/JPEG or PNG maximum size 50MB each.
                </p>
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/png, image/jpeg"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-[15px] mt-5 mb-[30px]">
                {formData.photos.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square rounded-[5px] overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-[-15px] right-[15px] w-6 h-6 rounded-full bg-white/80 border-none text-[#212121] text-lg flex items-center justify-center cursor-pointer p-0 leading-none mt-0"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center w-full mt-5 pt-5">
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] mr-[30px] hover:opacity-70"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] hover:opacity-70"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-[10px] max-w-[600px] m-[10px]">
            <p className="text-sm text-left mb-3 text-[#212121]">
              Add a brief description about your hotel
            </p>
            <textarea
              rows="5"
              cols="50"
              className="p-[10px] border border-[#ddd] rounded-[5px] font-[Montserrat] text-xs resize-y min-h-[120px] outline-none mb-5"
              placeholder="Enter your description here..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />

            <div className="flex items-center mt-[10px] mb-[30px]">
              <input
                type="checkbox"
                id="agree"
                checked={formData.agreedToTerms}
                onChange={(e) =>
                  handleInputChange("agreedToTerms", e.target.checked)
                }
                className="absolute opacity-0 cursor-pointer h-0 w-0"
              />
              <label
                htmlFor="agree"
                className="relative pl-[25px] cursor-pointer text-sm text-[#333] flex items-center before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:border before:border-[#ccc] before:bg-white before:rounded-[2px] after:content-[''] after:absolute after:left-[5px] after:top-1/2 after:transform after:-translate-y-[70%] after:rotate-45 after:w-[5px] after:h-[10px] after:border-solid after:border-white after:border-r-2 after:border-b-2 after:opacity-0 focus:before:shadow-[0_0_0_2px_rgba(141,211,187,0.3)]"
                style={
                  formData.agreedToTerms
                    ? {
                        "&::before": { backgroundColor: "#8DD3BB" },
                        "&::after": { opacity: 1 },
                      }
                    : {}
                }
              >
                I agree to the terms and conditions
                {formData.agreedToTerms && (
                  <>
                    <style jsx>{`
                      label::before {
                        background-color: #8dd3bb !important;
                      }
                      label::after {
                        opacity: 1 !important;
                      }
                    `}</style>
                  </>
                )}
              </label>
            </div>

            <div className="flex justify-center w-full mt-5 pt-5">
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] mr-[30px] hover:opacity-70"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bg-[#8dd3bb] py-[10px] px-[30px] border-none rounded-[5px] cursor-pointer font-[Montserrat] hover:opacity-70 disabled:bg-[#cccccc] disabled:cursor-not-allowed"
                onClick={handleFinish}
                disabled={
                  !formData.agreedToTerms ||
                  formData.description.trim().length === 0
                }
              >
                Finish
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto">
      <div
        className="min-h-screen w-full flex flex-col items-center bg-[#8dd3bb] bg-cover bg-center bg-no-repeat pt-0 pb-10 z-[1]"
        style={{ backgroundImage: "url('/assets/backgroundill.png')" }}
      >
        <div className="h-0"></div>
        <Progressbar
          className="w-full max-w-[600px] p-[10px] mt-0"
          currentStep={currentStep}
          totalSteps={6}
        />

        {renderStep()}
      </div>
    </div>
  );
}

export default HotelRegistration;
