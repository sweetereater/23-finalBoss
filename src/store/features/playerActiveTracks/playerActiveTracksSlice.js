import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  musicSource: null,
  isPlaying: false,
  currentTrack: 0,
  currentTrackId: null,
  playerActiveTracks: [],
};

export const playerActiveTracksSlice = createSlice({
  name: "playerActiveTracks",
  initialState,
  reducers: {
    setPlayerActiveTracks: (state, action) => {
      state.playerActiveTracks = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setCurrentTrackId: (state, action) => {
      state.currentTrackId = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setMusicSource: (state, action) => {
      state.musicSource = action.payload;
    },
  },
});

export const {
  setPlayerActiveTracks,
  setCurrentTrack,
  setIsPlaying,
  setMusicSource,
  setCurrentTrackId,
} = playerActiveTracksSlice.actions;

export default playerActiveTracksSlice.reducer;
