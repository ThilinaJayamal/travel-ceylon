import React, { useState } from "react";
import axios from "axios";
import {toast} from"react-hot-toast"

export default function TaxiForm() {
  const [formData, setFormData] = useState({
    driverName: "",
    nic: "",
    drivingId: "",
    contact: [""],
    website: "",
    chasyNo: "",
    vehicleNo: "",
    province: "",
    vehicleType: "",
    perKm: "",
    location: ""
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle contact array change
  const handleContactChange = (index, value) => {
    const updatedContacts = [...formData.contact];
    updatedContacts[index] = value;
    setFormData({ ...formData, contact: updatedContacts });
  };

  // Add new contact field
  const addContactField = () => {
    setFormData({ ...formData, contact: [...formData.contact, ""] });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/service/taxi", formData);
      toast.success("Taxi added successfully!");
    } catch (error) {
      toast.error(error?.response.data.message)
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Taxi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="driverName"
          placeholder="Driver Name"
          value={formData.driverName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="nic"
          placeholder="NIC"
          value={formData.nic}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="drivingId"
          placeholder="Driving ID"
          value={formData.drivingId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {formData.contact.map((c, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={`Contact ${index + 1}`}
              value={c}
              onChange={(e) => handleContactChange(index, e.target.value)}
              className="flex-1 p-2 border rounded"
              required
            />
            {index === formData.contact.length - 1 && (
              <button
                type="button"
                onClick={addContactField}
                className="px-3 bg-blue-500 text-white rounded"
              >
                +
              </button>
            )}
          </div>
        ))}

        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="chasyNo"
          placeholder="Chasy Number"
          value={formData.chasyNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="vehicleNo"
          placeholder="Vehicle Number"
          value={formData.vehicleNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="province"
          placeholder="Province"
          value={formData.province}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="vehicleType"
          placeholder="Vehicle Type"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="perKm"
          placeholder="Per Km Rate"
          value={formData.perKm}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
