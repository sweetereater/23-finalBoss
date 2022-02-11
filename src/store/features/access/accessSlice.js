import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null
}

export const acceccSlice = createSlice({
    name: 'access',
    initialState,
    reducers: {
        setAccessToken: (state, accessToken) => {
            state.accessToken = accessToken
        }
    },
})

export default acceccSlice.reducer;
