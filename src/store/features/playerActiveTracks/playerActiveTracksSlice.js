import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false,
    currentTrack: 0,
    playerActiveTracks: [],
}

export const playerActiveTracksSlice = createSlice({
    name: 'playerActiveTracks',
    initialState,
    reducers: {
        setPlayerActiveTracks: (state, action) => {
            state.playerActiveTracks = action.payload;
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        }
    },
})

export const { setPlayerActiveTracks, setCurrentTrack, setIsPlaying } = playerActiveTracksSlice.actions;

export default playerActiveTracksSlice.reducer;