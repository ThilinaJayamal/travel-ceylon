import { create } from 'zustand';

export const useAppStore = create((set) => ({
    reviewOpen: false,
    toggleReviewOpen: () => set((state) => ({ reviewOpen: !state.reviewOpen }))
}))