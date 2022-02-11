import { configureStore } from "@reduxjs/toolkit";
import savedTracksSlice from "./features/savedTracks/savedTracksSlice";

export const store = configureStore({
    reducer: {
        savedTracks: savedTracksSlice
    }
})
