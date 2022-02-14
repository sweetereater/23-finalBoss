import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI';
import { setAccessToken } from "../access/accessSlice";

export const getUserInfo = createAsyncThunk('savedTracks/getSavedTracks', async (accessToken, { dispatch }) => {
    try {
        const response = await spotifyApi.getMe();
        if (response.statusCode === 200) {
            dispatch(setAccessToken(accessToken))
        }
    } catch (error) {
        console.log(error)
        localStorage.clear();
    }
})
