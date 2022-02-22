import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./features/loader/loaderSlice";
import accessSlice from './features/access/accessSlice';
import userSlice from "./features/user/userSlice";
import savedTracksSlice from "./features/savedTracks/savedTracksSlice";
import playerActiveTracksSlice from "./features/playerActiveTracks/playerActiveTracksSlice";
import playlistsSlice from "./features/playlists/playlistsSlice";
import currentPlaylistSlice from "./features/currentPlaylist/currentPlaylistSlice";
import mainPageSlice from "./features/mainPage/mainPageSlice";

export const store = configureStore({
    reducer: {
        loader: loaderSlice,
        access: accessSlice,
        userInfo: userSlice,
        savedTracks: savedTracksSlice,
        playerActiveTracks: playerActiveTracksSlice,
        playlists: playlistsSlice,
        currentPlaylist: currentPlaylistSlice,
        mainPage: mainPageSlice,
    }
})
