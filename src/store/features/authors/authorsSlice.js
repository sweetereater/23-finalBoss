import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authors: [
        "Дмитрий Лихолетов",
        "Игорь Иванов",
        "Кирилл Чирков",
        "Алексей Смирнов",
    ]
}

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {},
})

export default authorsSlice.reducer;
