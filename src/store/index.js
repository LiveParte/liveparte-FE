import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import { authSlice, setUserData } from "./User";
import { eventApi } from "./Event/eventApi";
import { transactionApi } from "./Transaction/transactionApi";
import { userDetailStorageName } from "@/utils/helper";


//MIDDLEWARE
// const cartMiddleware = ({ getState }) => {
//   return (next) => (action) => {
//     const result = next(action);
//     localStorage.setItem("cartData", JSON.stringify(getState()));
//     return result;
//   };
// };

export const store = configureStore({
  // preloadedState: result ? { auth: result } : undefined,
  reducer: {
    auth: authSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      eventApi.middleware,
      transactionApi?.middleware,
      // cartMiddleware
    ),
});

// Check if user login data exists in localStorage
// const storedUserData = localStorage.getItem(userDetailStorageName);

// // If user login data exists, dispatch action to update Redux store
// if (storedUserData) {
//   const userData = JSON.parse(storedUserData);
//   store.dispatch(setUserData(userData));
// }
// 
export default store;
// setupListeners(store.dispatch);
