import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getUserTopTracks } from '../../store/features/mainPage/mainPageThunk';
import { userTopTracksSelector } from '../../store/features/mainPage/mainPageSelector';
import { tokenSelector } from '../../store/features/access/accessSelectors';
import Tracks from '../Tracks/Tracks';
import { Box, CircularProgress } from '@mui/material';
import { loaderSelector } from '../../store/features/loader/loaderSelectors';

export const MainPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const tracks = useSelector(userTopTracksSelector);
  
  useEffect(() => {
    if (token && tracks.length === 0) {
      dispatch(getUserTopTracks())
    }
  }, [token, tracks])



  const isLoading = useSelector(loaderSelector);

  if (isLoading) return <CircularProgress />

  if (!token) return <Redirect to='/login' />
  console.log(tracks);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
      <Tracks tracks={tracks} source="/main" width={1600} />
    </Box>)
}
