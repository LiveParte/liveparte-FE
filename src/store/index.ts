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
import settingReducer from "./settings";
import { stripPaymentApi } from "./others/stripPayment";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootReducer = combineReducers({
  auth: authSlice,
  event: eventSlice,
  setting: settingReducer,
  [userApi.reducerPath]: userApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [otherApi.reducerPath]: otherApi.reducer,
  [stripPaymentApi.reducerPath]: stripPaymentApi.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userApi', 'eventApi', 'otherApi', 'transactionApi', 'stripPaymentApi'],
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
    ) as any, // Type assertion to bypass complex typing issues
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
