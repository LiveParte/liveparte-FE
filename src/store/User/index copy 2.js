
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
  }, // for user object
  error: null,
  success: false,
  loading: false,
  location:{},
  coins:[],
  //
};


 const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.userData = payload;
      state.userInfo =  payload;
      state.loading = true;
      state.isLoggedIn = payload?._id ? true : false;
      state;
    },
    setLocation: (state, { payload }) => {
      state.location = payload;
     
      state;
    },
    setCoins: (state, { payload }) => {
      state.coins = payload;
     
      state;
    },
    logout: (state) => {
      state.userData = null;
      state.userInfo = {},
      //   storage["localStorage"].remove(userDetailStorageName);
      // storage["localStorage"].remove(accessTokenStorageName);

      state.isLoggedIn = false;
    },
  },
});

export const {  actions } = authSlice;
export const { logout,  setUserData,setLocation,setCoins } = actions;
export default authSlice.reducer;

