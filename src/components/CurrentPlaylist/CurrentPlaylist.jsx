import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { tokenSelector } from '../../store/features/access/accessSelectors';
import { currentPlaylistTracksSelector } from '../../store/features/currentPlaylist/currentPlaylistSelectors';
import { getCurrentPlaylistTracks } from '../../store/features/currentPlaylist/currentPlaylistThunks';
import { loaderSelector } from '../../store/features/loader/loaderSelectors';
import { playlistsSelector } from '../../store/features/playlists/playlistsSelectors';
import Tracks from '../Tracks/Tracks';

export const CurrentPlaylist = () => {

    const token = useSelector(tokenSelector);
    const isLoading = useSelector(loaderSelector);

    const params = useParams();
    const playlistID = params.playlistId;
    const currentPL = useSelector(playlistsSelector).find(pl => pl.id === playlistID)

    const currentPLTracks = useSelector(currentPlaylistTracksSelector);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentPlaylistTracks(playlistID))
    }, [playlistID])

    if (!token) return <Redirect to='/login' />

    if (isLoading) return <CircularProgress />

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ marginRight: '26px'}}>
                <h1>{currentPL.name}</h1>
                <h4>{currentPL.description}</h4>
                {
                    (currentPL.images.length > 0) && <img src={currentPL.images[0].url} />
                }
            </Box>
            <Box>
                <Tracks tracks={currentPLTracks} source={playlistID} />
            </Box>

        </Box>
    )
}