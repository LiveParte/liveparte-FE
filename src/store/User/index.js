import { accessTokenStorageName, decryptObject, storage, userDetailStorageName } from "@/utils/helper";
import { createSlice ,current} from "@reduxjs/toolkit";
// import { storage } from "../../utils/helper";
// let userInfo =storage["localStorage"].get(userDetailStorageName)&& decryptObject(storage["localStorage"].get(userDetailStorageName));
let userInfo =storage["localStorage"].get(userDetailStorageName)&& JSON.parse(storage["localStorage"].get(userDetailStorageName));

const initialState = {
//   loading: storage["localStorage"].get('user')?.user?true:false,
  isLoggedIn: false,
  userInfo:userInfo, // for user object
 
  error: null,
  success: false, 
  // isLoggedIn: storage["localStorage"].get('RechargeMater_accessToken')&&true,
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
   
      state.userInfo=userInfo||payload,
    //  alert(payload,'payloadpayload')
      state.loading=true,
      // state.isLoggedIn=true,
      state.isLoggedIn=storage["localStorage"].get(accessTokenStorageName)&&true,
      // alert("RechargeMater")
    state
    },
    logout: (state)=>{
      state.pharamData = null;
      state.userData = null;
      state.userInfo={},
      storage["localStorage"].remove(userDetailStorageName);
      storage["localStorage"].remove(accessTokenStorageName)

      state.isLoggedIn=false;
     
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

