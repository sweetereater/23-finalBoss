import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';

import { tokenSelector } from '../../store/features/access/accessSelectors';
import { activeTracksSelector, currentTrackSelector, isPlayingSelector } from '../../store/features/playerActiveTracks/activeTracksSelectors';
import { setCurrentTrack, setIsPlaying } from '../../store/features/playerActiveTracks/playerActiveTracksSlice';
import zIndex from '@mui/material/styles/zIndex';

const PlayerContainer = () => {

  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const currentTrack = useSelector(currentTrackSelector);
  const isPlaying = useSelector(isPlayingSelector);

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
        if (tracks[currentTrack].id !== playerCurrentTrack.id) {
          const findTrackIndex = tracks.findIndex(track => track.id === playerCurrentTrack.id)
          dispatch(setCurrentTrack(findTrackIndex));
        }
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
  console.log(`Is playing -> ${isPlaying}, currentTrack -> ${currentTrack}`)

  /*
    Для того, чтобы стилизовать слайдер, можно обратиться к ._SliderRSWP
    Например, чтобы установить cursor: pointer
  */

  return (
    <div>
      {uris.length > 0 &&
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1300 }}>
          <SpotifyPlayer
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
          />
        </Box>}
    </div>
  )
}

export default PlayerContainer;