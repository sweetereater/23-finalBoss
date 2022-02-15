import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './HeaderComponent.css'
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom'
>>>>>>> work_at_access

const ResponsiveAppBar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
                    >
                        Best player ever
                    </Typography>
<<<<<<< HEAD
=======
                    <Link to='/playlists'>Playlists</Link>
>>>>>>> work_at_access
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;

