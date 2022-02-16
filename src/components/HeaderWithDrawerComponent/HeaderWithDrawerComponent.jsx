import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './HeaderWithDrawerComponent.css'

const drawerWidth = 240;

export default function HeaderWithDrawerComponent() {
    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Best player ever
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{overflow: 'auto'}}>
                        <Link to='/search'>
                            <List>
                                <ListItem button key={'Search'}>
                                    <ListItemIcon>
                                        <SearchIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Search'} onClick={() => console.log('search')}/>
                                </ListItem>
                            </List>
                        </Link>
                        <Divider/>
                        <Link to='/music'>
                            <List>
                                <ListItem button key={'Favorite songs'}>
                                    <ListItemIcon>
                                        <FavoriteBorderIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Favorite songs'} onClick={() => console.log('favorite')}/>
                                </ListItem>
                            </List>
                        </Link>
                        <Divider />
                        <Link to='/playlists'>
                            <List>
                                <ListItem button key={'Playlists'}>
                                    <ListItemIcon>
                                        <ListAltIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Playlists'} onClick={() => console.log('playlists')}/>
                                </ListItem>
                            </List>
                        </Link>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                    <Toolbar />
                    <Typography paragraph>
                        Контент №1 главной
                    </Typography>
                    <Typography paragraph>
                        Контент №2 главной
                    </Typography>
                </Box>
            </Box>
        </BrowserRouter>
    );
}