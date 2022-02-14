import SpotifyWebApi from "spotify-web-api-node";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const scopes = [
    'streaming', 'ugc-image-upload', 'user-read-playback-state',
    'user-modify-playback-state', 'user-read-currently-playing',
    'user-read-private', 'user-read-email', 'user-follow-modify',
    'user-follow-read', 'user-library-modify', 'user-library-read',
    'user-read-playback-position', 'user-top-read', 'user-read-recently-played',
    'playlist-modify-private', 'playlist-read-collaborative',
    'playlist-read-private', 'playlist-modify-public'
];

const scopesStr = scopes.join('%20');

const clientId = '3add85dc6f494db1bdedc65977787ffa';
const clientSecret = 'f8c922617cef4f469988f68be0990225';

// const redirectUri = 'http://localhost:3000/';
// const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopesStr}`;

const authorizeURL = 'https://accounts.spotify.com/api/token';
const options = {
    'headers': {
        'Content-Type': 'application/x-www-form-url-urlencoded',
        // 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
    },
    'data': 'grant_type=client_credentials'
}

export const getAccessToken = createAsyncThunk('main/getAccessToken', async (_, { dispatch }) => {
    console.log('Inside getAccessToken')
    const response = await axios.post(authorizeURL, options);
    console.log(response);
})