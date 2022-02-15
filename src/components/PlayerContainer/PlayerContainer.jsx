import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { tokenSelector } from '../../store/features/access/accessSelectors';
import { activeTracksSelector, currentMusicSourceSelector, currentTrackSelector, isPlayingSelector } from '../../store/features/playerActiveTracks/activeTracksSelectors';
import { setCurrentTrack, setIsPlaying, setPlayerActiveTracks } from '../../store/features/playerActiveTracks/playerActiveTracksSlice';
import { savedTracksSelector } from '../../store/features/savedTracks/savedTracksSelectors';
import { currentPlaylistTracksSelector } from '../../store/features/currentPlaylist/currentPlaylistSelectors';

const PlayerContainer = () => {

  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const currentTrack = useSelector(currentTrackSelector);
  const isPlaying = useSelector(isPlayingSelector);

  const musicSrc = useSelector(currentMusicSourceSelector);
  const savedMusic = useSelector(savedTracksSelector);
  const playlistMusic = useSelector(currentPlaylistTracksSelector)

  switch (musicSrc) {
    case '/music':
      dispatch(setPlayerActiveTracks(savedMusic));
      break;
    default:
      dispatch(setPlayerActiveTracks(playlistMusic));
      break;
  }

  const tracks = useSelector(activeTracksSelector);

  const handlePlayerStateChange = (state) => {
    /* 
      state.type: 
        "status_update" | 
        "track_update" | -> previous / next button
        "player_update" | -> start / stop button
        "progress_update" -> track progress bar
    */
    switch (state.type) {
      case "player_update":
        dispatch(setIsPlaying(state.isPlaying));
        break;
      case "track_update":
        const playerCurrentTrack = state.track;
        const findTrackIndex = tracks.findIndex(track => track.id === playerCurrentTrack.id)
        dispatch(setCurrentTrack(findTrackIndex));
        break;
      default:
    }
  }

  /* 
    Из объекта трека берем:
      name - имя трека + исполнитель
      duration_ms - длительность в миллисекундах
      artists - массив с исполнителями (href, id, name)
      album.images[] 0 -> 600x600, 1-> 300x300, 2-> 64x64

  */

  console.log('PlayerContainer tracks', tracks);
  const uris = tracks.map((track) => track.uri);

  if (!token) return <Redirect to='/login' />

  console.log('!!! PLAYER SETTINGS !!!')
  console.log('Is playing? ', isPlaying)
  console.log('current track: ', currentTrack);
  /* 
    Для того, чтобы стилизовать слайдер, можно обратиться к ._SliderRSWP 
    Например, чтобы установить cursor: pointer
  */

  return (
    <div>
      {uris.length > 0 && <SpotifyPlayer
        token={token}
        uris={uris}
        play={isPlaying}
        offset={currentTrack}
        initialVolume={0.4}
        callback={state => handlePlayerStateChange(state)}
        styles={{
          height: '72px',
          sliderHeight: '15px',
          sliderHandleColor: 'pointer',
          color: '#0083f5',
          bgColor: '#ededed',
          sliderColor: '#329dfa',
          sliderTrackColor: '#b0b5b2',
        }}
      />}
    </div>
  )
}

export default PlayerContainer;