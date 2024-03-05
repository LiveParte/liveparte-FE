import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import { authSlice } from "./User";
import { dashboardApi } from "./Dashboard/dashboardApi";
import { transactionApi } from "./Transaction/transactionApi";

export const store = configureStore({
  // preloadedState: result ? { auth: result } : undefined,
  reducer: {
    auth: authSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // [dashboardApi.reducerPath]: dashboardApi.reducer,
    // [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      // dashboardApi.middleware,
      // transactionApi.middleware
    ),
});

export default store;
// setupListeners(store.dispatch);
