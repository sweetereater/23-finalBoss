import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSongsThunk = createAsyncThunk('articles/getArticlesThunk', async (_, { dispatch }) => {
    const response = await fetchArticles();
    dispatch(setArticles(response))
})
