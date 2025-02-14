import { createSlice } from "@reduxjs/toolkit";

const langChangeSlice = createSlice({
  name: "config",
  initialState: {
    lang: "English",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLanguage } = langChangeSlice.actions;
export default langChangeSlice.reducer;
