import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { tokenSelector } from "../../store/features/access/accessSelectors";
import './Login.css'

const redirectUri = 'http://localhost:3000/accesstoken';

const scopes = ['streaming', 'ugc-image-upload', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing',
  'user-read-private', 'user-read-email', 'user-follow-modify', 'user-follow-read', 'user-library-modify', 'user-library-read',
  'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'playlist-modify-private',
  'playlist-read-collaborative', 'playlist-read-private', 'playlist-modify-public'];

const scopesStr = scopes.join('%20');

const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}&scope=${scopesStr}`;

export const Login = () => {

  const token = useSelector(tokenSelector);
  if (token) {
    return <Redirect to='/main' />
  }

  return (
    <div className='loginButton'>
        <a href={authorizeURL}>Login</a>
    </div>
  )
}
