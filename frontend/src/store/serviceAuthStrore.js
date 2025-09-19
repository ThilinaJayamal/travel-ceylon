import { create } from "zustand";
import { api } from "../config/api";

export const useServiceAuthStore = create((set) => ({
    user: null,       // stores logged-in user info
    loading: false,   // request loading state
    error: null,      // error message

    // LOGIN
    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post("/service-provider/login", credentials);
            console.log(data);

            if (data?.data) {
                set({ user: data?.data, loading: false });
            } else {
                set({ user: null, loading: false });
            }

        } catch (err) {
            set({ user: null, error: err.response?.data?.message || err.message, loading: false });
        }
    },

    // REGISTER
    register: async (userData) => {
        try {
            const { data } = await api.post("/service-provider", userData);
            console.log(data);

            if (data?.data) {
                set({ user: data?.data, loading: false });
            } else {
                set({ user: null, loading: false });
            }

        } catch (err) {
            set({ user: null, error: err.response?.data?.message || err.message, loading: false });
        }
    },

    // LOGOUT
    logout: async () => {
        try {
            const { data } = await api.post("/service-provider/logout");
            console.log(data)
            set({ user: null, loading: false });
        } catch (err) {
            set({ user: null, error: err.response?.data?.message || err.message, loading: false });
        }
    },

    // LOAD USER (on app start)
    loadUser: async () => {
        try {
            const { data } = await api.get("/service-provider/me");
            console.log(data)
            if (data?.data) {
                const tempObj = {};

                tempObj._id = data?.data.profile._id;
                tempObj.email = data?.data.profile.email;
                tempObj.role = data?.data.role;
                tempObj.serviceType = data?.data.profile?.serviceType || "";
                tempObj.serviceId = data?.data.profile?.serviceId || "";

                set({ user: tempObj, loading: false });
            } else {
                set({ user: null, loading: false });
            }

        } catch (err) {
            return null;
        }
    },

    clearError: () => {
        set({ error: null })
    }
}));
