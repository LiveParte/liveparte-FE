import {
  accessTokenStorageName,
  decryptObject,
  storage,
  userDetailStorageName,
} from "@/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, LiveStreamData, Event } from "@/types";

interface UserState {
  userInfo: User | {
    _id: false;
    countryInfo: {
      name: string | null;
    };
  };
  userData?: User | null;
  userAllDetails?: any;
  error: string | null;
  success: boolean;
  loading: boolean;
  isLoggedIn: boolean;
  location: {
    latitude?: number;
    longitude?: number;
    country?: string;
    city?: string;
  };
  coins: number;
  event: Event | {};
  lastEventAttended: Event | {};
  locked: boolean;
  paymentEvent: any;
  liveStreamEvent: LiveStreamData | {};
  companyId?: string;
  pharamData?: any;
}

const initialState: UserState = {
  userInfo: {
    _id: false,
    countryInfo: {
      name: null,
    },
  },
  error: null,
  success: false,
  loading: false,
  isLoggedIn: false,
  location: {},
  coins: 0,
  event: {},
  lastEventAttended: {},
  locked: false,
  paymentEvent: {},
  liveStreamEvent: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      state.userInfo = action.payload;
      state.loading = true;
      state.isLoggedIn = action.payload?._id ? true : false;
    },
    setLocation: (state, action: PayloadAction<{
      latitude?: number;
      longitude?: number;
      country?: string;
      city?: string;
    }>) => {
      state.location = action.payload;
    },
    setSingleEvent: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
    },
    setCoins: (state, action: PayloadAction<number>) => {
      state.coins = action.payload;
    },
    setLastEventAttended: (state, action: PayloadAction<Event>) => {
      state.lastEventAttended = action.payload;
    },
    setStripPaidEvent: (state, action: PayloadAction<any>) => {
      state.paymentEvent = action.payload;
    },
    setLiveStreamEvent: (state, action: PayloadAction<LiveStreamData>) => {
      state.liveStreamEvent = action.payload;
    },
    logout: (state) => {
      state.userData = null;
      state.userInfo = {
        _id: false,
        countryInfo: {
          name: null,
        },
      };
      state.coins = 0;
      state.location = {};
      state.event = {};
      state.isLoggedIn = false;
      state.liveStreamEvent = {};
      state.paymentEvent = {};
      
      if (typeof window !== 'undefined') {
        storage["localStorage"].remove(userDetailStorageName);
        storage["localStorage"].remove(accessTokenStorageName);
      }
    },
    lockOrientation: (state) => {
      state.locked = true;
    },
    unlockOrientation: (state) => {
      state.locked = false;
    },
  },
});

export const {
  logout,
  setUserData,
  setLocation,
  setCoins,
  setSingleEvent,
  setLastEventAttended,
  setStripPaidEvent,
  lockOrientation,
  unlockOrientation,
  setLiveStreamEvent
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectOrientationLocked = (state: { auth: UserState }) => state.auth.locked;
export const selectLocation = (state: { auth: UserState }) => state.auth.location;
export const selectLiveStreamEvent = (state: { auth: UserState }) => state.auth.liveStreamEvent;
export const selectLastEventAttended = (state: { auth: UserState }) => state.auth.lastEventAttended;
export const selectStripPaidEvent = (state: { auth: UserState }) => state.auth.paymentEvent;
export const selectCoins = (state: { auth: UserState }) => state.auth.coins;
export const selectEvent = (state: { auth: UserState }) => state.auth.event;
export const selectCurrentUserData = (state: { auth: UserState }) => state.auth.userInfo;
export const selectAllCurrentUserData = (state: { auth: UserState }) => state.auth.userAllDetails;
export const Check = (state: { auth: UserState }) => state.auth;
export const selectCurrentPharamaserveId = (state: { auth: UserState }) => state.auth.companyId;
export const isAuth = (state: { auth: UserState }) => state.auth.isLoggedIn;
