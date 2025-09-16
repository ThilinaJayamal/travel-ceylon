import { create } from "zustand";
import { api } from "../config/api";

export const useHotelStore = create((set, get) => ({
  // ---------- STATE ----------
  name: null,
  location: null,
  contact1: null,
  contact2: null,
  email: null,
  website: null,

  // facilities
  breakfast: false,
  roomService: false,
  bar: false,
  fitnessCenter: false,
  garden: false,
  parking: false,
  familyRooms: false,
  freeWifi: false,
  airConditioning: false,
  spa: false,
  swimmingPool: false,
  waterPark: false,

  // images
  image1: null,
  image2: null,
  image3: null,

  aggree: false,
  currentIndex: 0,


  // ---------- SETTERS ----------
  setName: (name) => set({ name }),
  setLocation: (location) => set({ location }),
  setContact1: (contact1) => set({ contact1 }),
  setContact2: (contact2) => set({ contact2 }),
  setEmail: (email) => set({ email }),
  setWebsite: (website) => set({ website }),

  setBreakfast: (breakfast) => set({ breakfast }),
  setRoomService: (roomService) => set({ roomService }),
  setBar: (bar) => set({ bar }),
  setFitnessCenter: (fitnessCenter) => set({ fitnessCenter }),
  setGarden: (garden) => set({ garden }),
  setParking: (parking) => set({ parking }),
  setFamilyRooms: (familyRooms) => set({ familyRooms }),
  setFreeWifi: (freeWifi) => set({ freeWifi }),
  setAirConditioning: (airConditioning) => set({ airConditioning }),
  setSpa: (spa) => set({ spa }),
  setSwimmingPool: (swimmingPool) => set({ swimmingPool }),
  setWaterPark: (waterPark) => set({ waterPark }),

  setImage1: (image1) => set({ image1 }),
  setImage2: (image2) => set({ image2 }),
  setImage3: (image3) => set({ image3 }),

  setAggree: (aggree) => set({ aggree }),
  setCurrentIndex: (currentIndex) => set({ currentIndex }),

  // ---------- SUBMIT ----------
  submit: async () => {
    const {
      name,
      location,
      contact1,
      contact2,
      email,
      website,
      breakfast,
      roomService,
      bar,
      fitnessCenter,
      garden,
      parking,
      familyRooms,
      freeWifi,
      airConditioning,
      spa,
      swimmingPool,
      waterPark,
      image1,
      image2,
      image3,
      aggree,
    } = get();

    if (!aggree) {
      throw new Error("You must agree to terms and conditions");
    }

    const formData = {
      name,
      location,
      contact: [contact1, contact2],
      email,
      website,
      facilities: {
        breakfast,
        roomService,
        bar,
        fitnessCenter,
        garden,
        parking,
        familyRooms,
        freeWifi,
        airConditioning,
        spa,
        swimmingPool,
        waterPark,
      },
      images: [image1, image2, image3],
    };

    try {
      const { data } = await api.post("/service/stays", formData);
      return data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Something went wrong");
    }
  },


  staysProfile: null,
  setStaysProfile: (staysProfile) => set({ staysProfile }),
  loading: false,
  setLoading: (loading) => set({ loading }),

  getStaysMe: async () => {
    try {
      const { setStaysProfile, setLoading } = get();
      setLoading(true)
      const { data } = await api.get("/service/stays/profile");
      console.log(data?.data)
      setStaysProfile(data?.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw new Error(error?.response?.data?.message || "Something went wrong");
    }
  }
}));
