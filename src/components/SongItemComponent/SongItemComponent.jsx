import { useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { List } from "@mui/icons-material";
import { AddSongToPlaylistComponent } from "./AddSongToPlaylistComponent/AddSongToPlaylistComponent";

import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTrack,
  setIsPlaying,
  setMusicSource,
  setCurrentTrackId,
} from "../../store/features/playerActiveTracks/playerActiveTracksSlice";
import {
  currentMusicSourceSelector,
  isPlayingSelector,
  currentTrackIdSelector,
} from "../../store/features/playerActiveTracks/activeTracksSelectors";
import { setPlayerActiveTracks } from "../../store/features/playerActiveTracks/playerActiveTracksSlice";
import { savedTracksSelector } from "../../store/features/savedTracks/savedTracksSelectors";
import {
  addTrackToSaved,
  removeTrackFromSaved,
} from "../../store/features/savedTracks/savedTracksThunks";
import { getSongDuration } from "../../utils/timeFunctions";
import {
  addTrackToPlaylistThunk,
  removeTrackFromPlaylistThunk,
} from "../../store/features/currentPlaylist/currentPlaylistThunks";
import { currentPlaylistTracksSelector } from "../../store/features/currentPlaylist/currentPlaylistSelectors";

function SongItemComponent(props) {
  const [popup, setPopup] = useState(false);

  const { track, order, source, style, action, playlistID, tracks } = props;

  const { artists } = track;

  let artistsOfTrack;
  if (artists.length) {
    artistsOfTrack = artists.map((artist) => artist.name).join(", ");
  }

  const { id, name } = track;
  const duration = getSongDuration(track.duration_ms);
  const img = track.album.images[2].url;

  const isPlaying = useSelector(isPlayingSelector);
  const musicSrc = useSelector(currentMusicSourceSelector);

  const activeTrackId = useSelector(currentTrackIdSelector);

  const dispatch = useDispatch();

  const savedTracks = useSelector(savedTracksSelector);
  const isSaved = savedTracks.find((tracks) => tracks.id === id);

  const currentPLTracks = useSelector(currentPlaylistTracksSelector);
  const isInPlaylist = currentPLTracks.find((track) => track.id === id);

  const iconColor = "#0083f5";
  const iconStyles = {
    fill: iconColor,
    height: 38,
    width: 38,
    cursor: "pointer",
  };

  const handleClick = useCallback(() => {

    if (source !== musicSrc) {
      dispatch(setMusicSource(source));
      dispatch(setPlayerActiveTracks(tracks));
      dispatch(setCurrentTrack(order));
      dispatch(setCurrentTrackId(id));
      dispatch(setIsPlaying(true));
    } else if (id === activeTrackId) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(setPlayerActiveTracks(tracks));
      dispatch(setCurrentTrack(order));
      dispatch(setCurrentTrackId(id));
      dispatch(setIsPlaying(true));
    }
  }, [dispatch, isPlaying, musicSrc, order, source, id, activeTrackId, tracks]);



  const handleTrackLike = useCallback(() => {
    if (!isSaved) {
      dispatch(addTrackToSaved(track));
    } else {
      dispatch(removeTrackFromSaved(id));
    }
  }, [track, id, isSaved]);

  /* для удаления нужен массив объектов с свойством uri */
  const handleRemoveTrackFromPL = useCallback(() => {
    dispatch(
      removeTrackFromPlaylistThunk({
        playlistID: source,
        trackID: id,
        tracks: [{ uri: track.uri }],
      })
    );
  }, [track, id]);

  const popupClose = () => {
    setPopup(!popup);
  };

  /* для добавления просто массив строк uri */
  const handleAddTrackToPL = useCallback(() => {
    dispatch(
      addTrackToPlaylistThunk({
        playlistID: playlistID,
        tracks: [track.uri],
        track,
      })
    );
  }, [track, id]);

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    marginRight: "15px",
  });

  return (
    <div style={{ ...style, display: "flex" }}>
      <Card
        sx={{
          display: "flex",
          width: "80%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px 0",
          bgcolor:
            source === musicSrc && activeTrackId === id ? "#d0d0d0" : "#f5f5f5",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <img src={img} alt="" />
            <IconButton aria-label="play/pause" onClick={handleClick}>
              {source === musicSrc && activeTrackId === id && isPlaying ? (
                <PauseIcon sx={iconStyles} />
              ) : (
                <PlayArrowIcon sx={iconStyles} />
              )}
            </IconButton>
          </Box>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 0 auto",
              alignItems: "flex-start",
            }}
          >
            <Typography component="div" variant="subtitle1">
              {name}
            </Typography>
            {artistsOfTrack && (
              <Typography component="div" variant="subtitle2">
                {artistsOfTrack}
              </Typography>
            )}
          </CardContent>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box onClick={handleTrackLike} sx={{ marginRight: "10px" }}>
            {isSaved ? (
              <FavoriteIcon sx={{ ...iconStyles, height: 24, width: 24 }} />
            ) : (
              <FavoriteBorderIcon
                sx={{ ...iconStyles, height: 24, width: 24 }}
              />
            )}
          </Box>
          {action === "remove_from_playlist" ? (
            <Box onClick={handleRemoveTrackFromPL}>
              <DeleteIcon sx={{ ...iconStyles, height: 24, width: 24 }} />
            </Box>
          ) : null}
          {action === "add_to_playlist" ? (
            <Box onClick={handleAddTrackToPL}>
              {!isInPlaylist && (
                <AddIcon sx={{ ...iconStyles, height: 24, width: 24 }} />
              )}
            </Box>
          ) : null}
          <List
            sx={{ ...iconStyles, height: 28, width: 28 }}
            onClick={() => setPopup(!popup)}
          />
          <TinyText>{duration}</TinyText>
        </Box>
      </Card>
      {popup && (
        <AddSongToPlaylistComponent track={track} popupClose={popupClose} />
      )}
    </div>
  );
}

export default SongItemComponent;
