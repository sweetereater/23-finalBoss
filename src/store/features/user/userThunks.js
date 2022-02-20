import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI';
import { setAccessToken } from "../access/accessSlice";
import { setUser } from "./userSlice";

export const getUserInfo = createAsyncThunk('savedTracks/getSavedTracks', async (accessToken, { dispatch }) => {
    try {
        const response = await spotifyApi.getMe();
        if (response.statusCode === 200) {
            const { display_name, id } = response.body;
            dispatch(setUser({
                display_name, id
            }))
            dispatch(setAccessToken(accessToken))
        }
    } catch (error) {
        console.log(error)
        localStorage.clear();
    }
})
