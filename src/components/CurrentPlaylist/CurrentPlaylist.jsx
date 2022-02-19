import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { tokenSelector } from '../../store/features/access/accessSelectors';
import { currentPlaylistTracksSelector } from '../../store/features/currentPlaylist/currentPlaylistSelectors';
import { getCurrentPlaylistTracks } from '../../store/features/currentPlaylist/currentPlaylistThunks';
import { loaderSelector } from '../../store/features/loader/loaderSelectors';
import { playlistsSelector, tracksFromPlaylistByIdSelector } from '../../store/features/playlists/playlistsSelectors';
import Tracks from '../Tracks/Tracks';
import { setPlayListTracks } from '../../store/features/currentPlaylist/currentPlaylistSlice'

export const CurrentPlaylist = () => {

    const token = useSelector(tokenSelector);
    const isLoading = useSelector(loaderSelector);

    const params = useParams();
    const playlistID = params.playlistId;
    const currentPL = useSelector(playlistsSelector).find(pl => pl.id === playlistID)

    const currentPLTracks = useSelector(currentPlaylistTracksSelector);
    const currentPLTracksFromStore = useSelector(tracksFromPlaylistByIdSelector)(playlistID);

    const dispatch = useDispatch()

    useEffect(() => {

        if (currentPLTracksFromStore.length) {
            dispatch(setPlayListTracks(currentPLTracksFromStore))
        } else {
            dispatch(getCurrentPlaylistTracks(playlistID))
        }

        return () => dispatch(setPlayListTracks([]))

    }, [playlistID, currentPLTracksFromStore])

    if (!token) return <Redirect to='/login' />

    if (isLoading) return <CircularProgress />

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '280px',
        }}>
            <Box sx={{ marginRight: '26px' }}>
                <h1>{currentPL.name}</h1>
                <h4 dangerouslySetInnerHTML={{ __html: currentPL.description }} />
                {
                    (currentPL.images.length > 0) && <img width='640px' height='640px' src={currentPL.images[0].url} />
                }
            </Box>
            <Box sx={{
                width: '100%',
            }}>
                <Tracks tracks={currentPLTracks} source={playlistID} />
            </Box>

        </Box>
    )
}