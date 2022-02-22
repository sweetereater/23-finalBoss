export const activeTracksSelector = (state) =>
  state.playerActiveTracks.playerActiveTracks;

export const currentTrackSelector = (state) =>
  state.playerActiveTracks.currentTrack;

export const currentTrackIdSelector = (state) =>
  state.playerActiveTracks.currentTrackId;

export const isPlayingSelector = (state) => state.playerActiveTracks.isPlaying;

export const currentMusicSourceSelector = (state) =>
  state.playerActiveTracks.musicSource;
