import { create } from 'zustand';
import { api } from '../config/api';
import { converDataForBill } from '../config/convertDataForBill';

export const useBookingsStore = create((set) => ({
    billData: [],
    loading: false,
    error: null,

    fetchBookings: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.get('/user/bookings');

            const formatedData = converDataForBill(data);
            set({ billData: formatedData, loading: false });
        } catch (err) {
            console.error('Failed to fetch bookings', err);
            set({ error: err.message || 'Error fetching bookings', loading: false });
        }
    }
}));
