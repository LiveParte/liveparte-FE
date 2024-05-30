import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import authSlice from "./User";
import { eventApi } from "./Event/eventApi";
import { transactionApi } from "./Transaction/transactionApi";
// import { storage, userDetailStorageName } from "@/utils/helper";
import { eventSlice } from "./Event";
import { otherApi } from "./others/othersApi";
// import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { setupListeners } from "@reduxjs/toolkit/query";

const createNoopStorage = () => {
  return {
     getItem(_key) {
        return Promise.resolve(null);
     },
     setItem(_key, value) {
        return Promise.resolve(value);
     },
     removeItem(_key) {
        return Promise.resolve();
     },
  };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();




const rootReducer = combineReducers({
  auth: authSlice,
  event: eventSlice,
  [userApi.reducerPath]: userApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [otherApi.reducerPath]: otherApi.reducer
});

// const storedUserData = storage.localStorage.get(userDetailStorageName);

const persistConfig = {
key:'root',
storage,
blacklist: ['userApi','eventApi','otherApi','transactionApi'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    }).concat(
      userApi.middleware,
      eventApi.middleware,
      otherApi.middleware,
      transactionApi?.middleware 
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
// export type AppDispatch = typeof store.dispatch;