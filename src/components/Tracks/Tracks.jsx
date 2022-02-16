import SongItemComponent from '../SongItemComponent/SongItemComponent'
import { getSongDuration } from '../../utils/timeFunctions';
import { useDispatch } from 'react-redux';
import { setCurrentTracks } from '../../store/features/currentTracks/currentTracksSlice';
import { useEffect } from 'react';

const Tracks = ({ tracks, source }) => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setCurrentTracks(tracks));
  }, [tracks])
  
  const tracksItems = tracks.map((track, index) => {
    return {
      id: track.id,
      name: track.name,
      duration: getSongDuration(track.duration_ms),
      order: index,
      img: track.album.images[2].url,
    }
  })

  return (
    <>
      {
        tracksItems.length > 0 && tracksItems.map(track => {
          return <SongItemComponent key={track.id} {...track} source={source} />
        })
      }
    </>
  )
}

export default Tracks;