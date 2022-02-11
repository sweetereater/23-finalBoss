import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SpotifyPlayer from 'react-spotify-web-playback';

import Login from './Components/Login';
import Wrapper from './Components/Wrapper';
import { spotifyApi } from './store/spotifyAPI';

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setToken(accessToken);
    } else {
      accessToken = new URLSearchParams(window.location.hash).get('#access_token');
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        setToken(accessToken);
      }
    }

    spotifyApi.setAccessToken(accessToken)

  }, [])

  const [audioList, setAudioList] = useState([])
  const [playIndex, setPlayIndex] = useState(0);
  const onIndexChange = (index) => () => {
    setPlayIndex(index);
  }

  const tracks = useSelector(state => state.savedTracks.savedTracks)
  let uris = [];
  if (tracks.length) {
    uris = tracks.map(item => item.track.uri)
  }


  return (
    <div>
      {token ? <Wrapper accessToken={token} onIndexChange={onIndexChange} /> : <Login />}
      {token &&
        <SpotifyPlayer
          token={token}
          uris={uris}
        />}
    </div>
  )
}

export default App;
