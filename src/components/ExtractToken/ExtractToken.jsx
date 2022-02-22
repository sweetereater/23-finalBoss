import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../store/features/access/accessSlice";
import { tokenSelector } from "../../store/features/access/accessSelectors";
import { spotifyApi } from "../../store/spotifyAPI";

export const ExtractToken = () => {
  console.log("ExtractToken Render");
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  if (token) {
    return <Redirect to="/music" />;
  }

  const accessToken = new URLSearchParams(window.location.hash).get(
    "#access_token"
  );
  console.log(accessToken);

  if (accessToken) {
    dispatch(setAccessToken(accessToken));
    localStorage.setItem("accessToken", accessToken);
    spotifyApi.setAccessToken(accessToken);
    return <Redirect to="/music" />;
  } else {
    return <Redirect to="/login" />;
  }
};
