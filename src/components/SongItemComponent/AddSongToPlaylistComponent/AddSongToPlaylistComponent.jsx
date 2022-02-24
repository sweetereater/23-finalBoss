import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import "./AddSongToPlaylistComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { playlistsSelector } from "../../../store/features/playlists/playlistsSelectors";
import { getPlaylists } from "../../../store/features/playlists/playlistsThunks";
import { tokenSelector } from "../../../store/features/access/accessSelectors";
import { userSelector } from "../../../store/features/user/userSelectors";
import { addTrackToPlaylistThunk } from "../../../store/features/currentPlaylist/currentPlaylistThunks";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

export const AddSongToPlaylistComponent = ({ popupClose, track }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const playlists = useSelector(playlistsSelector);
  const token = useSelector(tokenSelector);
  useEffect(() => {
    if (!playlists.length && token) {
      dispatch(getPlaylists());
    }
  }, [token]);

  const handleClick = (id) => () => {
    dispatch(
      addTrackToPlaylistThunk({ playlistID: id, tracks: [track.uri], track })
    ).then(() => popupClose());
  };

  return (
    <Box className="ChosePlaylists">
      <h3>Chose playlist</h3>
      {playlists.length > 0 &&
        playlists
          .filter((playlist) => playlist.owner.id === user.id)
          .map((playlist) => {
            return (
              <Button
                key={playlist.id}
                variant="outlined"
                onClick={handleClick(playlist.id)}
              >
                {playlist.name}
              </Button>
            );
          })}
      <CloseIcon
        onClick={popupClose}
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          fill: "grey",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        titleAccess={"close"}
      />
    </Box>
  );
};
