import {
  accessTokenStorageName,
  decryptObject,
  storage,
  userDetailStorageName,
} from "@/utils/helper";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {}, // for user object
  error: null,
  success: false,
  loading: false,
  //
};

const authMiddleware = (store) => (next) => (action) => {
  if (authActions.login.match(action)) {
    // Note: localStorage expects a string
    localStorage.setItem("isAuthenticated", "true");
  } else if (authActions.logout.match(action)) {
    localStorage.setItem("isAuthenticated", "false");
  }
  return next(action);
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPharamData: (state, { payload }) => {
      state.pharamData = payload;
      state.companyId = payload.company_id;
      // storage["localStorage"].set("RechargeMater_User", payload)
      state.loading = true;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
      state.userInfo =  payload;
      state.loading = true;
      state.isLoggedIn = payload?._id ? true : false;
      state;
    },
    logout: (state) => {
      state.userData = null;
      (state.userInfo = {}),
        storage["localStorage"].remove(userDetailStorageName);
      storage["localStorage"].remove(accessTokenStorageName);

      state.isLoggedIn = false;
    },
  },
});

export const { reducer, actions } = authSlice;
export const { logout, setPharamData, setUserData } = actions;
export const authState = reducer;
export const selectCurrentPharamaserveData = (state) => state.auth.pharamData;
export const selectCurrentUserData = (state) => state.auth.userInfo;
export const selectAllCurrentUserData = (state) => state.auth.userAllDetails;
export const Check = (state) => state.auth;
export const selectCurrentPharamaserveId = (state) => state.auth.companyId;
export const isAuth = (state) => state.auth.isLoggedIn;
