// src/store/authStore.js
import { create } from 'zustand';
import axios from 'axios';

// Configure Axios defaults (adjust the baseURL to your backend)
const API_BASE_URL = 'http://localhost:5000'; // Use environment variable
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for sending/receiving cookies (like your JWT)
});

// Optional: Add interceptors for global error handling or loading states
// api.interceptors.request.use(...) / api.interceptors.response.use(...)

const useAuthStore = create((set, get) => ({
  user: null, // Stores user data when logged in
  isAuthenticated: false, // Simple flag for auth status
  loading: false, // For UI feedback during async operations
  error: null, // Stores error messages

  // Register a new user
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/api/auth/register', userData);
      const userDataFromServer = response.data;
      set({ user: userDataFromServer, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      set({ error: errorMsg, loading: false });
      return { success: false, error: errorMsg };
    }
  },

  // Login with email and password
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/api/auth/login', credentials);
      const userDataFromServer = response.data;
      set({ user: userDataFromServer, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      set({ error: errorMsg, loading: false });
      return { success: false, error: errorMsg };
    }
  },

  // Logout the user
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await api.post('/api/auth/logout'); // Tell backend to clear cookie
      set({ user: null, isAuthenticated: false, loading: false, error: null });
    } catch (err) {
      // Even if logout API fails, clear local state
      console.error("Logout API error (clearing local state anyway):", err);
      set({ user: null, isAuthenticated: false, loading: false });
      // Optionally set an error if you want to inform the user
      // set({ error: 'Logout request failed, but you are logged out locally.' });
    }
  },

  // Fetch current user data (check if already logged in)
  fetchUser: async () => {
    // Prevent multiple simultaneous fetches if already loading or user exists
    if (get().loading || get().user) return;

    set({ loading: true, error: null });
    try {
      const response = await api.get('/api/auth/me');
      const userDataFromServer = response.data;
      set({ user: userDataFromServer, isAuthenticated: true, loading: false });
    } catch (err) {
      // If fetching user fails (e.g., no valid token), ensure state is clean
      console.error("Fetch user error:", err);
      set({ user: null, isAuthenticated: false, loading: false });
      // Don't necessarily set error here, as it's expected if not logged in
    }
  },

  // Clear any stored error message
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
