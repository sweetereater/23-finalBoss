import { configureStore } from "@reduxjs/toolkit";
import savedTracksSlice from "./features/savedTracks/savedTracksSlice";
import playerActiveTracksSlice from "./features/playerActiveTracks/playerActiveTracksSlice";

export const store = configureStore({
    reducer: {
        savedTracks: savedTracksSlice,
        playerActiveTracks: playerActiveTracksSlice,
    }
})
