import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import { authSlice, setLocation, setUserData } from "./User";
import { eventApi } from "./Event/eventApi";
import { transactionApi } from "./Transaction/transactionApi";
import { storage, userDetailStorageName } from "@/utils/helper";
import { eventSlice } from "./Event";
import { isJSON } from "@/utils/reusableComponent";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    event: eventSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      eventApi.middleware,
      transactionApi?.middleware || [] // Add a default empty array if middleware is undefined
    ),
});

// const storedUserData = storage.localStorage.get(userDetailStorageName);
// const isLoc=storage.cookieStorage.get('userLo');

// // console.log(storedUserData,'storedUserData');

// if (storedUserData && isJSON(storedUserData)) {
//   const userData = JSON.parse(storedUserData);
//   store.dispatch(setUserData(userData));
// } else {
//   store.dispatch(setUserData({}));
//   // console.error('Stored user data is not in JSON format or does not exist.');
// }
// if (storedUserData && isJSON(storedUserData)) {
//   const userData = JSON.parse(storedUserData);
//   store.dispatch(setUserData(userData));
// } else {
//   store.dispatch(setUserData({
//     _id:false
//   }));
//   // console.error('Stored user data is not in JSON format or does not exist.');
// }

// if(isLoc &&isJSON(JSON.stringify(isLoc))){
//   store.dispatch(setLocation(JSON.stringify(isLoc)));
// }


// storage.cookieStorage.set('userLo',JSON.stringify(response?.data))
// try {

// } catch (error) {
//   // console.error(error.message);
// }

export default store;
