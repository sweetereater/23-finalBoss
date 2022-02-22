import "./EditPopup.css";
import Button from "@mui/material/Button";
import { Input, FormGroup } from "@mui/material";
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
    if (name) {
      dispatch(changePlaylistThunk({ playlistId, name, description })).then(
        () => answerPopup(false)
      );
    } else alert("Не должно быть пустым");
  };

  return (
    <div className="PopupArea">
      <h4>Edit playlist</h4>
      <Input value={name} onChange={handleName}></Input>
      <Input multiline value={description} onChange={handleDescription}></Input>
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
