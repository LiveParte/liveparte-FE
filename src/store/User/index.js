import {
  accessTokenStorageName,
  decryptObject,
  storage,
  userDetailStorageName,
} from "@/utils/helper";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    _id: false,
    countryInfo: {
      name: null,
    },
  }, // for user object
  error: null,
  success: false,
  loading: false,
  location: {},
  coins: 0,
  event: {},
  lastEventAttended: {},
  locked: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.userData = payload;
      state.userInfo = payload;
      state.loading = true;
      state.isLoggedIn = payload?._id ? true : false;
      state;
    },
    setLocation: (state, { payload }) => {
      state.location = payload;

      state;
    },
    setSingleEvent: (state, { payload }) => {
      state.event = payload;
      state;
    },
    setCoins: (state, { payload }) => {
      state.coins = payload;
      state;
    },
    setLastEventAttended: (state, { payload }) => {
      state.lastEventAttended = payload;
      state;
    },
    
    logout: (state) => {
      state.userData = null;
      state.userInfo = {};
      state.coins = 0;
      state.location = {};
      state.event = {};
      storage["localStorage"].remove(userDetailStorageName);
      storage["localStorage"].remove(accessTokenStorageName);
      state.isLoggedIn = false;
    },
    lockOrientation(state) {
      state.locked = true;
    },
    unlockOrientation(state) {
      state.locked = false;
    },
  },
});

// export const { reducer, actions } = authSlice;
export const {
  logout,
  setUserData,
  setLocation,
  setCoins,
  setSingleEvent,
  setLastEventAttended,
  lockOrientation,
  unlockOrientation
} = authSlice?.actions;
export default authSlice.reducer;
export const selectOrientationLocked = (state) => state.auth.locked;

// export const authState = reducer;
// export const selectCurrentPharamaserveData = (state) => state.auth.pharamData;
export const selectLocation = (state) => state.auth.location;
export const selectLastEventAttended = (state) => state.auth?.lastEventAttended;

export const selectCoins = (state) => state.auth.coins;
export const selectEvent = (state) => state.auth?.event;
export const selectCurrentUserData = (state) => state.auth.userInfo;
export const selectAllCurrentUserData = (state) => state.auth.userAllDetails;
export const Check = (state) => state.auth;
export const selectCurrentPharamaserveId = (state) => state.auth.companyId;
export const isAuth = (state) => state.auth.isLoggedIn;
