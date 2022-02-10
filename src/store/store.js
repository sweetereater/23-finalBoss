import { configureStore } from "@reduxjs/toolkit";
import authorsSlice from './features/authors/authorsSlice'

export const store = configureStore({
    reducer: {
        authorsState: authorsSlice
    }
})
