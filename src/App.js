import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { spotifyApi } from "./store/spotifyAPI";

import { PlayerContainer } from "./components/PlayerContainer";
import Login from "./components/Login";
import { ExtractToken } from "./components/ExtractToken/ExtractToken";
import { tokenSelector } from "./store/features/access/accessSelectors";
import { getUserInfo } from "./store/features/user/userThunks";
import { MySavedTracks } from "./components/MySavedTracks";
import "./App.css";
import { PlaylistsPage } from "./components/Playlists/PlaylistsPage";
import { CurrentPlaylist } from "./components/CurrentPlaylist/CurrentPlaylist";
import HeaderWithDrawerComponent from "./components/HeaderWithDrawerComponent/HeaderWithDrawerComponent";
import { SearchPage } from "./components/SearchPage";
import { MainPage } from "./components/MainPage/MainPage";
import { setAccessToken } from "./store/features/access/accessSlice";

function App() {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        spotifyApi.setAccessToken(accessToken);
        dispatch(getUserInfo(accessToken));
      }
    }
    const addingTime = localStorage.getItem("addingTime");
    if (addingTime) {
      const timeDiff = Date.now() - addingTime;
      const delay = 3300000 - timeDiff;

      const timerId = setTimeout(() => {
        dispatch(setAccessToken(null));
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderWithDrawerComponent />
        <div className="MainWrapper">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/accesstoken">
              <ExtractToken />
            </Route>
            <Route path="/main">
              <MainPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/music">
              <MySavedTracks />
            </Route>
            <Route exact path="/playlists/:playlistId">
              <CurrentPlaylist />
            </Route>
            <Route path="/playlists">
              <PlaylistsPage />
            </Route>
          </Switch>
        </div>
        <PlayerContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
