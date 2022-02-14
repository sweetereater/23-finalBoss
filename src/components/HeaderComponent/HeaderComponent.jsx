import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './HeaderComponent.css'

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
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;

