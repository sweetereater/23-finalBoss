import SongItemComponent from '../SongItemComponent/SongItemComponent'
import { useDispatch } from 'react-redux';
import { setCurrentTracks } from '../../store/features/currentTracks/currentTracksSlice';
import { useEffect } from 'react';

const Tracks = ({ tracks, source }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTracks(tracks));
  }, [tracks])

  return (
    <>
      {
        tracks.length > 0 && tracks.map((track, index) => {
          return <SongItemComponent key={track.id} track={track} order={index} source={source} />
        })
      }
    </>
  )
}

export default Tracks;