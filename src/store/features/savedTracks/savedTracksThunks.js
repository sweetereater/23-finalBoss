import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from "../../spotifyAPI";
import { setSavedTracks, removeTrack, addTrack } from "./savedTracksSlice";
import { setLoading } from "../loader/loaderSlice";

export const getSavedTracks = createAsyncThunk(
  "savedTracks/getSavedTracks",
  async (_, { dispatch }) => {
    let savedTracks = [];
    let offset = 0;
    let limit = 50;

    try {
      dispatch(setLoading(true));
      const response = await spotifyApi.getMySavedTracks({ limit });
      const amountOfTracks = response.body.total;
      console.log("total tracks: ", amountOfTracks);

      savedTracks = [
        ...savedTracks,
        ...response.body.items.map((item) => item.track),
      ];

      if (response.body.items.length < amountOfTracks) {
        let requests = [];
        while (offset + limit < amountOfTracks) {
          requests.push(
            spotifyApi.getMySavedTracks({ offset: (offset += limit), limit })
          );
        }
        const responses = await Promise.all(requests);
        console.log("Responses: ", responses);
        responses.forEach(
          (response) =>
            (savedTracks = [
              ...savedTracks,
              ...response.body.items.map((item) => item.track),
            ])
        );
      }

      console.log("got from server: ", savedTracks.length);
      dispatch(setLoading(false));
      dispatch(setSavedTracks(savedTracks));
    } catch (error) {
      console.log(error);
    }
  }
);

export const addTrackToSaved = createAsyncThunk(
  "savedTracks/addTrackToSaved",
  async (track, { dispatch }) => {
    try {
      const response = await spotifyApi.addToMySavedTracks([track.id]);
      dispatch(addTrack(track));
    } catch (error) {
      console.log(error);
    }
  }
);

/* мб какую красивую анимацию прикрутить тут? */
export const removeTrackFromSaved = createAsyncThunk(
  "savedTracks/removeTrackFromSaved",
  async (id, { dispatch }) => {
    try {
      const response = await spotifyApi.removeFromMySavedTracks([id]);
      dispatch(removeTrack(id));
    } catch (error) {
      console.log(error);
    }
  }
);
