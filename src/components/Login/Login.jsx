import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { tokenSelector } from "../../store/features/access/accessSelectors";

const clientId = '3add85dc6f494db1bdedc65977787ffa';
const redirectUri = 'http://localhost:3000/accesstoken';
// const clientSecret = 'f8c922617cef4f469988f68be0990225';
// const state = 'state';
const scopes = ['streaming', 'ugc-image-upload', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing',
  'user-read-private', 'user-read-email', 'user-follow-modify', 'user-follow-read', 'user-library-modify', 'user-library-read',
  'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'playlist-modify-private',
  'playlist-read-collaborative', 'playlist-read-private', 'playlist-modify-public'];
const scopesStr = scopes.join('%20');

const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopesStr}`;

export const Login = () => {

  const token = useSelector(tokenSelector);
  if (token) {
    return <Redirect to='/music' />
  }

  return (
    <a href={authorizeURL}>Login</a>
  )
}
