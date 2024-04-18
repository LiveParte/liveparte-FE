import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: {}, // for user object
  liveStream:{},
  error: null,
  success: false,
  loading: false,
  //
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventData: (state, { payload }) => {
      state.event = payload;

      state;
    },
    setLiveStreamEventData: (state, { payload }) => {
      state.liveStream = payload;

      state;
    },
  },
});

export const { reducer, actions } = eventSlice;
export const { setEventData,setLiveStreamEventData } = actions;
export const eventState = reducer;
export const selectEvent = (state) => state.event?.event;
export const selectLiveStreamEvent = (state) => state.event?.liveStream;