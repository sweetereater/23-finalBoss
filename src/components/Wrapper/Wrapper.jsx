import { isFocusable } from "@testing-library/user-event/dist/utils";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedTracks } from "../../store/features/savedTracks/savedTracksThunks";

const clientId = '3add85dc6f494db1bdedc65977787ffa';
const clientSecret = 'f8c922617cef4f469988f68be0990225';
const redirectUri = 'http://localhost:3000/';

const credentials = {
  clientId,
  clientSecret,
  redirectUri,
}


export const Wrapper = ({ accessToken, onIndexChange }) => {

  const dispatch = useDispatch();
  const [trackUrl, setTrackUrl] = useState('');
  window.history.pushState({}, null, '/');

  useEffect(() => {
    console.log('Дергаем санку')
    dispatch(getSavedTracks())
  }, [])

  return (
    <div>
      <p>{accessToken}</p>
      <button onClick={onIndexChange(2)}>Удалить</button>
      {trackUrl ? <audio controls>
        <source src={trackUrl} />
      </audio> : null}
    </div>
  )
}