import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI'
import { setSavedTracks, removeTrack, addTrack } from './savedTracksSlice'

export const getSavedTracks = createAsyncThunk('savedTracks/getSavedTracks', async (_, { dispatch }) => {
    const response = await spotifyApi.getMySavedTracks();
    dispatch(setSavedTracks(response.body.items.map((item) => item.track)));
})

export const addTrackToSaved = createAsyncThunk('savedTracks/addTrackToSaved', async (track, { dispatch }) => {
    try {
        const response = await spotifyApi.addToMySavedTracks([track.id]);
        dispatch(addTrack(track));
    } catch (error) {
        console.log(error)
    }
})

/* мб какую красивую анимацию прикрутить тут? */
export const removeTrackFromSaved = createAsyncThunk('savedTracks/removeTrackFromSaved', async (id, { dispatch }) => {
    try {
        const response = await spotifyApi.removeFromMySavedTracks([id]);
        dispatch(removeTrack(id))
    } catch (error) {
        console.log(error)
    }
})