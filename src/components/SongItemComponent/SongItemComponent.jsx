import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTrack, setIsPlaying, setMusicSource } from '../../store/features/playerActiveTracks/playerActiveTracksSlice';
import { currentMusicSourceSelector, currentTrackSelector, isPlayingSelector } from '../../store/features/playerActiveTracks/activeTracksSelectors';
import { setPlayerActiveTracks } from '../../store/features/playerActiveTracks/playerActiveTracksSlice';
import { currentTracksSelector } from '../../store/features/currentTracks/currentTracksSelector';
import { savedTracksSelector } from '../../store/features/savedTracks/savedTracksSelectors';
import { addTrackToSaved, removeTrackFromSaved } from '../../store/features/savedTracks/savedTracksThunks';
import { getSongDuration } from '../../utils/timeFunctions';
import { spotifyApi } from '../../store/spotifyAPI';

function SongItemComponent(props) {
    const [isSaved, setIsSaved] = useState(null);

    const { track, order, source } = props;
    const { id, name } = track;
    const duration = getSongDuration(track.duration_ms);
    const img = track.album.images[2].url;

    const currentTrack = useSelector(currentTrackSelector);
    const isPlaying = useSelector(isPlayingSelector);
    const musicSrc = useSelector(currentMusicSourceSelector)

    const currentTracks = useSelector(currentTracksSelector)
    const dispatch = useDispatch();

    useEffect(() => {
      spotifyApi.containsMySavedTracks([id]).then((res) => setIsSaved(res.body[0]))
    }, [id])

    const iconColor = '#0083f5';
    const iconStyles = {
        fill: iconColor,
        height: 38,
        width: 38,
        cursor: 'pointer',
    }
    const handleClick = useCallback(() => {
        /* TODO -> написать логику, учесть варианты:
            1) Нажимаем на песню, которая не воспроизводится в данный момент - поменять offset
            2) Нажимаем на песню, которая воспроизводится в данный момент - меняем isPlaying на !isPlaying
        */
        if (source !== musicSrc) {
            dispatch(setMusicSource(source));
            dispatch(setPlayerActiveTracks(currentTracks))
            dispatch(setCurrentTrack(order));
            dispatch(setIsPlaying(true))
        }

        if (currentTrack === order && (source === musicSrc || musicSrc === null)) {
            dispatch(setIsPlaying(!isPlaying))
        }

        if (currentTrack !== order && source === musicSrc) {
            dispatch(setCurrentTrack(order))
            dispatch(setIsPlaying(true))
        }
    }, [currentTrack, currentTracks, dispatch, isPlaying, musicSrc, order, source])

    const handleTrackLike = useCallback(() => {
        if (!isSaved) {
            dispatch(addTrackToSaved(track)).then(() => setIsSaved(true))
        } else {
            dispatch(removeTrackFromSaved(id)).then(() => setIsSaved(false))
        }
    }, [track, isSaved, id]);

    const TinyText = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.38,
        fontWeight: 500,
        letterSpacing: 0.2,
        marginRight: '15px'
    });

    return (
        <Card sx={{
            display: 'flex',
            width: '80%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px 0',
            bgcolor: (source === musicSrc && currentTrack === order) ? '#a7e0fc' : "#fff"
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, }}>
                    <img src={img} alt="" />
                    <IconButton aria-label="play/pause" onClick={handleClick} >
                        {
                            (source === musicSrc && currentTrack === order) && isPlaying ?
                                <PauseIcon sx={iconStyles} /> :
                                <PlayArrowIcon sx={iconStyles} />
                        }
                    </IconButton>
                </Box>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', flex: '1 0 auto', alignItems: 'center' }}>
                    <Typography component="div" variant="subtitle1">
                        {name}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box onClick={handleTrackLike}>
                    {isSaved ?
                        <FavoriteIcon sx={{ ...iconStyles, height: 24, width: 24 }} /> :
                        <FavoriteBorderIcon sx={{ ...iconStyles, height: 24, width: 24 }} />
                    }
                </Box>
                <TinyText>{duration}</TinyText>
            </Box>

        </Card>
    );
}
export default SongItemComponent