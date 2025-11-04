import create from "zustand";

export const useStore = create((set) => ({
  event: {},
  setEvent: (event) => set({ event }),

  // Auth UI/client state
  auth: {
    isAuthenticated: false,
    user: null,
  },
  setAuthenticated: (isAuthenticated) =>
    set((state) => ({ auth: { ...state.auth, isAuthenticated } })),
  setUser: (user) => set((state) => ({ auth: { ...state.auth, user } })),
}));
