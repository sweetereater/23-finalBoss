import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI'
import { setLoading } from "../loader/loaderSlice";
import { setPlayListTracks } from "./currentPlaylistSlice";

export const getCurrentPlaylistTracks = createAsyncThunk('currentPlayList/getPlaylistTracks', async (id, { dispatch }) => {
    dispatch(setLoading(true))
    const response = await spotifyApi.getPlaylistTracks(id);
    dispatch(setLoading(false))
    const tracks = response.body.items.map(item => item.track);
    dispatch(setPlayListTracks(tracks));
})
