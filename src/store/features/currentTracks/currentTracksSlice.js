import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTracks: [],
}

export const currentTracksSlice = createSlice({
    name: 'currentTracks',
    initialState,
    reducers: {
        setCurrentTracks: (state, action) => {
            state.currentTracks = action.payload;
        },
    },
})

export const { setCurrentTracks } = currentTracksSlice.actions;

export default currentTracksSlice.reducer;