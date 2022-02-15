import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlistINFO: null,
    tracks: []
}

export const currentPlaylistSlice = createSlice({
    name: 'currentPlaylist',
    initialState,
    reducers: {
        setPlaylistINFO: (state, action) => {
            state.playlistINFO = action.payload
        },
        setPlayListTracks: (state, action) => {
            state.tracks = action.payload
        }
    },
})

export const { setPlaylistINFO, setPlayListTracks } = currentPlaylistSlice.actions;

export default currentPlaylistSlice.reducer;
