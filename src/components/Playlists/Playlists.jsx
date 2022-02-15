import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom';

import { tokenSelector } from "../../store/features/access/accessSelectors";
import { playlistsSelector } from "../../store/features/playlists/playlistsSelectors";
import { getPlaylists } from "../../store/features/playlists/playlistsThunks";
import { PlayList } from "./PlaylistComponent";

export const PlaylistsPage = () => {
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
            <h1>Playlists: </h1>
            {playlists.map(pl => <PlayList key={pl.id} {...pl} />)}
        </div>
    )
}