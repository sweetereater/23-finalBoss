import { Link } from "react-router-dom"
import './PlayListCard.css'
/*  TODO -> красиво отрисовать компонент PlayList */
export const PlayListCard = (props) => {
    return (
        <div className='PlayListCard'>
            <Link to={`/playlists/${props.id}`}>{props.name}</Link>
        </div>
    )
}