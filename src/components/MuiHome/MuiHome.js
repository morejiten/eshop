import {  Stack,  } from "@mui/material";
import MuiCard from "../MuiCard/MuiCard.js";
import MuiFilter from "../MuiFilter/MuiFilter.js";
import MuiToggleButtons from "../MuiToggleButtons/MuiToggleButtons.js";
import { useState } from "react";
const MuiHome = () => {

  const [qty, setQty] = useState('');

  const handleChange = (event) => {
    setQty(event.target.value);
  };

 

  const productLitst = [
    {
    "name": "first",
    "image": "https://placehold.co/600x400/EEE/31343C",
    "description": "Antarcticaranging across all continents except AntarcticaShoe ranging across",
    "price": "500"
  },
  {
    "name": "seocond",
    "image": "https://placehold.co/400x400/EEE/31343C",
    "description": "Shoe ranging across all continents except Antarcticaranging across all continents except Antarctica",
    "price": "400"
  },{
    "name": "first",
    "image": "https://placehold.co/600x400/EEE/31343C",
    "description": "Antarcticaranging across all continents except AntarcticaShoe ranging across",
    "price": "500"
  },
  {
    "name": "seocond",
    "image": "https://placehold.co/400x400/EEE/31343C",
    "description": "Shoe ranging across all continents except Antarcticaranging across all continents except Antarctica",
    "price": "400"
  },{
    "name": "first",
    "image": "https://placehold.co/600x400/EEE/31343C",
    "description": "Antarcticaranging across all continents except AntarcticaShoe ranging across",
    "price": "500"
  },
  {
    "name": "seocond",
    "image": "https://placehold.co/400x400/EEE/31343C",
    "description": "Shoe ranging across all continents except Antarcticaranging across all continents except Antarctica",
    "price": "400"
  }
]


  return (
    <div className="full-container">
       <Stack alignItems="center" direction="column" spacing={20}>
      <MuiToggleButtons></MuiToggleButtons>
      </Stack>
      <Stack alignItems="left" direction="row" spacing={20}   sx={{ width: 700 }}>
        <MuiFilter></MuiFilter>
        </Stack>
      <Stack alignItems="center" direction="row"  spacing={{ xs: 1, sm: 2 }}   sx={{ flexWrap: 'wrap' }}>
    {productLitst.map(({name, image, description, price}) => {
        return <MuiCard name={name} image={image} description={description} price={price} />
      }
      )}
     
      </Stack>
    </div>
);
}

export default MuiHome;