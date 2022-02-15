import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTrack, setIsPlaying, setMusicSource } from '../../store/features/playerActiveTracks/playerActiveTracksSlice';
import { currentMusicSourceSelector, currentTrackSelector, isPlayingSelector } from '../../store/features/playerActiveTracks/activeTracksSelectors';

function SongItemComponent(props) {

    const { name, duration, img, order, source } = props;
    const currentTrack = useSelector(currentTrackSelector);
    const isPlaying = useSelector(isPlayingSelector);
    const musicSrc = useSelector(currentMusicSourceSelector)
    console.log(musicSrc)

    const dispatch = useDispatch();

    const handleClick = () => {
        /* TODO -> написать логику, учесть варианты:
            1) Нажимаем на песню, которая не воспроизводится в данный момент - поменять offset
            2) Нажимаем на песню, которая воспроизводится в данный момент - меняем isPlaying на !isPlaying
        */
        if (source !== musicSrc) {
            dispatch(setMusicSource(source))
        }

        if (currentTrack === order) {
            dispatch(setIsPlaying(!isPlaying))
        } else {
            dispatch(setCurrentTrack(order))
            dispatch(setIsPlaying(true))
        }
    }

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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px 0',
            bgcolor: (source === musicSrc && currentTrack === order) ? '#a7e0fc' : "#fff"
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <img src={img} alt="" />
                    <IconButton aria-label="play/pause" onClick={handleClick} >
                        {
                            (source === musicSrc && currentTrack === order) && isPlaying ?
                                <PauseIcon sx={{ height: 38, width: 38, fill: '#0083f5' }} /> :
                                <PlayArrowIcon sx={{ height: 38, width: 38, fill: '#0083f5' }} />
                        }
                    </IconButton>
                </Box>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', flex: '1 0 auto' }}>
                    <Typography component="div" variant="subtitle1">
                        {name}
                    </Typography>
                </CardContent>
            </Box>
            <TinyText>{duration}</TinyText>
        </Card>
    );
}
export default SongItemComponent