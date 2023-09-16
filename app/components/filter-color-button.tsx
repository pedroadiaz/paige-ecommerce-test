"use client"

import Button from '@mui/material/Button';

export const FilterColorButton = () => {
    const handleClick = () => {
        console.log("handle filter color");
        //to do handleClick
    }
    return (
        <Button variant="contained" style={{ margin: "10px" }} onClick={handleClick}>Filter By Color</Button>
    )
}