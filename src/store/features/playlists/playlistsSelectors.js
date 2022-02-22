export const playlistsSelector = (state) => state.playlists.playlists;

export const tracksFromPlaylistByIdSelector = (state) => (id) => {
  const playlists = state.playlists.playlists;
  const playlist = playlists.find((pl) => pl.id === id);
  if (playlist) return playlist.tracks;
  return null;
};
