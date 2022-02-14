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
// import SubmitFormComponent from "./components/commons/SubmitFormComponent/SubmitFormComponent";
// import PaginationComponent from "./components/commons/PaginationComponent/PaginationComponent";
import './App.css'
// import PlayerWidgetComponent from "./components/PlayerWidgetComponent/PlayerWidgetComponent";
import SongItemComponent from "./components/SongItemComponent/SongItemComponent";

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
          <Route exact path="/">
            <ExtractToken />
          </Route>
          <Route path='/music'>
            <PlayerContainer />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
