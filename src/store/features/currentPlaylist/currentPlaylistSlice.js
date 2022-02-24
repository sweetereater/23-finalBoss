import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlistINFO: null,
  tracks: [],
};

export const currentPlaylistSlice = createSlice({
  name: "currentPlaylist",
  initialState,
  reducers: {
    setPlaylistINFO: (state, action) => {
      state.playlistINFO = action.payload;
    },
    setPlayListTracks: (state, action) => {
      state.tracks = action.payload;
    },
    addTrackToPlaylist: (state, action) => {
      state.tracks = [action.payload, ...state.tracks];
    },
    removeTrackFromPlaylist: (state, action) => {
      state.tracks = state.tracks.filter(
        (track) => track.id !== action.payload
      );
    },
  },
});

export const {
  setPlaylistINFO,
  setPlayListTracks,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} = currentPlaylistSlice.actions;

export default currentPlaylistSlice.reducer;
