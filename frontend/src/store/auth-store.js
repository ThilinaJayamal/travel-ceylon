import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

// Configure axios to send cookies with requests
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({

  // Auth state
  user: "",
  isAuthenticated: false,
  loading: false,
  error: null,

  // Auth actions
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { user } = response.data;

      set({ user, isAuthenticated: true, loading: false });
      toast.success("Successfully Login!");
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage)
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { user } = response.data;

      set({ user, isAuthenticated: true, loading: false });
      toast.success("Successfully Registered!");
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage)
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/auth/logout');
      toast.success("Successfully Logout!");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  // Check authentication status
  checkAuthStatus: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/api/auth/me');
      const { user } = response.data;
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  }
}));