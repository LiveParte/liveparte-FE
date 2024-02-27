import { storage } from "@/utils/helper";
import { createSlice ,current} from "@reduxjs/toolkit";
// import { storage } from "../../utils/helper";
let userInfo ='';
const initialState = {
//   loading: storage["localStorage"].get('user')?.user?true:false,
  isLoggedIn: false,
  userInfo:(userInfo &&typeof userInfo ==="string")&& JSON.parse(storage["localStorage"].get('RechargeMater_User')), // for user object
  userAllDetails : storage["localStorage"].get('RechargeMater_User'),
  // userToken: getAuthToken(), // for storing the JWT
  error: null,
  success: false, 
  isLoggedIn: storage["localStorage"].get('RechargeMater_accessToken')&&true,
  // 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPharamData: (state, {payload}) => {
      state.pharamData = payload;
      state.companyId = payload.company_id
      // storage["localStorage"].set("RechargeMater_User", payload)
      state.loading=true

    },
    setUserData: (state, {payload}) => {
      state.userData = payload;
      state.token= payload.token
      // storage["cookieStorage"].set("RechargeMater_User", payload)
    state.userInfo=JSON.parse(storage["localStorage"].get('RechargeMater_User')),
      state.loading=true,
      // state.isLoggedIn=true,
      state.isLoggedIn=storage["localStorage"].get('RechargeMater_accessToken')&&true,
      // alert("RechargeMater")
    state
    },
    logout: (state)=>{
      state.pharamData = null;
      state.userData = null;
      storage["localStorage"].remove("RechargeMater_User");
      storage["localStorage"].remove("RechargeMater_accessToken")

      state.isLoggedIn=false
    }
  },
});

export const { reducer, actions } = authSlice; 
export const { logout, setPharamData, setUserData } = actions;
export const authState = reducer 
export const selectCurrentPharamaserveData = (state)=> state.auth.pharamData
export const selectCurrentUserData = (state)=> state.auth.userInfo
export const selectAllCurrentUserData = (state)=> state.auth.userAllDetails
export const Check = (state)=> state.auth
export const selectCurrentPharamaserveId = (state)=> state.auth.companyId
export const isAuth = (state)=> state.auth.isLoggedIn

