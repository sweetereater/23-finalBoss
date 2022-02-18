import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI'
import { setLoading } from "../loader/loaderSlice";
import { addTracksToPlaylist } from "../playlists/playlistsSlice";
import { getSavedTracks } from "../savedTracks/savedTracksThunks";
import { setPlayListTracks } from "./currentPlaylistSlice";

export const getCurrentPlaylistTracks = createAsyncThunk('currentPlayList/getPlaylistTracks', async (id, { getState, dispatch }) => {
    dispatch(setLoading(true))

    const savedTracks = getState().savedTracks.savedTracks;
    if (savedTracks.length === 0) {
        console.log('Тянем избранное для того, чтобы показать, есть ли треки из плейлиста у нас')
        dispatch(getSavedTracks())
    }

    const response = await spotifyApi.getPlaylistTracks(id);
    dispatch(setLoading(false))
    const tracks = response.body.items.map(item => item.track);
    dispatch(setPlayListTracks(tracks));
    dispatch(addTracksToPlaylist({ id, tracks }))
})
