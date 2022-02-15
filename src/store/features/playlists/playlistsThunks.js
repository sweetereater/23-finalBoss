import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI'
import { setPlaylists } from './playlistsSlice'

export const getPlaylists = createAsyncThunk('playlists/getPlaylists', async (_, { dispatch }) => {
    const response = await spotifyApi.getUserPlaylists();
    console.log(response);
    // dispatch(setPlaylists(response.body.items.map((item) => item)));
})
