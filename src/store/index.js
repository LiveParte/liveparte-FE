import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import { authSlice, setUserData } from "./User";
import { eventApi } from "./Event/eventApi";
import { transactionApi } from "./Transaction/transactionApi";
import { storage, userDetailStorageName } from "@/utils/helper";
import { eventSlice } from "./Event";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    event:eventSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      eventApi.middleware,
      transactionApi?.middleware || [], // Add a default empty array if middleware is undefined
    ),
});

const storedUserData = storage.localStorage.get(userDetailStorageName);

const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

try {
  if (storedUserData && isJSON(storedUserData)) {
    const userData = JSON.parse(storedUserData);
    store.dispatch(setUserData(userData));
  } else {
    console.error('Stored user data is not in JSON format or does not exist.');
  }
} catch (error) {
  console.error(error.message);
}

export default store;
