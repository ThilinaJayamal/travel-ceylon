import React, { useState } from "react";

// Mock Progressbar component for demo - keeping original functionality
const Progressbar = ({ currentStep, totalSteps }) => (
  <div className="w-full max-w-[600px] p-2.5">
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div 
        className="bg-white h-2.5 rounded-full transition-all duration-300" 
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
    <div className="text-center text-sm text-gray-600">
      Step {currentStep} of {totalSteps}
    </div>
  </div>
);

function GuideRegistration() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [linkdin, setLinkdin] = useState("");

  // Step 2 state
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  // Step 3 state
  const [language, setLanguage] = useState({
    english: false,
    french: false,
    german: false,
    hindi: false,
  });

  const [specialization, setSpecialization] = useState({
    history: false,
    wildlife: false,
    eco: true,
  });

  const [province, setProvince] = useState("Southern Province");
  const [district, setDistrict] = useState("Hambantota");
  const [city, setCity] = useState("Tissamaharama");

  // Step 4 state
  const [description, setDescription] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Sri Lanka data for step 3
  const sriLankaData = {
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Eastern Province": ["Ampara", "Batticaloa", "Trincomalee"],
    "Northern Province": [
      "Jaffna",
      "Kilinochchi",
      "Mannar",
      "Mullaitivu",
      "Vavuniya",
    ],
    "North Central Province": ["Anuradhapura", "Polonnaruwa"],
    "North Western Province": ["Kurunegala", "Puttalam"],
    "Sabaragamuwa Province": ["Kegalle", "Ratnapura"],
    "Southern Province": ["Galle", "Hambantota", "Matara"],
    "Uva Province": ["Badulla", "Monaragala"],
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
  };

  // File handling for step 2
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 50 * 1024 * 1024
    );
    setFiles((prev) => [...prev, ...validFiles].slice(0, 10)); // limit max 10
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Language handling for step 3
  const handleLanguageChange = (key) => {
    setLanguage((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Specialization handling for step 3
  const handleSpecializationChange = (key) => {
    setSpecialization((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Province handling for step 3
  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict("");
  };

  // Navigation functions
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - would navigate to dashboard
      alert("Registration completed! Would navigate to dashboard.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // First step - go back to main registration
      // Replace this with your actual navigation logic
      window.location.href = "/registration"; // or use your router's navigate function
    }
  };

  // Custom checkbox component for better styling
  const CustomCheckbox = ({ checked, onChange, label }) => (
    <label className="flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        className="absolute opacity-0 cursor-pointer h-0 w-0"
        checked={checked}
        onChange={onChange}
      />
      <span className={`relative h-4 w-4 bg-white border-[1.5px] ${checked ? 'border-[#8DD3BB] bg-[#8DD3BB]' : 'border-gray-400'} rounded mr-3`}>
        {checked && (
          <span className="absolute left-[3px] top-[0.5px] w-1 h-2 border-solid border-white border-r-2 border-b-2 transform rotate-45"></span>
        )}
      </span>
      <span className="text-sm">{label}</span>
    </label>
  );

  // Step 1 Component
  const renderStepOne = () => (
    <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
      <div>
        <p className="text-sm text-left mb-3">Add your name</p>
        <div className="relative w-full mb-0">
          <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0"
          />
        </div>
        
      </div>
      
      <div>
       <p className="text-sm text-left mb-3 mt-4">Add your NIC Number</p>
        <div className="relative w-full mb-0">
          <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">NIC number</label>
          <input
            type="text"
            required
            value={nic}
            onChange={(e) => setNIC(e.target.value)}
            className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0"
          />
        </div>
      </div>

      <div>
        <p className="text-sm text-left mb-3 mt-4">Add your LinkedIn profile (optional)</p>
        <div className="relative w-full mb-0">
          <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">LinkedIn link</label>
          <input
            type="text"
            value={linkdin}
            onChange={(e) => setLinkdin(e.target.value)}
            className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0"
          />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <button className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7.5 border-0 rounded cursor-pointer mr-7.5 hover:opacity-70" onClick={handleBack}>
          Back
        </button>
        <button className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7.5 border-0 rounded cursor-pointer hover:opacity-70" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );

  // Step 2 Component
  const renderStepTwo = () => (
    <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
      <div>
        <p className="text-sm text-left mb-3">Add your contact numbers</p>
        <div className="flex justify-between gap-5 w-full">
          <div className="flex-1 relative w-full mb-0">
            <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Number 1</label>
            <input
              type="text"
              required
              value={number1}
              maxLength={10}
              onChange={(e) => setNumber1(e.target.value)}
              className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0"
            />
          </div>
          <div className="flex-1 relative w-full mb-0">
            <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Number 2</label>
            <input
              type="text"
              required
              value={number2}
              maxLength={10}
              onChange={(e) => setNumber2(e.target.value)}
              className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0"
            />
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-left mb-3 mt-4">Add your email</p>
        <div className="relative w-full mb-0">
          <label className="absolute -top-2 left-3.5 bg-white px-1.5 text-xs text-gray-800 z-10">Email</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3.5 px-3 text-sm border border-gray-300 rounded outline-none bg-transparent z-0"
          />
        </div>
      </div>
      
      <p className="text-sm text-left mb-3 mt-4">
        Upload your clear portrait image
      </p>
      <div className="border border-gray-300 p-7.5 rounded flex flex-col items-center justify-center cursor-pointer mb-7.5">
        <label htmlFor="file-upload" className="flex flex-col items-center w-full cursor-pointer">
          <div className="w-17.5 h-17.5 mb-2.5 opacity-70 bg-gray-300 rounded flex items-center justify-center text-2xl">📷</div>
          <p className="text-sm text-center mb-1.25 mt-2.5">Drag and Drop or upload</p>
          <p className="text-xs text-center text-gray-600 mt-0">JPG/JPEG or PNG maximum size 50MB each.</p>
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
      
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3.75 mt-5">
          {files.map((file, index) => (
            <div key={index} className="relative w-full aspect-square rounded overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-full h-full object-cover"
              />
              <button 
                className="absolute -top-3.75 right-3.75 w-6 h-6 rounded-full bg-white bg-opacity-80 border-0 text-gray-800 text-lg flex items-center justify-center cursor-pointer p-0 leading-none"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center w-full">
        <button className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7.5 border-0 rounded cursor-pointer mr-7.5 hover:opacity-70" onClick={handleBack}>
          Back
        </button>
        <button className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7.5 border-0 rounded cursor-pointer hover:opacity-70" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );

  // Step 3 Component
  const renderStepThree = () => (
    <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5">
      <h3 className="text-sm text-left mb-3 font-medium">
        What languages do you prefer?
      </h3>
      <div className="flex flex-col gap-3 mb-6.25 ml-7.5">
        <CustomCheckbox
          checked={language.english}
          onChange={() => handleLanguageChange("english")}
          label="English"
        />
        <CustomCheckbox
          checked={language.french}
          onChange={() => handleLanguageChange("french")}
          label="French"
        />
        <CustomCheckbox
          checked={language.german}
          onChange={() => handleLanguageChange("german")}
          label="German"
        />
        <CustomCheckbox
          checked={language.hindi}
          onChange={() => handleLanguageChange("hindi")}
          label="Hindi"
        />
      </div>

      <h3 className="text-sm text-left mb-3 font-medium">
        What are your specializations?
      </h3>
      <div className="flex flex-col gap-3 mb-6.25 ml-7.5">
        <CustomCheckbox
          checked={specialization.history}
          onChange={() => handleSpecializationChange("history")}
          label="History and Ancient things"
        />
        <CustomCheckbox
          checked={specialization.wildlife}
          onChange={() => handleSpecializationChange("wildlife")}
          label="Wildlife safaris"
        />
        <CustomCheckbox
          checked={specialization.eco}
          onChange={() => handleSpecializationChange("eco")}
          label="Eco-Adventure Guide"
        />
      </div>

      <h3 className="text-sm text-left mb-3 font-medium">What is your Area</h3>
      <div className="flex flex-row gap-3.75 w-full max-md:flex-col max-md:gap-5">
        <div className="relative flex-1 max-md:w-full">
          <div className="absolute -top-1.75 left-2.5 px-1.25 bg-white text-xs z-10 text-black">Province</div>
          <div className="relative w-full">
            <select
              className="w-full p-2.5 border border-gray-400 rounded appearance-none bg-white opacity-60"
              value={province}
              onChange={handleProvinceChange}
            >
              {Object.keys(sriLankaData).map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-600 pointer-events-none"></div>
          </div>
        </div>

        <div className="relative flex-1 max-md:w-full">
          <div className="absolute -top-1.75 left-2.5 px-1.25 bg-white text-xs z-10 text-black">District</div>
          <div className="relative w-full">
            <select
              className="w-full p-2.5 border border-gray-400 rounded appearance-none bg-white opacity-60 disabled:opacity-40"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!province}
            >
              <option value="">Select District</option>
              {province &&
                sriLankaData[province].map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
            </select>
            <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-600 pointer-events-none"></div>
          </div>
        </div>

        <div className="relative flex-1 max-md:w-full">
          <div className="absolute -top-1.75 left-2.5 px-1.25 bg-white text-xs z-10 text-black">City</div>
          <input
            type="text"
            className="w-full p-2.5 border border-gray-400 rounded box-border opacity-60"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-center w-full">
        <button className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7.5 border-0 rounded cursor-pointer mr-7.5 hover:opacity-70" onClick={handleBack}>
          Back
        </button>
        <button className="bg-[#8dd3bb] mt-2.5 py-2.5 px-7.5 border-0 rounded cursor-pointer hover:opacity-70" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );

  // Step 4 Component
  const renderStepFour = () => (
    <div className="w-full flex flex-col justify-center p-10 bg-white rounded-lg max-w-[600px] m-2.5 max-sm:p-6">
      <p className="text-sm mb-2.5">Add a brief description about you</p>
      <textarea
        rows="5"
        cols="50"
        className="p-2.5 border border-gray-300 rounded text-xs resize-y min-h-[120px] outline-none font-['Montserrat',sans-serif]"
        placeholder="Enter your description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex items-center mt-2.5 mb-2.5">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="absolute opacity-0 cursor-pointer h-0 w-0"
        />
        <label htmlFor="agree" className="relative pl-6.25 cursor-pointer text-sm text-gray-800 flex items-center">
          <span className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-3.75 h-3.75 border border-gray-400 bg-white rounded-sm ${agreed ? 'bg-[#8DD3BB] border-[#8DD3BB]' : ''}`}>
            {agreed && (
              <span className="absolute left-1.25 top-1/2 transform -translate-y-[70%] rotate-45 w-1.25 h-2.5 border-solid border-white border-r-2 border-b-2"></span>
            )}
          </span>
          I agree to the terms and conditions
        </label>
      </div>

      <div className="flex justify-center w-full">
        <button className="bg-[#8dd3bb] py-2.5 px-7.5 border-0 rounded cursor-pointer mr-7.5 hover:opacity-70" onClick={handleBack}>
          Back
        </button>
        <button 
          className={`py-2.5 px-7.5 border-0 rounded ${(!agreed || description.trim().length === 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8dd3bb] cursor-pointer hover:opacity-70'}`}
          onClick={handleNext}
          disabled={!agreed || description.trim().length === 0}
        >
          Finish
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-y-auto">
      <div 
        className="min-h-screen w-full flex flex-col items-center bg-[#8dd3bb] bg-cover bg-center bg-no-repeat pt-0 z-10"
        style={{ backgroundImage: "url('/assets/backgroundill.png')" }}
      >
        <div className="w-full max-w-[600px] p-2.5">
          <Progressbar currentStep={currentStep} totalSteps={4} />
        </div>
        {currentStep === 1 && renderStepOne()}
        {currentStep === 2 && renderStepTwo()}
        {currentStep === 3 && renderStepThree()}
        {currentStep === 4 && renderStepFour()}
      </div>
    </div>
  );
}

export default GuideRegistration;