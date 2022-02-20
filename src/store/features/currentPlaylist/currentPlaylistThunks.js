import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI'
import { setLoading } from "../loader/loaderSlice";
import { addTracksToPlaylist, addTrack, deleteTrack } from "../playlists/playlistsSlice";
import { getSavedTracks } from "../savedTracks/savedTracksThunks";
import { setPlayListTracks, addTrackToPlaylist, removeTrackFromPlaylist } from "./currentPlaylistSlice";


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

export const removeTrackFromPlaylistThunk = createAsyncThunk('currentPlayList/removeTrackFromPlaylist', async ({ playlistID, trackID, tracks }, { dispatch }) => {

    const response = await spotifyApi.removeTracksFromPlaylist(playlistID, tracks)
    if (response.statusCode === 200) {
        dispatch(removeTrackFromPlaylist(trackID))
        dispatch(deleteTrack({
            id: playlistID,
            trackID,
        }))
    }
})

export const addTrackToPlaylistThunk = createAsyncThunk('currentPlayList/addTrackToPlaylist', async ({ playlistID, tracks, track }, { dispatch }) => {
    const response = await spotifyApi.addTracksToPlaylist(playlistID, tracks)
    if (response.statusCode === 201) {
        dispatch(addTrackToPlaylist(track))
        dispatch(addTrack({
            id: playlistID,
            track,
        }))
    }
})
