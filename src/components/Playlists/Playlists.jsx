import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom';

import { tokenSelector } from "../../store/features/access/accessSelectors";
import { playlistsSelector } from "../../store/features/playlists/playlistsSelectors";
import { getPlaylists } from "../../store/features/playlists/playlistsThunks";

export const Playlist = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(playlistsSelector)
    console.log(playlists);

    const token = useSelector(tokenSelector)

    useEffect(() => {
        dispatch(getPlaylists())
    }, [token])

    if (!token) return <Redirect to='/login' />

    return (
        <div>
            playlists page
        </div>
    )
}