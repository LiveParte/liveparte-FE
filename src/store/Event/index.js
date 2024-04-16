import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: {}, // for user object
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
  },
});

export const { reducer, actions } = eventSlice;
export const { setEventData } = actions;
export const eventState = reducer;
export const selectEvent = (state) => state.event?.event;
