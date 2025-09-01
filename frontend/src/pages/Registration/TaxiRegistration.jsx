import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import Progressbar from "../../components/progressbar.jsx";

function TaxiRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 states
  const [taxiname, setTaxiName] = useState("");
  const [location, setLocation] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);

  // Step 2 states
  const [contactNumber1, setContactNumber1] = useState("");
  const [contactNumber2, setContactNumber2] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Step 3 states
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [chasseyNumber, setChasseyNumber] = useState("");
  const [model, setModel] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [province, setProvince] = useState("Southern");

  // Step 4 states
  const [facilities, setFacilities] = useState({
    helmets: false,
    rainJackets: false,
    gps: false,
    usbCharging: false,
    airConditioning: false,
    luggageSpace: false,
    childSeat: false,
    musicSystem: false,
    reverseCamera: false,
    firstAidKit: false,
    wifi: false,
    tintedWindows: false,
    spareTire: false,
    mobileHolder: false,
    trackingSystem: false,
    phoneSupport: false,
    acAdjustableSeats: false,
    bluetooth: false
  });

  // Step 5 states
  const [taxiPhotos, setTaxiPhotos] = useState([]);

  // Step 6 states
  const [serviceDescription, setServiceDescription] = useState("");
  const [driverDescription, setDriverDescription] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goBack = () => {
    if (currentStep === 1) {
      navigate("../Registration");
    } else {
      prevStep();
    }
  };

  const goNext = () => {
    if (currentStep === 6) {
      navigate("/dashboard");
    } else {
      nextStep();
    }
  };

  // Step 1 functions
  const handleFileChange1 = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 50 * 1024 * 1024
    );
    setFiles1((prev) => [...prev, ...validFiles].slice(0, 5));
  };

  const handleFileChange2 = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 50 * 1024 * 1024
    );
    setFiles2((prev) => [...prev, ...validFiles].slice(0, 5));
  };

  const removeImage1 = (index) => {
    setFiles1((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImage2 = (index) => {
    setFiles2((prev) => prev.filter((_, i) => i !== index));
  };

  // Step 4 functions
  const handleCheckboxChange = (name) => {
    setFacilities(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const facilityList = [
    { key: "helmets", label: "Helmets" },
    { key: "rainJackets", label: "Rain Jackets" },
    { key: "gps", label: "GPS Navigation" },
    { key: "usbCharging", label: "USB Charging Port" },
    { key: "airConditioning", label: "Air Conditioning" },
    { key: "luggageSpace", label: "Luggage Space" },
    { key: "childSeat", label: "Child Seat" },
    { key: "musicSystem", label: "Music System" },
    { key: "reverseCamera", label: "Reverse Camera" },
    { key: "firstAidKit", label: "First Aid Kit" },
    { key: "wifi", label: "WiFi Available" },
    { key: "tintedWindows", label: "Tinted Windows" },
    { key: "spareTire", label: "Spare Tire" },
    { key: "mobileHolder", label: "Mobile Holder" },
    { key: "trackingSystem", label: "Tracking System" },
    { key: "phoneSupport", label: "Phone Holder" },
    { key: "acAdjustableSeats", label: "A/C Adjustable Seats" },
    { key: "bluetooth", label: "Bluetooth Connectivity" }
  ];

  const leftFacilities = facilityList.slice(0, 9);
  const rightFacilities = facilityList.slice(9);

  // Step 5 functions
  const handleTaxiPhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 50 * 1024 * 1024
    );
    setTaxiPhotos((prev) => [...prev, ...validFiles].slice(0, 10));
  };

  const removeTaxiPhoto = (index) => {
    setTaxiPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
            <p className="text-sm text-left mb-3">What is Owner name</p>
            <div className="relative w-full mb-0">
              <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Add name</label>
              <input
                type="text"
                required
                value={taxiname}
                onChange={(e) => setTaxiName(e.target.value)}
                className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
              />
            </div>
            <p className="text-sm text-left mb-3">Set your location</p>
            <div className="relative w-full mb-0">
              <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Add location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
              />
            </div>
            <div>
              <p className="text-sm text-left mb-3">identification Number</p>
              <div className="flex justify-between gap-5 w-full">
                <div className="relative flex-1">
                  <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">NIC number</label>
                  <input
                    type="text"
                    required
                    value={nicNumber}
                    onChange={(e) => setNicNumber(e.target.value)}
                    className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                  />
                </div>
                <div className="relative flex-1">
                  <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">License number</label>
                  <input
                    type="text"
                    required
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-5 w-full">
              <div className="flex flex-col w-1/2">
                <div className="border border-gray-300 p-7 rounded mt-3.5 flex flex-col items-center justify-center cursor-pointer w-full">
                  <label htmlFor="file-upload-1" className="flex flex-col items-center w-full cursor-pointer">
                    <Upload className="w-[50px] h-[50px] mb-2.5  opacity-70 text-gray-600" />
                    <p className="text-sm text-center mb-1 mt-2.5">Drag and Drop or upload</p>
                    <p className="text-xs text-center text-gray-600 mt-0">
                      JPG/JPEG or PNG maximum size 50MB each.
                    </p>
                  </label>
                  <input
                    type="file"
                    id="file-upload-1"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={handleFileChange1}
                    style={{ display: "none" }}
                  />
                </div>
                {files1.length > 0 && (
                  <div className="grid grid-cols-2 gap-2.5 mt-4 w-full">
                    {files1.map((file, index) => (
                      <div key={index} className="relative w-full aspect-square rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white bg-opacity-80 border-none text-gray-800 text-lg flex items-center justify-center cursor-pointer p-0 leading-none"
                          onClick={() => removeImage1(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <div className="border border-gray-300 p-7 rounded mt-3.5 flex flex-col items-center justify-center cursor-pointer w-full">
                  <label htmlFor="file-upload-2" className="flex flex-col items-center w-full cursor-pointer">
                    <Upload className="w-[50px] h-[50px] mb-2.5 opacity-70 text-gray-600" />
                    <p className="text-sm text-center mb-1 mt-2.5">Drag and Drop or upload</p>
                    <p className="text-xs text-center text-gray-600 mt-0">
                      JPG/JPEG or PNG maximum size 50MB each.
                    </p>
                  </label>
                  <input
                    type="file"
                    id="file-upload-2"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={handleFileChange2}
                    style={{ display: "none" }}
                  />
                </div>
                {files2.length > 0 && (
                  <div className="grid grid-cols-2 gap-2.5 mt-4 w-full">
                    {files2.map((file, index) => (
                      <div key={index} className="relative w-full aspect-square rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white bg-opacity-80 border-none text-gray-800 text-lg flex items-center justify-center cursor-pointer p-0 leading-none"
                          onClick={() => removeImage2(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-center w-full">
              <button className="bg-[#8dd3bb] mr-7 mt-7 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" onClick={goBack}>
                Back
              </button>
              <button 
                className="bg-[#8dd3bb] mt-7 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" 
                onClick={goNext}
                disabled={isNextDisabled()}
              >
                {currentStep === 6 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
            <div>
              <p className="text-sm text-left mb-3">Add your contact numbers</p>
              <div className="flex justify-between gap-5 w-full">
                <div className="relative flex-1">
                  <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Number 1</label>
                  <input
                    type="text"
                    required
                    value={contactNumber1}
                    onChange={(e) => setContactNumber1(e.target.value)}
                    className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                  />
                </div>
                <div className="relative flex-1">
                  <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Number 2</label>
                  <input
                    type="text"
                    required
                    value={contactNumber2}
                    onChange={(e) => setContactNumber2(e.target.value)}
                    className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-left mb-3">Add your email</p>
              <div className="relative w-full mb-0">
                <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Email</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-left mb-3">Add your Website link (optional)</p>
              <div className="relative w-full mb-0">
                <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Website-link</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                />
              </div>
            </div>
            
            <div className="flex justify-center w-full">
              <button className="bg-[#8dd3bb] mr-7 mt-2.5 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" onClick={goBack}>
                Back
              </button>
              <button 
                className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" 
                onClick={goNext}
                disabled={isNextDisabled()}
              >
                {currentStep === 6 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
            <p className="text-sm text-left mb-3">What type of vehicle?</p>
            <select
              className="h-11 rounded border border-gray-300 text-xs mb-7 outline-none bg-white text-left py-2.5 px-2.5"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="Bike">Bike</option>
              <option value="TukTuk">TukTuk</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
            </select>
            <div>
              <p className="text-sm text-left mb-3">Add your vehicle model</p>
              <div className="relative w-full mb-0">
                <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">vehicle model</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-left mb-3">Vehicle registration numbers</p>
              <div className="flex justify-between gap-5 w-full">
                <div className="relative flex-1">
                  <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">vehicle number</label>
                  <input
                    type="text"
                    required
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                  />
                </div>
                <div className="relative flex-1">
                  <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">chasey number</label>
                  <input
                    type="text"
                    required
                    value={chasseyNumber}
                    onChange={(e) => setChasseyNumber(e.target.value)}
                    className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0 mb-7"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-left mb-3">Select Province</p>
            <select
              className="h-11 rounded border border-gray-300 text-xs mb-7 outline-none bg-white text-left py-2.5 px-2.5"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="Southern">Southern Province</option>
              <option value="Western">Western Province</option>
              <option value="Central">Central Province</option>
              <option value="Eastern">Eastern Province</option>
              <option value="Northern">Northern Province</option>
              <option value="North-Western">North-Western Province</option>
              <option value="North-Central">North-Central Province</option>
              <option value="Sabaragamuwa">Sabaragamuwa Province</option>
              <option value="Uva">Uva</option>
            </select>
            
            <div className="flex justify-center w-full">
              <button className="bg-[#8dd3bb] mr-7 mt-2.5 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" onClick={goBack}>
                Back
              </button>
              <button 
                className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" 
                onClick={goNext}
                disabled={isNextDisabled()}
              >
                {currentStep === 6 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[590px] m-2.5">
            <div className="mb-5 text-center">
              <p className="text-sm font-medium mb-5">What are the Vehicle Facilities?</p>
            </div>
            <div className="flex justify-center gap-10 mx-auto w-full max-w-[500px]">
              <div className="flex flex-col gap-4 items-start">
                {leftFacilities.map(facility => (
                  <label key={facility.key} className="flex items-center text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={facilities[facility.key]}
                      onChange={() => handleCheckboxChange(facility.key)}
                    />
                    <span className={`w-4 h-4 border-[1.5px] border-gray-400 rounded mr-2.5 relative transition-all duration-300 ${facilities[facility.key] ? 'bg-[#8DD3BB] border-[#8DD3BB]' : ''}`}>
                      {facilities[facility.key] && (
                        <span className="absolute left-1 top-0 w-1 h-2 border-solid border-white border-r-2 border-b-2 transform rotate-45"></span>
                      )}
                    </span>
                    <span className="text-xs">{facility.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col gap-4 items-start">
                {rightFacilities.map(facility => (
                  <label key={facility.key} className="flex items-center text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={facilities[facility.key]}
                      onChange={() => handleCheckboxChange(facility.key)}
                    />
                    <span className={`w-4 h-4 border-[1.5px] border-gray-400 rounded mr-2.5 relative transition-all duration-300 ${facilities[facility.key] ? 'bg-[#8DD3BB] border-[#8DD3BB]' : ''}`}>
                      {facilities[facility.key] && (
                        <span className="absolute left-1 top-0 w-1 h-2 border-solid border-white border-r-2 border-b-2 transform rotate-45"></span>
                      )}
                    </span>
                    <span className="text-xs">{facility.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center w-full gap-7 mt-7">
              <button className="bg-[#8dd3bb] py-3 px-7 border-none cursor-pointer rounded font-medium mt-0 hover:opacity-70" onClick={goBack}>
                Back
              </button>
              <button 
                className="bg-[#8dd3bb] py-3 px-7 border-none cursor-pointer rounded font-medium mt-0 hover:opacity-70" 
                onClick={goNext}
                disabled={isNextDisabled()}
              >
                {currentStep === 6 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
            <p className="text-sm text-left mb-3">
              Upload at least 5 Photos of your taxi
            </p>
            <div className="border border-gray-300 p-7 rounded mt-3.5 flex flex-col items-center justify-center cursor-pointer">
              <label htmlFor="taxi-photo-upload" className="flex flex-col items-center w-full cursor-pointer">
                <Upload className="w-[70px] h-[70px] mb-2.5 opacity-70 text-gray-600" />
                <p className="text-sm text-center mb-1 mt-2.5">Drag and Drop or upload</p>
                <p className="text-xs text-center text-gray-600 mt-0">JPG/JPEG or PNG maximum size 50MB each.</p>
              </label>
              <input
                type="file"
                id="taxi-photo-upload"
                accept="image/png, image/jpeg"
                multiple
                onChange={handleTaxiPhotoChange}
                style={{ display: "none" }}
              />
            </div>
            
            {taxiPhotos.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-5">
                {taxiPhotos.map((file, index) => (
                  <div key={index} className="relative w-full aspect-square rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      className="absolute -top-4 right-4 w-6 h-6 rounded-full bg-white bg-opacity-80 border-none text-gray-800 text-lg flex items-center justify-center cursor-pointer p-0 leading-none"
                      onClick={() => removeTaxiPhoto(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-center w-full mt-0">
              <button className="bg-[#8dd3bb] mr-7 mt-7 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" onClick={goBack}>
                Back
              </button>
              <button 
                className="bg-[#8dd3bb] mt-7 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" 
                onClick={goNext}
                disabled={isNextDisabled()}
              >
                {currentStep === 6 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
            <p className="text-sm text-left mb-3">Add a brief description about your service</p>
            <textarea
              rows="5"
              cols="50"
              className="p-2.5 border border-gray-300 rounded font-[Montserrat] text-xs resize-y min-h-[85px] outline-none"
              placeholder="Enter your service description here..."
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />

            <p className="text-sm mb-2.5 mt-7">Add a brief description about Driver (optional)</p>
            <textarea
              rows="5"
              cols="50"
              className="p-2.5 border border-gray-300 rounded font-[Montserrat] text-xs resize-y min-h-[85px] outline-none"
              placeholder="Enter driver description here..."
              value={driverDescription}
              onChange={(e) => setDriverDescription(e.target.value)}
            />

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="absolute opacity-0 cursor-pointer h-0 w-0"
              />
              <label htmlFor="agree" className="relative pl-6 cursor-pointer text-xs text-gray-800 flex items-center before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:border before:border-gray-400 before:bg-white before:rounded-sm after:content-[''] after:absolute after:left-1 after:top-1/2 after:-translate-y-[70%] after:rotate-45 after:w-1 after:h-2 after:border-solid after:border-white after:border-r-2 after:border-b-2 after:opacity-0">
                I agree to the terms and conditions
              </label>
              <style jsx>{`
                #agree:checked + label::before {
                  background-color: #8DD3BB;
                }
                #agree:checked + label::after {
                  opacity: 1;
                }
                #agree:focus + label::before {
                  box-shadow: 0 0 0 2px rgba(141, 211, 187, 0.3);
                }
              `}</style>
            </div>
            
            <div className="flex justify-center w-full">
              <button className="bg-[#8dd3bb] mr-7 mt-7 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70" onClick={goBack}>
                Back
              </button>
              <button 
                className="bg-[#8dd3bb] mt-7 py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70 disabled:bg-gray-400 disabled:cursor-not-allowed" 
                onClick={goNext}
                disabled={isNextDisabled()}
              >
                {currentStep === 6 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getWrapperClass = () => {
    return "w-full h-screen overflow-y-auto";
  };

  const getContainerClass = () => {
    return "min-h-screen w-full flex flex-col items-center bg-[#8dd3bb] bg-cover bg-center bg-no-repeat pt-0 z-[1]";
  };

  const getButtonContainerClass = () => {
    return "flex justify-center w-full";
  };

  const getBackButtonClass = () => {
    return "bg-[#8dd3bb] py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70";
  };

  const getNextButtonClass = () => {
    return "bg-[#8dd3bb] py-2.5 px-7 border-none cursor-pointer rounded hover:opacity-70";
  };

  const isNextDisabled = () => {
    if (currentStep === 6) {
      return !agreed || serviceDescription.trim().length === 0;
    }
    return false;
  };

  return (
    <div className={getWrapperClass()} style={{backgroundImage: "url('/assets/backgroundill.png')"}}>
      <div className={getContainerClass()}>
        <Progressbar currentStep={currentStep} totalSteps={6} />
        {renderStepContent()}
      </div>
    </div>
  );
}

export default TaxiRegistration;