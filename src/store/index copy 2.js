import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./User/userApi";
import { authSlice, setLocation, setUserData } from "./User";
import { eventApi } from "./Event/eventApi";
import { transactionApi } from "./Transaction/transactionApi";
import { eventSlice } from "./Event";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authSlice,
  // event: eventSlice,
  [userApi.reducerPath]: userApi.reducer,
  // [eventApi.reducerPath]: eventApi.reducer,
  // [transactionApi.reducerPath]: transactionApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // blocklist: ['userApi','auth','eventApi','transactionApi','event']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware,),

  // middleware: (getDefaultMiddleware) => [
  //   // userApi.middleware,
  //   // eventApi.middleware,
  //   ...getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  
  //   // Add a default empty array if middleware is undefined
  // ],
});

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   ],
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware().concat(
//   //     userApi.middleware,
//   //     eventApi.middleware,
//   //     transactionApi?.middleware || [] // Add a default empty array if middleware is undefined
//   //   ),
// });

export const persistor = persistStore(store);
export default store;
