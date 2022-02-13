import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector } from 'react-redux';

const PlayerContainer = ({token}) => {
  const tracks = useSelector(state => state.playerActiveTracks.playerActiveTracks);
  console.log( 'PlayerContainer tracks' , tracks);
  const uris = tracks.map((track) => track.uri);
  return (
    uris.length > 0 && <SpotifyPlayer
          token={token}
          uris={uris}
          initialVolume={0.4}
    />
  )
}

export default PlayerContainer;