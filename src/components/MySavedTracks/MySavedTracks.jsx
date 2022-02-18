import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { savedTracksSelector } from "../../store/features/savedTracks/savedTracksSelectors";
import { getSavedTracks } from '../../store/features/savedTracks/savedTracksThunks';
import { tokenSelector } from '../../store/features/access/accessSelectors';
import Tracks from '../Tracks/Tracks';


const MySavedTracks = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const tracks = useSelector(savedTracksSelector);
  useEffect(() => {
    if (tracks.length === 0) {
      dispatch(getSavedTracks())
    }
  }, [token])

  if (!token) return <Redirect to='/login' />

  return (
    <div>
      <Tracks tracks={tracks} source="/music" />
    </div>)
}

export default MySavedTracks;