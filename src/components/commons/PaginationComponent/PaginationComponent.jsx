import React from 'react'
import Pagination from "@mui/material/Pagination";
import './PaginationComponent.css'

const PaginationComponent = () => {
    return (
        <div className='PaginationComponent'>
            <Pagination count={10} color="primary" />
        </div>
    )
}
export default PaginationComponent