export const playlistsSelector = (state) => state.playlists.playlists;

export const tracksFromPlaylistByIdSelector = (state) => (id) => {
    const playlists = state.playlists.playlists;
    const playlist = playlists.find(pl => pl.id === id);
    return playlist.tracks;
}
