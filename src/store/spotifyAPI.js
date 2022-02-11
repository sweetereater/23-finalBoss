import SpotifyWebApi from "spotify-web-api-node";

export const clientId = '3add85dc6f494db1bdedc65977787ffa';

export const spotifyApi = new SpotifyWebApi({
    clientId,
})