import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from "../../spotifyAPI";
import { setPlaylists, addPlaylist } from "./playlistsSlice";
import { changePlaylist } from "./playlistsSlice";
import { addTrack } from "./playlistsSlice";

export const getPlaylists = createAsyncThunk(
  "playlists/getPlaylists",
  async (_, { dispatch }) => {
    const response = await spotifyApi.getUserPlaylists();
    const playLists = response.body.items;
    console.log(playLists);
    /*
        Из плейлиста нам нужно
        id: string, 
        name: string,
        description: string
        images: Array[{ height: number, url: string, width: number }]
        tracks: { total: number, href: string (ссылка на spotify) }

        Потом, при нажатии на определнный плейлист ->
            // const tracksResponse = await spotifyApi.getPlaylistTracks(id)
            // playListObject.tracks = tracksResponse.body.items;
    */

    const playListToStore = playLists.map((playList) => {
      const { id, name, description, images, owner } = playList;
      return {
        id,
        name,
        description,
        images,
        tracks: [],
        owner: {
          display_name: owner.display_name,
          id: owner.id,
        },
      };
    });
    dispatch(setPlaylists(playListToStore));
  }
);

export const createPlaylist = createAsyncThunk(
  "playlists/createPlaylist",
  async (_, { dispatch }) => {
    const response = await spotifyApi.createPlaylist("New playlist");
    console.log(response.body);
    const { id, name, description, images, owner } = response.body;
    const playlist = { id, name, description, images, tracks: [], owner };
    dispatch(addPlaylist(playlist));
    const redirect = `/playlists/${id}`;
    return redirect;
  }
);

export const changePlaylistThunk = createAsyncThunk(
  "playlists/changePlaylistName",
  async ({ playlistId, name, description }, { dispatch }) => {
    console.log(playlistId, name);
    const options = description ? { name, description } : { name };
    const response = await spotifyApi.changePlaylistDetails(
      playlistId,
      options
    );
    dispatch(changePlaylist({ playlistId, name, description }));
  }
);

export const addTrackThunk = createAsyncThunk(
  "playlists/addTrack",
  async ({ playlistID, tracks, track }, { dispatch }) => {
    const response = await spotifyApi.addTracksToPlaylist(playlistID, tracks);
    if (response.statusCode === 201) {
      dispatch(
        addTrack({
          id: playlistID,
          track,
        })
      );
    }
  }
);
