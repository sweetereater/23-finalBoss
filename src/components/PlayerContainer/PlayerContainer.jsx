import SpotifyPlayer from 'react-spotify-web-playback';
import { useEffect } from 'react';
import { getSavedTracks } from '../../store/features/savedTracks/savedTracksThunks';
import { useSelector, useDispatch } from 'react-redux';
import { tokenSelector } from '../../store/features/access/accessSelectors';
import { Redirect } from 'react-router-dom';

const PlayerContainer = () => {


  const dispatch = useDispatch();
  const token = useSelector(tokenSelector)

  useEffect(() => {
    console.log('Получаем сохраненные треки пользователя')
    dispatch(getSavedTracks())
  }, [token])


  const tracks = useSelector(state => state.savedTracks.savedTracks);
  console.log('PlayerContainer tracks', tracks);
  const uris = tracks.map((track) => track.uri);

  if (!token) return <Redirect to='/login' />

  return (
    uris.length > 0 && <SpotifyPlayer
      token={token}
      uris={uris}
      initialVolume={0.4}
    />
  )
}

export default PlayerContainer;