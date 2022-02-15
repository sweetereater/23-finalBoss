export const activeTracksSelector = (state) => state.playerActiveTracks.playerActiveTracks;

export const currentTrackSelector = (state) => state.playerActiveTracks.currentTrack;

export const isPlayingSelector = (state) => state.playerActiveTracks.isPlaying;

export const currentMusicSourceSelector = (state) => state.playerActiveTracks.musicSource