import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userTopTracks: [],
}

export const mainPageSlice = createSlice({
    name: 'currentTracks',
    initialState,
    reducers: {
        setUserTopTracks: (state, action) => {
            state.userTopTracks = action.payload;
        },
    },
})

export const { setUserTopTracks } = mainPageSlice.actions;

export default mainPageSlice.reducer;