import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import { authSlice } from "./User";
import { eventApi } from "./Event/eventApi";

export const store = configureStore({
  // preloadedState: result ? { auth: result } : undefined,
  reducer: {
    auth: authSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, eventApi.middleware),
});

export default store;
// setupListeners(store.dispatch);
