import { createAsyncThunk } from "@reduxjs/toolkit";
import { spotifyApi } from '../../spotifyAPI';
import { setPlaylists } from './playlistsSlice';

export const getPlaylists = createAsyncThunk('playlists/getPlaylists', async (_, { dispatch }) => {
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

    const playListToStore = playLists.map(playList => {
        const { id, name, description, images, tracks } = playList;
        return {
            id,
            name,
            description,
            images,
            tracks: [],
        }
    })
    dispatch(setPlaylists(playListToStore));
})
