import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function SongItemComponent() {
    const TinyText = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.38,
        fontWeight: 500,
        letterSpacing: 0.2,
        marginRight: '15px'
    });
    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                </Box>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', flex: '1 0 auto' }}>
                    <Typography component="div" variant="subtitle1">
                        From the inside - Linkin park
                    </Typography>
                </CardContent>
            </Box>
            <TinyText>1:25</TinyText>
        </Card>
    );
}
export default SongItemComponent