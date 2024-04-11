import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import { authSlice, setUserData } from "./User";
import { eventApi } from "./Event/eventApi";
import { transactionApi } from "./Transaction/transactionApi";
import { storage, userDetailStorageName } from "@/utils/helper";


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
const storedUserData = storage.localStorage.get(userDetailStorageName);
console.log(storedUserData,'storedUserData')

// If user login data exists, dispatch action to update Redux store
const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    throw new SyntaxError("The provided data is not valid JSON.");
  }
};

try {
  if (storedUserData && isJSON(storedUserData)) {
    const userData = JSON.parse(storedUserData);
    store.dispatch(setUserData(userData));
  } else {
    console.error('Stored user data is not in JSON format or does not exist.');
    // Handle the case where storedUserData is not in JSON format or does not exist
  }
} catch (error) {
  console.error(error.message);
  // Handle the specific error here if needed
}
export default store;
// setupListeners(store.dispatch);
