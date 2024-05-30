import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: {name:'Call'}, // for user object
  liveStream: {},
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
      console.log(payload,"setEventData")
      state.event = payload;
      state;
    },
    setLiveStreamEventData: (state, { payload }) => {
      state.liveStream = payload;
      state;
    },
  },
});

export const { setEventData, setLiveStreamEventData  } = eventSlice?.actions;
export default eventSlice.reducer;
// export const { setEventData, setLiveStreamEventData } = actions;
// export const eventState = reducer;
export const selectEvent = (state) => state.event?.event;
export const selectLiveStreamEvent = (state) => state.event?.liveStream;
