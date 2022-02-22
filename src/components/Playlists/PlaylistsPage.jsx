import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { tokenSelector } from "../../store/features/access/accessSelectors";
import { playlistsSelector } from "../../store/features/playlists/playlistsSelectors";
import { getPlaylists } from "../../store/features/playlists/playlistsThunks";
import { PlayListCard } from "./PlaylistCard";
import { PopupComponent } from "./PopupComponent/PopupComponent";

export const PlaylistsPage = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(playlistsSelector);
  console.log(playlists);

  const [popupState, setPopupState] = useState(false);
  const popupActivation = () => {
    setPopupState(!popupState);
  };
  const answerPopup = (answer) => {
    if (answer === false) {
      setPopupState(!popupState);
    } else {
    }
  };

  const token = useSelector(tokenSelector);

  useEffect(() => {
    /* Пока добавим условия для того, чтобы убрать лишние запросы к серверу */
    if (!playlists.length && token) {
      dispatch(getPlaylists());
    }
  }, [token]);

  if (!token) return <Redirect to="/login" />;

  return (
    <Box
      sx={{
        marginLeft: "240px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingBottom: "100px",
      }}
    >
      {playlists.map((pl) => (
        <PlayListCard key={pl.id} {...pl} popupActivation={popupActivation} />
      ))}
      {popupState && <PopupComponent answerPopup={answerPopup} />}
    </Box>
  );
};
