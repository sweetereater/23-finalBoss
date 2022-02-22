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
import { NewPlaylist } from "./components/NewPlaylist/NewPlaylist";
import { userSelector } from "./store/features/user/userSelectors";
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
    const timerId = setTimeout(() => {
      console.log("token dispatch");
      dispatch(setAccessToken(null));
    }, 3300000);
    return () => clearTimeout(timerId);
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
            <Route path="/new_playlist">
              <NewPlaylist />
            </Route>
          </Switch>
        </div>
        <PlayerContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
