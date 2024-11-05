import { pink } from '@mui/material/colors';
import { FormControl, TextField, Button, Link, Stack, Typography } from "@mui/material";
import { InputLabel, MenuItem,  Select } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState} from "react";
const MuiAddProduct = () => {

  const [payload, setPayload] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [availableItems, setAvailableItems] = useState();
  const [price, setPrice] = useState();
  const [ImageUrl, setImageUrl] = useState();
  

  const addProduct = (event) => {
     const newProdValue = {
    "name": name || "Not Provided" ,
    "image": ImageUrl || "https://placehold.co/400x400/EEE/31343C",
    "description": description || "Not Provided",
    "price": price ||  "NA"
  };

 fetch(productApiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProdValue)
  }).then(
    console.log("product Added ...",newProdValue)

  );
    
  
  };


  
  const productApiEndpoint = "http://localhost:3333/products";



return (<>


    <div className="container">

      <FormControl size="medium"  >
      <form>
        <Stack alignItems="center" direction="column" spacing={2}>
          <AccountCircleIcon sx={{ color: pink[500] }} fontSize="large"></AccountCircleIcon>
          <Typography variant="h5">Add New Product</Typography>
          <TextField id="name" label="Name" variant="outlined" style={{ width: "100%" }} 
          onChange={(event) => setName(event.target.value)}  required/> 
          
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth size="small">
          <InputLabel id="category">Category:</InputLabel>
      <Select
        labelId="category"
        id="category"
        value={category}
        label="Category:"
        onChange={(event) => setCategory(event.target.value)}
      >
        <MenuItem value="default">
          <em>furniture </em>
        </MenuItem>
        <MenuItem value="apparel">Apparel</MenuItem>
        <MenuItem value="electricals">  Electricals</MenuItem>
        <MenuItem value="personalcare">Personal Care </MenuItem>
        <MenuItem value="furniture">Furniture </MenuItem>
      </Select>
</FormControl>
          <TextField id="manufacturer" label="Manufacturer" variant="outlined" style={{ width: "100%" }}
          onChange={(event) => setManufacturer(event.target.value)}  required/>
          <TextField id="availableItems" label="Available Items" variant="outlined" style={{ width: "100%" }}
          onChange={(event) => setAvailableItems(event.target.value)} /> 
          <TextField id="price" label="Price" variant="outlined" style={{ width: "100%" }} 
          onChange={(event) => setPrice(event.target.value)} /> 
          <TextField id="imageUrl" label="Image URL" variant="outlined" style={{ width: "100%" }} 
          onChange={(event) => setImageUrl(event.target.value)} /> 
          <TextField id="description" label="Product Description" variant="outlined" style={{ width: "100%" }} 
          onChange={(event) => setDescription(event.target.value)} /> 
          <Button variant="contained" color="primary"  onClick={addProduct} fullWidth> Save Product</Button>
          
        </Stack>
        </form>
      </FormControl>
    </div>
  </>);
}

export default MuiAddProduct;