import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { spotifyApi } from './store/spotifyAPI';

import { PlayerContainer } from './components/PlayerContainer';
import Login from './components/Login';
import { ExtractToken } from './components/ExtractToken/ExtractToken';
import { tokenSelector } from './store/features/access/accessSelectors';
import { getUserInfo } from './store/features/user/userThunks';
import Header from "./components/HeaderComponent/HeaderComponent";
import { MySavedTracks } from './components/MySavedTracks';
import './App.css'
import { PlaylistsPage } from './components/Playlists/PlaylistsPage';
import { CurrentPlaylist } from './components/CurrentPlaylist/CurrentPlaylist';

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
        <Header />
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
            <Route path='/playlists'>
              <PlaylistsPage />
            </Route>
            <Route path='/playlists/:playlistId'>
              <CurrentPlaylist />
            </Route>
          </Switch>
          <PlayerContainer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
