import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { spotifyApi } from './store/spotifyAPI';

import { PlayerContainer } from './components/PlayerContainer';
import Login from './components/Login';
import { ExtractToken } from './components/ExtractToken/ExtractToken';
import { tokenSelector } from './store/features/access/accessSelectors';
import { getUserInfo } from './store/features/user/userThunks';
import { MySavedTracks } from './components/MySavedTracks';
import './App.css'
import { PlaylistsPage } from './components/Playlists/PlaylistsPage';
import { CurrentPlaylist } from './components/CurrentPlaylist/CurrentPlaylist';
import HeaderWithDrawerComponent from "./components/HeaderWithDrawerComponent/HeaderWithDrawerComponent";

function App() {

  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      let accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        spotifyApi.setAccessToken(accessToken);
        dispatch(getUserInfo(accessToken))
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='App'>
        <HeaderWithDrawerComponent />
        <div className='MainWrapper'>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path="/accesstoken">
              <ExtractToken />
            </Route>
            <Route path='/music'>
              <MySavedTracks />
            </Route>
            <Route path='/playlists/:playlistId'>
              <CurrentPlaylist />
            </Route>
            <Route path='/playlists'>
              <PlaylistsPage />
            </Route>
          </Switch>
          <PlayerContainer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
