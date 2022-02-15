import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { spotifyApi } from './store/spotifyAPI';

import { PlayerContainer } from './components/PlayerContainer';
import Login from './components/Login';
import { ExtractToken } from './components/ExtractToken/ExtractToken';
import { tokenSelector } from './store/features/access/accessSelectors';
import { getUserInfo } from './store/features/user/userThunks';
import Header from "./components/HeaderComponent/HeaderComponent";
import './App.css'
<<<<<<< HEAD
=======
import { Playlist } from './components/Playlists/Playlists';
>>>>>>> work_at_access

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
          <Route path='/login'>
            <Login />
          </Route>
          {/* Желательно, поменять url для того, чтобы получать access token с / на что-нибудь другое */}
          <Route exact path="/accesstoken">
            <ExtractToken />
          </Route>
          <Route path='/music'>
            <PlayerContainer />
          </Route>
<<<<<<< HEAD
=======
          <Route path='/playlists'>
            <Playlist />
          </Route>
>>>>>>> work_at_access
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
