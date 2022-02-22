import React, {useState} from 'react'
import './PopupComponent.css'
import Button from "@mui/material/Button";

export const PopupComponent = (props) => {
    const [popupState, setPopupState] = useState(false)
    const [playlistId, setPlaylistId] = useState('')
    const popupActivation = (playlistId) => {
        setPopupState(!popupState)
        setPlaylistId(playlistId)
    }
    const answerPopup = (answer) => {
        if(answer === false){
            setPopupState(!popupState)
            setPlaylistId('')
        } else {

        }
    }
    return (
        <div className='PopupArea'>
            <h4>Delete it "{props.id}" ?</h4>
            <Button variant="contained">Delete</Button>
            <Button variant="outlined" onClick={()=>{props.answerPopup(false)}}>cancel</Button>
        </div>
    )
}