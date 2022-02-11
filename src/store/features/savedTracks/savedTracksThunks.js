import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI'
import { setSavedTracks } from './savedTracksSlice'

export const getSavedTracks = createAsyncThunk('savedTracks/getSavedTracks', async (_, { dispatch }) => {
    console.log('inside geteSavedTracks')
    const response = await spotifyApi.getMySavedTracks()
    dispatch(setSavedTracks(response.body.items))
})
