import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileSize: "",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setMobileSize: (state, { payload }) => {
      state.mobileSize = payload;
    },
  },
});

export const { setMobileSize } = settingSlice?.actions;
export default settingSlice.reducer;
export const selectSize = (state) => state.setting?.mobileSize;
