import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../store/features/access/accessSlice";
import { tokenSelector } from "../../store/features/access/accessSelectors";
import { spotifyApi } from "../../store/spotifyAPI";
import { useHistory } from "react-router-dom";

export const ExtractToken = () => {
  const history = useHistory();
  console.log("ExtractToken Render");
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  if (token) {
    history.replace("/main");
  }

  const accessToken = new URLSearchParams(window.location.hash).get(
    "#access_token"
  );
  console.log(accessToken);

  if (accessToken) {
    dispatch(setAccessToken(accessToken));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("addingTime", Date.now());
    spotifyApi.setAccessToken(accessToken);
    history.replace("/main");
  } else {
    return <Redirect to="/login" />;
  }
};
