import { create } from 'zustand';

export const useAppStore = create((set) => ({
    reviewOpen: false,
    reviewBelongsTo:null,

    toggleReviewOpen: () => set((state) => ({ reviewOpen: !state.reviewOpen })),

    setReviewBelongsTo:(name)=>(set({reviewBelongsTo:name}))
}))