import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerActiveTracks: [],
}

export const playerActiveTracksSlice = createSlice({
    name: 'playerActiveTracks',
    initialState,
    reducers: {
        setPlayerActiveTracks: (state, action) => {
            state.playerActiveTracks = action.payload;
        }
    },
})

export const { setPlayerActiveTracks } = playerActiveTracksSlice.actions;

export default playerActiveTracksSlice.reducer;