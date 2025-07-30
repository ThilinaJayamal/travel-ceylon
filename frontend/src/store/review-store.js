import { create } from 'zustand';
import axios from 'axios';
import {toast} from 'react-hot-toast'

axios.defaults.withCredentials = true;

export const useReviewStore = create((set) => ({
    reviews: [],
    loading: false,

    // ✅ Create Review
    createPlatformReview: async (reviewData) => {
        try {
            set({ loading: true, error: null });
            const res = await axios.post('/api/reviews/platform', reviewData);
            set((state) => ({
                reviews: [...state.reviews, res.data.data],
                loading: false,
            }));
            toast.success("Successfully added your review!")
        } catch (err) {
            set({ loading: false})
            toast.error(err.response?.data?.message)
        }
    },

    // ✅ Get Reviews for a service
    getReviews: async (serviceType, serviceId) => {
        try {
            set({ loading: true, error: null });
            const res = await axios.get(`/api/reviews?serviceType=${serviceType}&serviceId=${serviceId}`);
            set({ reviews: res.data.data, loading: false });
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || 'Fetch failed' });
        }
    },

    getPlatformReviews: async () => {
        try {
            const { data } = await axios.get('/api/reviews/platform');
            return data;
        } catch (error) {
            set({ loading: false, error: err.response?.data?.message || 'Fetch failed' });
        }
    },

    // ✅ Delete Review by ID
    deleteReview: async (reviewId) => {
        try {
            set({ loading: true, error: null });
            await axios.delete(`/api/reviews/${reviewId}`);
            set((state) => ({
                reviews: state.reviews.filter((r) => r._id !== reviewId),
                loading: false,
            }));
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || 'Delete failed' });
            throw err;
        }
    },

    // ✅ Update Review
    updateReview: async (reviewId, updatedData) => {
        try {
            set({ loading: true, error: null });
            const res = await axios.put(`/api/reviews/${reviewId}`, updatedData);
            set((state) => ({
                reviews: state.reviews.map((r) => (r._id === reviewId ? res.data.data : r)),
                loading: false,
            }));
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || 'Update failed' });
            throw err;
        }
    },
}));
