// store/guideStore.js
import { create } from "zustand";

export const useGuideStore = create((set) => ({
  formData: {
    name: "",
    nic: "",
    contact: [""],
    linkedIn: "",
    profilePic: "",
    images: [],
    specializeArea: "",
    province: "",
    district: "",
    city: "",
    languages: [""],
    guideLicenceImg: "",
    nicImg: "",
    policeClearanceImg: "",
    price: "",
  },

  // Generic field setter
  setField: (field, value) =>
    set((state) => ({ formData: { ...state.formData, [field]: value } })),

  // Contact handlers
  addContact: () =>
    set((state) => ({
      formData: { ...state.formData, contact: [...state.formData.contact, ""] },
    })),
  setContact: (index, value) =>
    set((state) => {
      const contact = [...state.formData.contact];
      contact[index] = value;
      return { formData: { ...state.formData, contact } };
    }),

  // Language handlers
  addLanguage: () =>
    set((state) => ({
      formData: { ...state.formData, languages: [...state.formData.languages, ""] },
    })),
  setLanguage: (index, value) =>
    set((state) => {
      const languages = [...state.formData.languages];
      languages[index] = value;
      return { formData: { ...state.formData, languages } };
    }),

  // Upload a single image using fetch
  uploadImage: async (field, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file); // backend expects 'image'

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Upload failed:", data.message || data);
        return null;
      }

      const url = data.url || data.path; // match backend response

      // Update store automatically
      set((state) => ({
        formData: { ...state.formData, [field]: url },
      }));

      return url;
    } catch (err) {
      console.error("Network error during upload:", err);
      return null;
    }
  },

  // Register guide after uploading images
  registerGuide: async () => {
    try {
      const { formData } = useGuideStore.getState();
      const response = await fetch("http://localhost:5000/api/service/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to register guide");
      }

      alert("Guide registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to register guide");
    }
  },
}));
