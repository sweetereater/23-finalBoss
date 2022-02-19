import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { savedTracksSelector } from "../../store/features/savedTracks/savedTracksSelectors";
import { getSavedTracks } from '../../store/features/savedTracks/savedTracksThunks';
import { tokenSelector } from '../../store/features/access/accessSelectors';
import Tracks from '../Tracks/Tracks';
import { Box, CircularProgress } from '@mui/material';
import { loaderSelector } from '../../store/features/loader/loaderSelectors';


const MySavedTracks = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const tracks = useSelector(savedTracksSelector);
  useEffect(() => {
    if (tracks.length === 0) {
      dispatch(getSavedTracks())
    }
  }, [token])

  const isLoading = useSelector(loaderSelector);

  if (isLoading) return <CircularProgress />

  if (!token) return <Redirect to='/login' />

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
      <Tracks tracks={tracks} source="/music" width={1700} />
    </Box>)
}

export default MySavedTracks;