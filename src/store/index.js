import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import authSlice from "./User";
import { eventApi } from "./Event/eventApi";
import { transactionApi } from "./Transaction/transactionApi";
import { eventSlice } from "./Event";
import { otherApi } from "./others/othersApi";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { setupListeners } from "@reduxjs/toolkit/query";
import settingReducer from "./settings"; // Import the reducer
import { stripPaymentApi } from "./others/stripPayment";

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
  setting: settingReducer, // Use the imported reducer
  [userApi.reducerPath]: userApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [otherApi.reducerPath]: otherApi.reducer,
  [stripPaymentApi.reducerPath]: stripPaymentApi.reducer
  //stripPaymentApi
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userApi', 'eventApi', 'otherApi', 'transactionApi','stripPaymentApi'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      userApi.middleware,
      eventApi.middleware,
      otherApi.middleware,
      transactionApi.middleware,
      stripPaymentApi.middleware,
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
