import create from 'zustand';

export const useStore = create((set) => ({
  event: {},
  setEvent: (event) => set({ event: event }),
}));