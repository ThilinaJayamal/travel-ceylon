import { create } from "zustand";
import { api } from "../config/api";

export const useStaysStore = create((set) => ({
  result: null,      // available stays result
  loading: false,    // request loading state
  error: null,       // error message


  getAvailableStays: async (filters) => {
    set({ loading: true, error: null });

    try {
      console.log(filters)
      let url = `/service/stays/available?start_date=${filters?.checkIn}&end_date=${filters?.checkOut}&location=${filters?.destination}&numberOfGuest=${filters?.guests}&numberOfRooms=${filters?.rooms}`;
      console.log(filters)
      const { data } = await api.get(url);
      //console.log(data?.data)
      set({ result: data?.data || null, loading: false });
    } catch (err) {
      console.log(err)
      set({
        result: null,
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));
