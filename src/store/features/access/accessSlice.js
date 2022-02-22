import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

export const acceccSlice = createSlice({
  name: "access",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = acceccSlice.actions;
export default acceccSlice.reducer;
