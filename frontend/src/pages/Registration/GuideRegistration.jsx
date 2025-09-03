import { useState } from "react";
import axios from "axios";
import {toast} from"react-hot-toast"

export default function GuideForm() {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    contact: [""],
    linkend: "",
    specializeArea: "",
    province: "",
    district: "",
    city: "",
    languages: [""],
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field, index) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/service/guide", formData);

      toast.success("Guide registered successfully!");

      setFormData({
        name: "",
        nic: "",
        contact: [""],
        linkend: "",
        specializeArea: "",
        province: "",
        district: "",
        city: "",
        languages: [""],
        price: "",
      });
    } catch (error) {
      toast.error(error?.response.data.message)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Register a Guide</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* NIC */}
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          className="border p-2 rounded"
          value={formData.nic}
          onChange={handleChange}
          required
        />

        {/* Contact numbers */}
        <div className="col-span-2">
          <label className="font-medium">Contact Numbers</label>
          {formData.contact.map((c, i) => (
            <input
              key={i}
              type="text"
              placeholder="Contact Number"
              className="border p-2 rounded block my-1 w-full"
              value={c}
              onChange={(e) => handleArrayChange(e, "contact", i)}
              required
            />
          ))}
          <button
            type="button"
            className="text-blue-600 mt-1"
            onClick={() => addArrayField("contact")}
          >
            + Add Contact
          </button>
        </div>

        {/* LinkedIn */}
        <input
          type="text"
          name="linkend"
          placeholder="LinkedIn"
          className="border p-2 rounded col-span-2"
          value={formData.linkend}
          onChange={handleChange}
        />

        {/* Specialize Area */}
        <input
          type="text"
          name="specializeArea"
          placeholder="Specialize Area"
          className="border p-2 rounded col-span-2"
          value={formData.specializeArea}
          onChange={handleChange}
          required
        />

        {/* Province */}
        <input
          type="text"
          name="province"
          placeholder="Province"
          className="border p-2 rounded"
          value={formData.province}
          onChange={handleChange}
          required
        />

        {/* District */}
        <input
          type="text"
          name="district"
          placeholder="District"
          className="border p-2 rounded"
          value={formData.district}
          onChange={handleChange}
          required
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          className="border p-2 rounded col-span-2"
          value={formData.city}
          onChange={handleChange}
          required
        />

        {/* Languages */}
        <div className="col-span-2">
          <label className="font-medium">Languages</label>
          {formData.languages.map((lang, i) => (
            <input
              key={i}
              type="text"
              placeholder="Language"
              className="border p-2 rounded block my-1 w-full"
              value={lang}
              onChange={(e) => handleArrayChange(e, "languages", i)}
              required
            />
          ))}
          <button
            type="button"
            className="text-blue-600 mt-1"
            onClick={() => addArrayField("languages")}
          >
            + Add Language
          </button>
        </div>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 rounded col-span-2"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg col-span-2 mt-4 hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
