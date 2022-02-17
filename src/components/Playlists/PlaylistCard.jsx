import { Link } from "react-router-dom"

/*  TODO -> красиво отрисовать компонент PlayList */
export const PlayListCard = (props) => {
    return (
        <div>
            <Link to={`/playlists/${props.id}`}>
              <div>{props.name}</div>
              <img src={props.images[0].url} alt="Обложка плейлиста" />
            </Link>
        </div>
    )
}