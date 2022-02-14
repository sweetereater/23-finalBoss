import { configureStore } from "@reduxjs/toolkit";
import savedTracksSlice from "./features/savedTracks/savedTracksSlice";
import playerActiveTracksSlice from "./features/playerActiveTracks/playerActiveTracksSlice";
import accessSlice from './features/access/accessSlice';
import userSlice from "./features/user/userSlice";

export const store = configureStore({
    reducer: {
        access: accessSlice,
        userInfo: userSlice,
        savedTracks: savedTracksSlice,
        playerActiveTracks: playerActiveTracksSlice,
    }
})
