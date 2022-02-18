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
        },

        addTrack: (state, action) => {
            state.savedTracks = [action.payload, ...state.savedTracks]
        },

        removeTrack: (state, action) => {
            state.savedTracks = state.savedTracks.filter(track => track.id !== action.payload)
        }
    },
})

export const { setSavedTracks, addTrack, removeTrack, } = savedTracksSlice.actions;

export default savedTracksSlice.reducer;
