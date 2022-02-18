import { Plumbing } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlists: []
}

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload
        },
        addTracksToPlaylist: (state, action) => {
            console.log(action);
            state.playlists = state.playlists.map(pl => pl.id === action.payload.id ? { ...pl, tracks: action.payload.tracks } : pl)
        }
    },
})

export const { setPlaylists, addTracksToPlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;
