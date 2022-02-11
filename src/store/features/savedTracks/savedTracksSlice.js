import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedTracks: []
}

export const savedTracksSlice = createSlice({
    name: 'savedTracks',
    initialState,
    reducers: {
        setSavedTracks: (state, action) => {
            state.savedTracks = action.payload
        }
    },
})

export const { setSavedTracks } = savedTracksSlice.actions;

export default savedTracksSlice.reducer;
