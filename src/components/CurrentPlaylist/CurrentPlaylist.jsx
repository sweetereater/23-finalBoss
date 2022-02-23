import { Box, CircularProgress, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { tokenSelector } from "../../store/features/access/accessSelectors";
import { currentPlaylistTracksSelector } from "../../store/features/currentPlaylist/currentPlaylistSelectors";
import { getCurrentPlaylistTracks } from "../../store/features/currentPlaylist/currentPlaylistThunks";
import { loaderSelector } from "../../store/features/loader/loaderSelectors";
import {
  playlistsSelector,
  tracksFromPlaylistByIdSelector,
} from "../../store/features/playlists/playlistsSelectors";
import Tracks from "../Tracks/Tracks";
import { setPlayListTracks } from "../../store/features/currentPlaylist/currentPlaylistSlice";
import useDebounce from "../SearchPage/debounce";
import { spotifyApi } from "../../store/spotifyAPI";
import { userSelector } from "../../store/features/user/userSelectors";
import { useHistory } from "react-router-dom";
import { EditPopup } from "./EditPopup/EditPopup";
import EditIcon from '@mui/icons-material/Edit';
import picture from '../../../src/assets/new_playlist.jpg';

export const CurrentPlaylist = () => {
  const history = useHistory();
  const token = useSelector(tokenSelector);
  const isLoading = useSelector(loaderSelector);
  const user = useSelector(userSelector);

  const params = useParams();
  const playlistID = params.playlistId;
  const currentPL = useSelector(playlistsSelector).find(
    (pl) => pl.id === playlistID
  );

  const currentPLTracks = useSelector(currentPlaylistTracksSelector);
  const currentPLTracksFromStore = useSelector(tracksFromPlaylistByIdSelector)(
    playlistID
  );

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [source, setSource] = useState("");
  const [popupState, setPopupState] = useState(false);

  const popupActivation = () => {
    setPopupState(!popupState);
  };
  const answerPopup = (answer) => {
    if (answer === false) {
      setPopupState(!popupState);
    }
  };

  useEffect(() => {
    if (currentPLTracksFromStore?.length) {
      dispatch(setPlayListTracks(currentPLTracksFromStore));
    } else if (token) {
      dispatch(getCurrentPlaylistTracks(playlistID));
    } else {
      history.push("/login");
    }

    return () => {
      dispatch(setPlayListTracks([]));
      setSearchValue("");
      setSearchResult([]);
    };
  }, [playlistID, token]);

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!token) return;
    if (debouncedSearch) {
      spotifyApi.searchTracks(debouncedSearch, { limit: 50 }).then((res) => {
        console.log(res.body);
        setSearchResult(res.body.tracks.items);
        setSource(res.body.tracks.href);
      });
    } else setSearchResult([]);
  }, [token, debouncedSearch]);

  if (!token) return <Redirect to="/login" />;

  if (isLoading) return <CircularProgress />;

  return (
    <Box
      sx={{
        marginTop: "-15px",
        marginLeft: "280px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ marginRight: "100px" }}>
          <Typography variant="h4" component="div">
            {currentPL.name}
            {currentPL.owner.id === user.id && (
                <EditIcon onClick={popupActivation} sx={{marginLeft: '15px'}}/>
            )}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            dangerouslySetInnerHTML={{ __html: currentPL.description }}
          />
          <Box sx={{ width: "640px", height: "640px" }}>
            {currentPL.images.length > 0 ? (
              <img width="600px" height="600px" src={currentPL.images[0].url} />
            ) :
              <img width="600px" height="600px" src={picture} />
            }
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          {currentPL.owner.id !== user.id ? (
            <Tracks
              tracks={currentPLTracks}
              source={playlistID}
              width={800}
              action="like"
            />
          ) : (
            <Tracks
              tracks={currentPLTracks}
              source={playlistID}
              width={800}
              action="remove_from_playlist"
            />
          )}
        </Box>
      </Box>
      {currentPL.owner.id === user.id && (
        <Box>
          <Input
            style={{ width: "80%", marginBottom: "2rem" }}
            placeholder="Search music..."
            value={searchValue}
            onChange={handleInput}
          ></Input>
          <Tracks
            tracks={searchResult}
            source={source}
            width={1300}
            action="add_to_playlist"
            playlistID={playlistID}
          />
        </Box>
      )}
      {popupState && (
        <EditPopup
          currentPlaylist={currentPL}
          playlistId={playlistID}
          answerPopup={answerPopup}
        />
      )}
    </Box>
  );
};
