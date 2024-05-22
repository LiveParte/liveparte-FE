import {
  accessTokenStorageName,
  decryptObject,
  storage,
  userDetailStorageName,
} from "@/utils/helper";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    _id:false,
    countryInfo:{
    name:null
    }
  }, // for user object
  error: null,
  success: false,
  loading: false,
  location:{},
  coins:[],
 
  //
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
      // console.log(payload,'payload')
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
      state.userInfo = {};
        storage["localStorage"].remove(userDetailStorageName);
      storage["localStorage"].remove(accessTokenStorageName);
      // alert('hello world')
      state.isLoggedIn = false;
    },
  },
});

// export const { reducer, actions } = authSlice;
export const { logout, setPharamData, setUserData,setLocation,setCoins } = authSlice?.actions;
export default  authSlice.reducer
// export const authState = reducer;
export const selectCurrentPharamaserveData = (state) => state.auth.pharamData;
export const selectLocation = (state) => state.auth.location;
export const selectCoins = (state) => state.auth.coins;
export const selectCurrentUserData = (state) => state.auth.userInfo;
export const selectAllCurrentUserData = (state) => state.auth.userAllDetails;
export const Check = (state) => state.auth;
export const selectCurrentPharamaserveId = (state) => state.auth.companyId;
export const isAuth = (state) => state.auth.isLoggedIn;
