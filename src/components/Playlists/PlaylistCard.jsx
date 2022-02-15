import { Link } from "react-router-dom"

/*  TODO -> красиво отрисовать компонент PlayList */
export const PlayListCard = (props) => {
    return (
        <div>
            <Link to={`/playlists/${props.id}`}>{props.name}</Link>
        </div>
    )
}