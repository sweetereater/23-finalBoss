import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI'
import { setSavedTracks } from './savedTracksSlice'
import { setPlayerActiveTracks } from "../playerActiveTracks/playerActiveTracksSlice";

export const getSavedTracks = createAsyncThunk('savedTracks/getSavedTracks', async (_, { dispatch }) => {
    const response = await spotifyApi.getMySavedTracks();
    dispatch(setSavedTracks(response.body.items.map((item) => item.track)));
})
