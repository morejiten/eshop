import {  Stack,  } from "@mui/material";
import MuiCard from "../MuiCard/MuiCard.js";
import MuiFilter from "../MuiFilter/MuiFilter.js";
import MuiToggleButtons from "../MuiToggleButtons/MuiToggleButtons.js";
import { useState, useEffect } from "react";
const MuiHome = () => {
  const [products, setProducts] = useState([]);

  // TODO: move base URL to a config
  const productApiEndpoint = "https://dev-project-ecommerce.upgrad.dev/api/products";

  function getProductList() {
      fetch(productApiEndpoint) 
      .then(response => response.json())
      .then(data => setProducts( data));
    }

useEffect(() => {
  getProductList();
}, []);

console.log("products....",products);

  return (
    <div className="full-container">
       <Stack alignItems="center" direction="column" spacing={20}>
      <MuiToggleButtons></MuiToggleButtons>
      </Stack>
      <Stack alignItems="left" direction="row" spacing={20}   sx={{ width: 700 }}>
        <MuiFilter></MuiFilter>
        </Stack>
      <Stack alignItems="center" direction="row"  spacing={{ xs: 1, sm: 2 }}   sx={{ flexWrap: 'wrap' }}>
    {products.map(({name, imageUrl, description, price}) => {
        return <MuiCard name={name} image={imageUrl} description={description} price={price} />
      }
      )}
     
      </Stack>
    </div>
);
}

export default MuiHome;