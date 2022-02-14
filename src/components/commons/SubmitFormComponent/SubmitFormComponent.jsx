import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import './SubmitFormComponent.css'

const SubmitFormComponent = () => {
    return (
        <div className='submitForm'>
            <TextField
                id="outlined-password-input"
                label="Password or another s**t"
                type="password"
                autoComplete="current-password"
            />
            <Button variant="contained" size="large">Ok</Button>
        </div>
    )
}
export default SubmitFormComponent

