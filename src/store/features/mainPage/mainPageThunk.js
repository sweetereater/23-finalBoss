import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from "../../spotifyAPI";
import { setUserTopTracks } from "./mainPageSlice";
import { getSavedTracks } from "../savedTracks/savedTracksThunks";
import { setLoading } from "../loader/loaderSlice";

export const getUserTopTracks = createAsyncThunk(
  "mainPage/getTopTracks",
  async (_, { getState, dispatch }) => {
    dispatch(setLoading(true));

    const savedTracks = getState().savedTracks.savedTracks;
    if (savedTracks.length === 0) {
      dispatch(getSavedTracks());
    }
    const response = await spotifyApi.getMyTopTracks();
    dispatch(setLoading(false));
    dispatch(setUserTopTracks(response.body.items));
  }
);
