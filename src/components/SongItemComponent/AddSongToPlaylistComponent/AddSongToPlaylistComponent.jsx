import React, {useEffect} from 'react'
import Button from "@mui/material/Button";
import './AddSongToPlaylistComponent.css'
import {useDispatch, useSelector} from "react-redux";
import {playlistsSelector} from "../../../store/features/playlists/playlistsSelectors";
import {getPlaylists} from "../../../store/features/playlists/playlistsThunks";
import {tokenSelector} from "../../../store/features/access/accessSelectors";
import Box from "@mui/material/Box";

export const AddSongToPlaylistComponent = () => {
    const dispatch = useDispatch()
    const playlists = useSelector(playlistsSelector)
    const token = useSelector(tokenSelector)
    console.log(playlists)
    useEffect(() => {
        if (!playlists.length && token ) {
            dispatch(getPlaylists())
        }
    }, [token])
    return (
        <Box className="ChosePlaylists">
            <h3>Chose playlist</h3>
            {playlists.length > 0 && playlists.map( playlist => {
                return <Button variant="outlined" onClick={()=> alert(playlist.name)}>{playlist.name}</Button>
            })}
        </Box>
    )
}