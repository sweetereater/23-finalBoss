import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: [],
}

export const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        getSongs: () => {

        }
    },
})

export const { getSongs } = songsSlice.actions;

export default songsSlice.reducer;
