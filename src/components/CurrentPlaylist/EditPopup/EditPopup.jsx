import "./EditPopup.css";
import Button from "@mui/material/Button";
import { Input, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { changePlaylistThunk } from "../../../store/features/playlists/playlistsThunks";
import { useDispatch } from "react-redux";

export const EditPopup = (props) => {
  const { currentPlaylist, answerPopup, playlistId } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentPlaylist.name);
    setDescription(currentPlaylist.description);
  }, [currentPlaylist]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleOkClick = () => {
    if (name && description.length < 160) {
      dispatch(changePlaylistThunk({ playlistId, name, description })).then(
        () => answerPopup(false)
      );
    } else alert("Поле name не должно быть пустым, введите имя плейлиста");
  };

  return (
    <div className="PopupArea">
      <Typography variant="h5" component="span">
        Edit playlist
      </Typography>
      <div>
        <div>
          <Input value={name} onChange={handleName} placeholder={'name'} />
        </div>
        <div>
          <Input multiline value={description} onChange={handleDescription} maxlength="15" placeholder={'description'} />
        </div>
      </div>
      <Button variant="outlined" onClick={handleOkClick}>
        Ok
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          answerPopup(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
};
